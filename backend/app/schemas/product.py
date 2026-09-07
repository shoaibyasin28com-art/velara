from typing import Optional
from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    name: str
    slug: str
    brand: str
    category: str
    price: float = Field(gt=0)
    discountPrice: Optional[float] = None
    description: str
    sizes: list[str] = []
    colors: list[str] = []
    images: list[str] = []
    stock: int = 0
    isNew: bool = False
    isFeatured: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    discountPrice: Optional[float] = None
    description: Optional[str] = None
    stock: Optional[int] = None
    images: Optional[list[str]] = None
    isFeatured: Optional[bool] = None
    status: Optional[str] = None


class ProductOut(ProductBase):
    id: str
    rating: float = 0
    reviewCount: int = 0
