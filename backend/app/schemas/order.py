from pydantic import BaseModel


class OrderItemIn(BaseModel):
    productId: str
    name: str
    price: float
    quantity: int
    size: str
    color: str


class ShippingAddress(BaseModel):
    fullName: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    country: str
    postalCode: str


class OrderCreate(BaseModel):
    items: list[OrderItemIn]
    shippingAddress: ShippingAddress
    shippingMethod: str = "standard"
    paymentMethod: str = "cod"


class OrderOut(BaseModel):
    id: str
    orderNumber: str
    items: list[OrderItemIn]
    shippingAddress: ShippingAddress
    shippingMethod: str
    paymentMethod: str
    subtotal: float
    shippingCost: float
    tax: float
    total: float
    status: str = "pending"
    createdAt: str
