import paramiko
import os

BEGET_HOST = "gamayu9p.beget.tech"
BEGET_USER = "gamayu9p"
BEGET_PASS = "AXCTSgP4AnS!"
BEGET_DIST_DIR = "cachalot.cc/public_html"

def deploy_assets():
    print(f"Connecting to {BEGET_HOST}...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(BEGET_HOST, username=BEGET_USER, password=BEGET_PASS)
        sftp = client.open_sftp()
        
        assets = [
            "favicon.ico",
            "favicon.svg",
            "favicon-96x96.png",
            "apple-touch-icon.png",
            "site.webmanifest"
        ]
        
        for asset in assets:
            local_path = f"dist/{asset}"
            remote_path = f"{BEGET_DIST_DIR}/{asset}"
            if os.path.exists(local_path):
                print(f"Uploading {local_path} -> {remote_path}")
                sftp.put(local_path, remote_path)
            else:
                print(f"MISSING LOCAL: {local_path}")
                
        print("Done.")
        client.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    deploy_assets()
