import firebase_admin
from firebase_admin import credentials, firestore

from app.config import settings

if not firebase_admin._apps:
    cred = credentials.Certificate(settings.firebase_credentials_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()

USERS = "users"
PRODUCTS = "products"
CARTS = "carts"
ORDERS = "orders"
REVIEWS = "reviews"
