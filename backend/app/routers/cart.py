import uuid

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user
from app.firebase import db, CARTS, PRODUCTS
from app.schemas.cart import CartItemIn, CartItemOut, CartItemUpdate

router = APIRouter(prefix="/api/cart", tags=["cart"])


def _cart_ref(user_id: str):
    return db.collection(CARTS).document(user_id)


@router.get("", response_model=list[CartItemOut])
def get_cart(current_user: dict = Depends(get_current_user)):
    doc = _cart_ref(current_user["id"]).get()
    items = doc.to_dict().get("items", []) if doc.exists else []
    return items


@router.post("/items", response_model=list[CartItemOut], status_code=201)
def add_item(payload: CartItemIn, current_user: dict = Depends(get_current_user)):
    product_doc = db.collection(PRODUCTS).document(payload.productId).get()
    if not product_doc.exists:
        raise HTTPException(status_code=404, detail="Product not found")
    product = product_doc.to_dict()

    ref = _cart_ref(current_user["id"])
    doc = ref.get()
    items = doc.to_dict().get("items", []) if doc.exists else []

    match = next(
        (i for i in items if i["productId"] == payload.productId and i["size"] == payload.size and i["color"] == payload.color),
        None,
    )
    if match:
        match["quantity"] += payload.quantity
    else:
        items.append({
            "id": str(uuid.uuid4()),
            "productId": payload.productId,
            "name": product["name"],
            "image": (product.get("images") or [None])[0],
            "price": product.get("discountPrice") or product["price"],
            "size": payload.size,
            "color": payload.color,
            "quantity": payload.quantity,
        })

    ref.set({"items": items}, merge=True)
    return items


@router.put("/items/{item_id}", response_model=list[CartItemOut])
def update_item(item_id: str, payload: CartItemUpdate, current_user: dict = Depends(get_current_user)):
    ref = _cart_ref(current_user["id"])
    doc = ref.get()
    items = doc.to_dict().get("items", []) if doc.exists else []
    for item in items:
        if item["id"] == item_id:
            item["quantity"] = max(1, payload.quantity)
    ref.set({"items": items}, merge=True)
    return items


@router.delete("/items/{item_id}", response_model=list[CartItemOut])
def remove_item(item_id: str, current_user: dict = Depends(get_current_user)):
    ref = _cart_ref(current_user["id"])
    doc = ref.get()
    items = [i for i in doc.to_dict().get("items", []) if i["id"] != item_id] if doc.exists else []
    ref.set({"items": items}, merge=True)
    return items
