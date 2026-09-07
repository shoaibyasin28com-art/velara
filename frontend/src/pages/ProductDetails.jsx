import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Rating from '../components/Rating.jsx'
import ProductCard from '../components/ProductCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { products, reviews } from '../data/mockProducts.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const { addItem } = useCart()

  const [activeImage, setActiveImage] = useState(0)
  const [size, setSize] = useState(product?.sizes?.[0])
  const [color, setColor] = useState(product?.colors?.[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState('description')

  const related = useMemo(
    () => (product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []),
    [product]
  )

  if (!product) {
    return (
      <div className="container-x py-24">
        <EmptyState
          title="Product not found"
          message="The item you're looking for may have sold out or moved."
          action={<Link to="/shop" className="btn-primary">Back to Shop</Link>}
        />
      </div>
    )
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price

  function handleAddToCart() {
    addItem(product, { size, color, quantity: qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container-x py-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-charcoal/5">
            <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`h-20 w-16 overflow-hidden border ${i === activeImage ? 'border-brass' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest2 text-ink/45">{product.brand}</p>
          <h1 className="mt-2 font-display text-3xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
            <span className="text-xs text-ink/40">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-medium">${hasDiscount ? product.discountPrice : product.price}</span>
            {hasDiscount && <span className="text-ink/40 line-through">${product.price}</span>}
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">{product.description}</p>

          <div className="mt-7">
            <h4 className="mb-2 text-xs uppercase tracking-widest2 text-ink/50">Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[44px] border px-3 py-2 text-sm ${
                    size === s ? 'border-ink bg-ink text-ivory' : 'border-ink/20 text-ink/70'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 text-xs uppercase tracking-widest2 text-ink/50">Color</h4>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`border px-3 py-2 text-sm ${
                    color === c ? 'border-ink bg-ink text-ivory' : 'border-ink/20 text-ink/70'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-ink/20">
              <button className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex-1">
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
          <Link to="/checkout" onClick={handleAddToCart} className="btn-outline mt-3 block text-center">
            Buy Now
          </Link>

          <div className="mt-8 space-y-2 border-t border-ink/10 pt-6 text-xs text-ink/50">
            <p>Free shipping on orders over $150</p>
            <p>30-day hassle-free returns</p>
            <p>Secure encrypted checkout</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20 border-t border-ink/10 pt-10">
        <div className="flex gap-8 border-b border-ink/10 text-sm">
          {['description', 'specifications', 'reviews'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 pb-3 capitalize ${
                tab === t ? 'border-brass text-ink' : 'border-transparent text-ink/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="max-w-2xl py-8 text-sm leading-relaxed text-ink/70">
          {tab === 'description' && <p>{product.description}</p>}
          {tab === 'specifications' && (
            <ul className="space-y-2">
              <li>Brand: {product.brand}</li>
              <li>Category: {product.category}</li>
              <li>Available sizes: {product.sizes.join(', ')}</li>
              <li>Available colors: {product.colors.join(', ')}</li>
            </ul>
          )}
          {tab === 'reviews' && (
            <div className="space-y-6">
              {reviews.map((r) => (
                <div key={r.id}>
                  <Rating value={r.rating} />
                  <p className="mt-2">{r.comment}</p>
                  <p className="mt-1 text-xs text-ink/40">{r.name} · {r.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 font-display text-2xl">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
