from enum import Enum
from pydantic import BaseModel, EmailStr, Field


class UserRole(str, Enum):
    CLIENT = "CLIENT"
    FREELANCER = "FREELANCER"


class UserSignUp(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: UserRole


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None
    role: str | None = None
