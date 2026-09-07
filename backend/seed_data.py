"""
Seeds Firestore with the same demo catalog used by the frontend's mock data,
so the live API returns realistic products once you point the frontend at it.

Run with:  python seed_data.py
Requires FIREBASE_CREDENTIALS_PATH to be set in .env (see .env.example).
"""
from app.firebase import db, PRODUCTS

PRODUCTS_DATA = [
    {"name": "Wool Tailored Overcoat", "slug": "wool-tailored-overcoat", "brand": "VELARA Atelier", "category": "men", "price": 428, "discountPrice": 349, "description": "A double-faced wool overcoat cut for a tailored silhouette, finished with horn buttons and a hand-stitched lapel.", "sizes": ["S", "M", "L", "XL"], "colors": ["Charcoal", "Camel"], "images": ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80"], "stock": 14, "isNew": True, "isFeatured": True, "rating": 4.8, "reviewCount": 62},
    {"name": "Silk Drape Blouse", "slug": "silk-drape-blouse", "brand": "VELARA", "category": "women", "price": 189, "discountPrice": None, "description": "Fluid mulberry silk blouse with a soft cowl neckline.", "sizes": ["XS", "S", "M", "L"], "colors": ["Ivory", "Black"], "images": ["https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80"], "stock": 22, "isNew": True, "isFeatured": False, "rating": 4.6, "reviewCount": 41},
    {"name": "Minimalist Chronograph Watch", "slug": "minimalist-chronograph-watch", "brand": "VELARA Time", "category": "watches", "price": 620, "discountPrice": 520, "description": "Sapphire-crystal chronograph with a brushed stainless case.", "sizes": ["One Size"], "colors": ["Gold", "Silver"], "images": ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"], "stock": 9, "isNew": False, "isFeatured": True, "rating": 4.9, "reviewCount": 118},
    {"name": "Urban Runner Sneakers", "slug": "urban-runner-sneakers", "brand": "VELARA Studio", "category": "shoes", "price": 240, "discountPrice": 199, "description": "Full-grain leather sneakers on a cushioned sole.", "sizes": ["39", "40", "41", "42", "43", "44"], "colors": ["White", "Black"], "images": ["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"], "stock": 31, "isNew": False, "isFeatured": False, "rating": 4.7, "reviewCount": 84},
    {"name": "Italian Leather Backpack", "slug": "italian-leather-backpack", "brand": "VELARA", "category": "accessories", "price": 340, "discountPrice": None, "description": "Vegetable-tanned Italian leather backpack with a padded laptop sleeve.", "sizes": ["One Size"], "colors": ["Cognac", "Black"], "images": ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"], "stock": 17, "isNew": True, "isFeatured": False, "rating": 4.5, "reviewCount": 27},
    {"name": "Slim Fit Blazer", "slug": "slim-fit-blazer", "brand": "VELARA Atelier", "category": "men", "price": 310, "discountPrice": 259, "description": "A softly structured blazer in Italian wool twill.", "sizes": ["S", "M", "L", "XL"], "colors": ["Navy", "Charcoal"], "images": ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"], "stock": 12, "isNew": False, "isFeatured": False, "rating": 4.6, "reviewCount": 53},
]

def seed():
    batch = db.batch()
    for product in PRODUCTS_DATA:
        ref = db.collection(PRODUCTS).document()
        batch.set(ref, product)
    batch.commit()
    print(f"Seeded {len(PRODUCTS_DATA)} products into Firestore.")

if __name__ == "__main__":
    seed()
