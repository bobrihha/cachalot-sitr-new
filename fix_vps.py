import paramiko

VPS_HOST = "80.74.28.245"
VPS_USER = "root"
VPS_PASS = "Narzan@0"

def fix_vps():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
        print("Connected. Killing hanging processes...")
        
        # 1. Stop services
        client.exec_command("systemctl stop cachalot-api cachalot-bot")
        
        # 2. Kill port 8002 (fuser if available, or lsof, or killall python)
        # Using killall python to be safe since we run everything in venv.
        # Check if fuser exists
        stdin, stdout, stderr = client.exec_command("which fuser")
        if stdout.read().strip():
             client.exec_command("fuser -k 8002/tcp")
        else:
             # Fallback: kill all python processes running from .venv
             client.exec_command("pkill -f 'backend.main'")
             client.exec_command("pkill -f 'backend.bot'")

        # 3. Start services
        print("Restarting services...")
        client.exec_command("systemctl start cachalot-api cachalot-bot")
        
        # 4. Check statuses
        print("Checking statuses...")
        stdin, stdout, stderr = client.exec_command("systemctl status cachalot-api cachalot-bot --no-pager")
        print(stdout.read().decode())
        
        # Print Bot Logs to verify it's not crashing
        print("Bot Logs:")
        stdin, stdout, stderr = client.exec_command("journalctl -u cachalot-bot -n 50 --no-pager")
        print(stdout.read().decode())

        client.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_vps()
