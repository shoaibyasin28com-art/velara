from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from google.cloud.firestore_v1.base_query import FieldFilter

from app.dependencies import require_admin
from app.firebase import db, PRODUCTS
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate

router = APIRouter(prefix="/api/products", tags=["products"])


def _to_out(doc) -> dict:
    data = doc.to_dict()
    data["id"] = doc.id
    return data


@router.get("", response_model=list[ProductOut])
def list_products(
    category: Optional[str] = None,
    q: Optional[str] = None,
    sort: Optional[str] = "featured",
    limit: int = Query(24, le=100),
):
    query = db.collection(PRODUCTS)
    if category:
        query = query.where(filter=FieldFilter("category", "==", category))

    docs = [_to_out(d) for d in query.limit(200).get()]

    if q:
        needle = q.lower()
        docs = [
            d for d in docs
            if needle in d.get("name", "").lower()
            or needle in d.get("brand", "").lower()
            or needle in d.get("description", "").lower()
        ]

    sorters = {
        "price-asc": lambda d: d.get("discountPrice") or d["price"],
        "price-desc": lambda d: -(d.get("discountPrice") or d["price"]),
        "rating": lambda d: -d.get("rating", 0),
        "newest": lambda d: not d.get("isNew", False),
    }
    if sort in sorters:
        docs.sort(key=sorters[sort])

    return docs[:limit]


@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str):
    matches = db.collection(PRODUCTS).where(filter=FieldFilter("slug", "==", slug)).limit(1).get()
    if not matches:
        raise HTTPException(status_code=404, detail="Product not found")
    return _to_out(matches[0])


@router.get("/{slug}/related", response_model=list[ProductOut])
def related_products(slug: str, limit: int = 4):
    matches = db.collection(PRODUCTS).where(filter=FieldFilter("slug", "==", slug)).limit(1).get()
    if not matches:
        raise HTTPException(status_code=404, detail="Product not found")
    category = matches[0].to_dict()["category"]
    docs = [
        _to_out(d)
        for d in db.collection(PRODUCTS).where(filter=FieldFilter("category", "==", category)).limit(limit + 1).get()
        if d.id != matches[0].id
    ]
    return docs[:limit]


@router.post("", response_model=ProductOut, status_code=201)
def create_product(payload: ProductCreate, _admin: dict = Depends(require_admin)):
    data = payload.model_dump()
    data["rating"] = 0
    data["reviewCount"] = 0
    ref = db.collection(PRODUCTS).document()
    ref.set(data)
    return _to_out(ref.get())


@router.put("/{product_id}", response_model=ProductOut)
def update_product(product_id: str, payload: ProductUpdate, _admin: dict = Depends(require_admin)):
    ref = db.collection(PRODUCTS).document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    ref.update(updates)
    return _to_out(ref.get())


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: str, _admin: dict = Depends(require_admin)):
    ref = db.collection(PRODUCTS).document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    ref.delete()
