import paramiko
import os

BEGET_HOST = "gamayu9p.beget.tech"
BEGET_USER = "gamayu9p"
BEGET_PASS = "AXCTSgP4AnS!"
BEGET_DIST_DIR = "cachalot.cc/public_html"

def force_deploy():
    print(f"Connecting to {BEGET_HOST}...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(BEGET_HOST, username=BEGET_USER, password=BEGET_PASS)
        sftp = client.open_sftp()
        
        # 1. Upload new JS
        local_js = "dist/assets/main-CpQplcOY.js" # This is the NEW file
        remote_js = f"{BEGET_DIST_DIR}/assets/main-CpQplcOY.js"
        print(f"Uploading {local_js}...")
        sftp.put(local_js, remote_js)
        
        # 2. Upload CSS
        local_css = "dist/assets/main-DIDBpv8S.css"
        remote_css = f"{BEGET_DIST_DIR}/assets/main-DIDBpv8S.css"
        print(f"Uploading {local_css}...")
        sftp.put(local_css, remote_css)

        # 3. Upload index.html (Overwrite)
        local_index = "dist/index.html"
        remote_index = f"{BEGET_DIST_DIR}/index.html"
        print(f"Overwriting {local_index}...")
        sftp.put(local_index, remote_index)
                
        print("Force Deploy Done.")
        client.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    force_deploy()
