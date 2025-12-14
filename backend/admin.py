import streamlit as st
import pandas as pd
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from backend.models import Prompt, User
from backend.database import DATABASE_URL

# Load Env
load_dotenv()
load_dotenv("../.env")

# Config
ADMIN_SECRET = os.getenv("ADMIN_SECRET", "cachalot2025")
st.set_page_config(page_title="Cachalot Admin", layout="wide")

# Database Connection
# Note: DATABASE_URL is "sqlite+aiosqlite:///./cachalot.db"
# Streamlit needs synchronous 'sqlite:///'
SYNC_DB_URL = "sqlite:///./cachalot.db"
engine = create_engine(SYNC_DB_URL)
SessionLocal = sessionmaker(bind=engine)

def check_password():
    """Returns `True` if the user had the correct password."""

    def password_entered():
        """Checks whether a password entered by the user is correct."""
        if st.session_state["password"] == ADMIN_SECRET:
            st.session_state["password_correct"] = True
            del st.session_state["password"]  # don't store password
        else:
            st.session_state["password_correct"] = False

    if "password_correct" not in st.session_state:
        # First run, show input for password.
        st.text_input(
            "Password", type="password", on_change=password_entered, key="password"
        )
        return False
    elif not st.session_state["password_correct"]:
        # Password not correct, show input + error.
        st.text_input(
            "Password", type="password", on_change=password_entered, key="password"
        )
        st.error("😕 Password incorrect")
        return False
    else:
        # Password correct.
        return True

if check_password():
    st.title("🐋 Cachalot Control Center")
    
    tab1, tab2 = st.tabs(["Users", "System Prompts"])
    
    with tab1:
        st.header("👥 Leads & Users")
        if st.button("Refresh Data"):
            st.rerun()
            
        try:
            with engine.connect() as conn:
                df = pd.read_sql("SELECT * FROM users ORDER BY created_at DESC", conn)
                st.dataframe(df, use_container_width=True)
        except Exception as e:
            st.error(f"Error loading users: {e}")

    with tab2:
        st.header("🧠 System Intelligence")
        
        channel = st.selectbox("Select Channel", ["web", "telegram"])
        
        # Load Prompt
        with SessionLocal() as db:
            prompt = db.query(Prompt).filter(Prompt.channel == channel).first()
            current_content = prompt.content if prompt else ""
            is_active = prompt.is_active if prompt else True
            
        st.subheader(f"Editing: {channel.upper()}")
        
        new_content = st.text_area("System Instruction", value=current_content, height=400)
        new_active = st.checkbox("Is Active", value=is_active)
        
        if st.button("Save Changes"):
            try:
                with SessionLocal() as db:
                    prompt = db.query(Prompt).filter(Prompt.channel == channel).first()
                    if not prompt:
                        prompt = Prompt(channel=channel, content=new_content, is_active=new_active)
                        db.add(prompt)
                    else:
                        prompt.content = new_content
                        prompt.is_active = new_active
                    db.commit()
                st.success("✅ Saved successfully!")
                st.rerun()
            except Exception as e:
                st.error(f"Error saving: {e}")
