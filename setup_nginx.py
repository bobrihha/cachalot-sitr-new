import paramiko

VPS_HOST = "80.74.28.245"
VPS_USER = "root"
VPS_PASS = "Narzan@0"

NGINX_CONFIG = """
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
"""

def setup_nginx():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
        print("Connected. Installing Nginx...")
        
        # 1. Install Nginx
        client.exec_command("apt-get update && apt-get install -y nginx")
        
        # 2. Write Config using echo to avoid sftp path issues
        cmd = f"echo '{NGINX_CONFIG}' > /etc/nginx/sites-available/default"
        client.exec_command(cmd)
            
        print("Config uploaded.")
        
        # 3. Test and Restart
        stdin, stdout, stderr = client.exec_command("nginx -t && systemctl restart nginx")
        print(stdout.read().decode())
        print(stderr.read().decode())
        
        print("Nginx configured on Port 80.")
        client.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    setup_nginx()
