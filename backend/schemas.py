from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .models import UserSource, LeadStatus

class MessageBase(BaseModel):
    role: str
    content: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    niche: Optional[str] = None
    notes: Optional[str] = None
    lead_status: Optional[str] = LeadStatus.NEW

class UserCreate(UserBase):
    source: str
    external_id: str
    username: Optional[str] = None

class User(UserBase):
    id: int
    source: str
    external_id: str
    username: Optional[str] = None
    created_at: datetime
    messages: List[Message] = []

    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None # For web clients: session ID or UUID

class PromptBase(BaseModel):
    channel: str
    content: str
    description: Optional[str] = None
    is_active: bool = True

class PromptUpdate(BaseModel):
    content: Optional[str] = None
    is_active: Optional[bool] = None

class Prompt(PromptBase):
    id: int
    updated_at: datetime

    class Config:
        from_attributes = True
