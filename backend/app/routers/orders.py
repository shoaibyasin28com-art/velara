import random
import string
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from google.cloud.firestore_v1.base_query import FieldFilter

from app.dependencies import get_current_user
from app.firebase import db, ORDERS, CARTS
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter(prefix="/api/orders", tags=["orders"])


def _generate_order_number() -> str:
    return "VEL-" + "".join(random.choices(string.digits, k=5))


def _to_out(doc) -> dict:
    data = doc.to_dict()
    data["id"] = doc.id
    return data


@router.post("", response_model=OrderOut, status_code=201)
def create_order(payload: OrderCreate, current_user: dict = Depends(get_current_user)):
    subtotal = sum(i.price * i.quantity for i in payload.items)
    shipping_cost = 0.0 if subtotal > 150 else (25.0 if payload.shippingMethod == "express" else 12.0)
    tax = round(subtotal * 0.05, 2)
    total = round(subtotal + shipping_cost + tax, 2)

    order_data = {
        "userId": current_user["id"],
        "orderNumber": _generate_order_number(),
        "items": [i.model_dump() for i in payload.items],
        "shippingAddress": payload.shippingAddress.model_dump(),
        "shippingMethod": payload.shippingMethod,
        "paymentMethod": payload.paymentMethod,
        "subtotal": round(subtotal, 2),
        "shippingCost": shipping_cost,
        "tax": tax,
        "total": total,
        "status": "pending",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }

    ref = db.collection(ORDERS).document()
    ref.set(order_data)

    # Clear the user's server-side cart now that the order is placed.
    db.collection(CARTS).document(current_user["id"]).set({"items": []}, merge=True)

    return _to_out(ref.get())


@router.get("", response_model=list[OrderOut])
def list_orders(current_user: dict = Depends(get_current_user)):
    docs = (
        db.collection(ORDERS)
        .where(filter=FieldFilter("userId", "==", current_user["id"]))
        .get()
    )
    return [_to_out(d) for d in docs]


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    doc = db.collection(ORDERS).document(order_id).get()
    if not doc.exists or doc.to_dict().get("userId") != current_user["id"]:
        raise HTTPException(status_code=404, detail="Order not found")
    return _to_out(doc)


@router.put("/{order_id}/status", response_model=OrderOut)
def update_order_status(order_id: str, status_value: str, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    ref = db.collection(ORDERS).document(order_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Order not found")
    ref.update({"status": status_value})
    return _to_out(ref.get())
