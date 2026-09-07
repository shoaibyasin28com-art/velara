# VELARA — Premium Fashion E-Commerce

A full-stack e-commerce storefront built for a professional developer portfolio / Fiverr client demo.

**Frontend:** React + Vite (JSX), Tailwind CSS, React Router, Axios, Framer Motion, Three.js (`@react-three/fiber` + `@react-three/drei`) for the 3D hero.
**Backend:** Python, FastAPI, Firebase Firestore, JWT auth (python-jose + passlib/bcrypt), Pydantic.

## What's included (Phase 1)

- Home, Shop (with filters/sort), Product Details, Cart, Checkout (3-step), Order Success, Login, Register, 404
- Reusable components: Navbar (sticky, mobile menu, search), Footer, ProductCard, Rating, LoadingSpinner, EmptyState
- 3D animated hero (rotating brass torus-knot mark) as the site's signature visual element
- Auth + Cart context providers, Axios service layer wired to the FastAPI routes
- FastAPI backend: `/api/auth`, `/api/products`, `/api/cart`, `/api/orders` — JWT-protected, role-based admin guard
- Firestore seed script with a realistic demo catalog

**Not yet built** (planned for the next phase): Men/Women/Shoes/Watches/Accessories dedicated landing pages, wishlist, user dashboard, admin dashboard, reviews submission, coupons backend, PDF invoices. Say the word and I'll continue with any of these next.

## Brand

- **Name:** VELARA — "Elevate Every Moment"
- **Palette:** Ink `#12110F`, Charcoal `#1D1B18`, Ivory `#F5F1EA`, Stone `#B9B2A6`, Brass `#B08D57`
- **Type:** Fraunces (display) + Inter (body/UI)

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`. The frontend currently reads from `src/data/mockProducts.js` so it works standalone with no backend running. To go live, swap the mock imports in `Home.jsx` / `Shop.jsx` / `ProductDetails.jsx` for the corresponding `productService` calls already written in `src/services/`.

## Running the backend

1. Create a Firebase project → enable **Firestore** → **Project Settings > Service Accounts > Generate new private key**. Save the JSON as `backend/firebase-service-account.json`.
2. Copy `.env.example` to `.env` and fill in `JWT_SECRET_KEY` (any long random string).

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed_data.py           # loads the demo catalog into Firestore
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000`, interactive docs at `http://localhost:8000/docs`.

## API overview

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Create account, returns JWT |
| POST | `/api/auth/login` | – | Login, returns JWT |
| GET | `/api/auth/me` | user | Current user |
| GET | `/api/products` | – | List products (category, q, sort, limit) |
| GET | `/api/products/{slug}` | – | Product detail |
| GET | `/api/products/{slug}/related` | – | Related products |
| POST/PUT/DELETE | `/api/products...` | admin | Manage products |
| GET/POST/PUT/DELETE | `/api/cart...` | user | Server-side cart |
| POST | `/api/orders` | user | Place order |
| GET | `/api/orders`, `/api/orders/{id}` | user | Order history |
| PUT | `/api/orders/{id}/status` | admin | Update order status |

## Demo accounts

Register a normal account via `/register`. To create an admin for testing, register normally, then in the Firebase console open **Firestore → users → [your doc]** and set `role: "admin"`.

## Security notes

- Passwords are hashed with bcrypt, never stored in plain text.
- JWT secret and Firebase credentials are loaded from `.env` / a gitignored service-account file — never commit either.
- Checkout payment is a demo simulation only; no real payment processor is wired up.

## Folder structure

```
velara/
├── frontend/          React + Vite storefront
│   └── src/
│       ├── components/   Navbar, Footer, ProductCard, Hero3D, ...
│       ├── pages/        Home, Shop, ProductDetails, Cart, Checkout, ...
│       ├── context/       AuthContext, CartContext
│       ├── services/      api.js + per-resource service modules
│       └── data/          mockProducts.js (demo catalog)
└── backend/            FastAPI + Firestore API
    └── app/
        ├── routers/       auth, products, cart, orders
        ├── schemas/       Pydantic request/response models
        ├── main.py, config.py, firebase.py, security.py, dependencies.py
```
