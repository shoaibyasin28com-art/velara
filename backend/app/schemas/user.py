from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    fullName: str = Field(min_length=2, max_length=80)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    fullName: str
    email: EmailStr
    role: str = "customer"


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
