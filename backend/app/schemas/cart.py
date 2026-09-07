from pydantic import BaseModel


class CartItemIn(BaseModel):
    productId: str
    size: str
    color: str
    quantity: int = 1


class CartItemUpdate(BaseModel):
    quantity: int


class CartItemOut(CartItemIn):
    id: str
    name: str
    image: str | None = None
    price: float
