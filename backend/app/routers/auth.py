import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud.firestore_v1.base_query import FieldFilter

from app.dependencies import get_current_user
from app.firebase import db, USERS
from app.schemas.user import TokenResponse, UserLogin, UserOut, UserRegister
from app.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister):
    existing = (
        db.collection(USERS).where(filter=FieldFilter("email", "==", payload.email)).limit(1).get()
    )
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    user_id = str(uuid.uuid4())
    user_data = {
        "fullName": payload.fullName,
        "email": payload.email,
        "passwordHash": hash_password(payload.password),
        "role": "customer",
        "status": "active",
    }
    db.collection(USERS).document(user_id).set(user_data)

    token = create_access_token({"sub": user_id})
    return TokenResponse(
        access_token=token,
        user=UserOut(id=user_id, fullName=payload.fullName, email=payload.email, role="customer"),
    )


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin):
    matches = (
        db.collection(USERS).where(filter=FieldFilter("email", "==", payload.email)).limit(1).get()
    )
    if not matches:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    doc = matches[0]
    user = doc.to_dict()
    if not verify_password(payload.password, user.get("passwordHash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": doc.id})
    return TokenResponse(
        access_token=token,
        user=UserOut(id=doc.id, fullName=user["fullName"], email=user["email"], role=user.get("role", "customer")),
    )


@router.get("/me", response_model=UserOut)
def me(current_user: dict = Depends(get_current_user)):
    return UserOut(
        id=current_user["id"],
        fullName=current_user["fullName"],
        email=current_user["email"],
        role=current_user.get("role", "customer"),
    )
