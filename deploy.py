import paramiko
import os
import sys

# CONFIGURATION
VPS_HOST = "80.74.28.245"
VPS_USER = "root"
VPS_PASS = "Narzan@0"
VPS_DIR = "/root/cachalot-backend"

BEGET_HOST = "gamayu9p.beget.tech"
BEGET_USER = "gamayu9p"
BEGET_PASS = "AXCTSgP4AnS!"
BEGET_DIST_DIR = "cachalot.cc/public_html" # Relative to home

def create_ssh_client(host, user, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(host, username=user, password=password)
        print(f"Connected to {host}")
        return client
    except Exception as e:
        print(f"Failed to connect to {host}: {e}")
        return None

def sftp_upload_dir(sftp, local_dir, remote_dir):
    # Ensure remote dir exists
    try:
        sftp.stat(remote_dir)
    except IOError:
        sftp.mkdir(remote_dir)

    for item in os.listdir(local_dir):
        # Skip hidden files EXCEPT .htaccess and .env
        if item.startswith('.') and item not in ['.htaccess', '.env']:
            continue
        if item == '__pycache__' or item == 'node_modules':
            continue
            
        local_path = os.path.join(local_dir, item)
        remote_path = f"{remote_dir}/{item}"

        if os.path.isfile(local_path):
            print(f"Uploading {local_path} -> {remote_path}")
            sftp.put(local_path, remote_path)
        elif os.path.isdir(local_path):
            sftp_upload_dir(sftp, local_path, remote_path)

def deploy_backend():
    print("\n--- Deploying Backend (VPS) ---")
    ssh = create_ssh_client(VPS_HOST, VPS_USER, VPS_PASS)
    if not ssh: return

    # 1. Prepare Directory
    print("Preparing remote directory...")
    ssh.exec_command(f"mkdir -p {VPS_DIR}")
    
    # 2. Upload Files
    sftp = ssh.open_sftp()
    
    # Upload backend folder
    print("Uploading backend...")
    sftp_upload_dir(sftp, "backend", f"{VPS_DIR}/backend")
    
    # Upload config files
    sftp.put("backend/requirements.txt", f"{VPS_DIR}/requirements.txt")
    if os.path.exists(".env"):
        sftp.put(".env", f"{VPS_DIR}/.env")
    else:
        print("Warning: .env not found locally!")
    
    # 3. Setup Remote Environment
    print("Setting up remote environment (pip install)...")
    # We use a single command string to ensure environment persistence if needed, 
    # but for simple venv we can chain commands.
    # Check if python3-venv is installed, install if not.
    stdin, stdout, stderr = ssh.exec_command("apt-get update && apt-get install -y python3-venv sqlite3")
    exit_status = stdout.channel.recv_exit_status()
    if exit_status != 0:
         print(f"Error installing dependencies: {stderr.read().decode()}")

    # Setup venv and requiremetns
    cmds = [
        f"cd {VPS_DIR}",
        "python3 -m venv .venv",
        ".venv/bin/pip install --upgrade pip",
        ".venv/bin/pip install -r requirements.txt",
        ".venv/bin/python -m backend.init_db" # Init DB
    ]
    
    # Run setup commands
    cmd_str = " && ".join(cmds)
    stdin, stdout, stderr = ssh.exec_command(cmd_str)
    
    # Stream output
    for line in stdout:
        print(f"REMOTE: {line.strip()}")
    
    err = stderr.read().decode()
    if err:
        print(f"REMOTE WARN/ERR: {err}")

    # 4. Create Systemd Services
    print("Creating Systemd Services...")
    
    api_service = f"""[Unit]
Description=Cachalot API
After=network.target

[Service]
User=root
WorkingDirectory={VPS_DIR}
Environment=PYTHONPATH={VPS_DIR}
ExecStart={VPS_DIR}/.venv/bin/python -m backend.main
Restart=always

[Install]
WantedBy=multi-user.target
"""
    bot_service = f"""[Unit]
Description=Cachalot Bot
After=network.target

[Service]
User=root
WorkingDirectory={VPS_DIR}
Environment=PYTHONPATH={VPS_DIR}
ExecStart={VPS_DIR}/.venv/bin/python -m backend.bot
Restart=always

[Install]
WantedBy=multi-user.target
"""
    admin_service = f"""[Unit]
Description=Cachalot Admin (Streamlit)
After=network.target

[Service]
User=root
WorkingDirectory={VPS_DIR}
Environment=PYTHONPATH={VPS_DIR}
ExecStart={VPS_DIR}/.venv/bin/streamlit run backend/admin.py --server.port 8502 --server.address 0.0.0.0
Restart=always

[Install]
WantedBy=multi-user.target
"""
    
    # Upload service files using sftp temp, then move
    with sftp.open(f"{VPS_DIR}/cachalot-api.service", "w") as f:
        f.write(api_service)
    with sftp.open(f"{VPS_DIR}/cachalot-bot.service", "w") as f:
        f.write(bot_service)
    with sftp.open(f"{VPS_DIR}/cachalot-admin.service", "w") as f:
        f.write(admin_service)
        
    # Move and Enable
    setup_service_cmds = [
        f"cp {VPS_DIR}/cachalot-api.service /etc/systemd/system/",
        f"cp {VPS_DIR}/cachalot-bot.service /etc/systemd/system/",
        f"cp {VPS_DIR}/cachalot-admin.service /etc/systemd/system/",
        "systemctl daemon-reload",
        "systemctl enable cachalot-api",
        "systemctl enable cachalot-bot",
        "systemctl enable cachalot-admin",
        "systemctl restart cachalot-api",
        "systemctl restart cachalot-bot",
        "systemctl restart cachalot-admin",
        "ufw allow 8502", # Ensure NEW admin port is open
        "ufw allow 8002"  # Ensure NEW api port is open
    ]
    
    stdin, stdout, stderr = ssh.exec_command(" && ".join(setup_service_cmds))
    print(stdout.read().decode())
    print("Backend Deployment Complete.")
    ssh.close()

def deploy_frontend():
    print("\n--- Deploying Frontend (Beget) ---")
    ssh = create_ssh_client(BEGET_HOST, BEGET_USER, BEGET_PASS)
    if not ssh: return

    sftp = ssh.open_sftp()
    
    local_dist = "dist"
    remote_dist = BEGET_DIST_DIR
    
    print(f"Uploading {local_dist} to {remote_dist}...")
    sftp_upload_dir(sftp, local_dist, remote_dist)
    
    print("Frontend Deployment Complete.")
    ssh.close()

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "backend":
        deploy_backend()
    elif len(sys.argv) > 1 and sys.argv[1] == "frontend":
        deploy_frontend()
    else:
        deploy_backend()
        deploy_frontend()
