import { Link } from 'react-router-dom'
import { useState } from 'react'
import Rating from './Rating.jsx'

export default function ProductCard({ product }) {
  const [wished, setWished] = useState(false)
  const hasDiscount = product.discountPrice && product.discountPrice < product.price

  return (
    <div className="group relative">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden bg-charcoal/5">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-ink px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-ivory">New</span>
            )}
            {hasDiscount && (
              <span className="bg-brass px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-ink">
                -{Math.round(100 - (product.discountPrice / product.price) * 100)}%
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              setWished((w) => !w)
            }}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" className={`h-4 w-4 ${wished ? 'fill-brass stroke-brass' : 'fill-none stroke-ink'}`} strokeWidth="1.5">
              <path d="M12 21s-7.5-4.6-10-9.1C0.3 8.6 1.7 5 5.2 4.2c2-.5 3.9.3 5 2 .9-1.7 3-2.5 5-2 3.5.8 4.9 4.4 3.2 7.7C19.5 16.4 12 21 12 21z" />
            </svg>
          </button>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-ink/45">{product.category}</p>
          <Link to={`/product/${product.slug}`}>
            <h3 className="mt-1 font-display text-base leading-snug">{product.name}</h3>
          </Link>
          <div className="mt-1.5">
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-medium">${hasDiscount ? product.discountPrice : product.price}</span>
        {hasDiscount && <span className="text-sm text-ink/40 line-through">${product.price}</span>}
      </div>
    </div>
  )
}
