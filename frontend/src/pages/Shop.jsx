import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { products, categories } from '../data/mockProducts.js'

const SORTS = {
  featured: (a, b) => Number(b.isNew) - Number(a.isNew),
  newest: (a, b) => Number(b.isNew) - Number(a.isNew),
  'price-asc': (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price),
  'price-desc': (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price),
  rating: (a, b) => b.rating - a.rating
}

const PAGE_SIZE = 12

export default function Shop() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')?.toLowerCase() || ''

  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(700)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let list = products
    if (category) list = list.filter((p) => p.category === category)
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    list = list.filter((p) => (p.discountPrice ?? p.price) <= maxPrice)
    return [...list].sort(SORTS[sort])
  }, [category, q, maxPrice, sort])

  const pageItems = filtered.slice(0, page * PAGE_SIZE)

  return (
    <div className="container-x py-16">
      <div className="mb-10">
        <p className="eyebrow">{q ? 'Search Results' : category ? categories.find((c) => c.slug === category)?.name : 'Shop'}</p>
        <h1 className="mt-2 font-display text-4xl capitalize">
          {q ? `“${q}”` : category ? `${category}'s Collection` : 'Full Collection'}
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Showing {pageItems.length} of {filtered.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-8">
          <div>
            <h4 className="mb-3 text-xs uppercase tracking-widest2 text-ink/50">Category</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop" className={!category ? 'text-brass' : 'text-ink/70'}>All</a></li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <a href={`/shop/${c.slug}`} className={category === c.slug ? 'text-brass' : 'text-ink/70'}>
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs uppercase tracking-widest2 text-ink/50">Max Price: ${maxPrice}</h4>
            <input
              type="range"
              min="50"
              max="700"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brass"
            />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-ink/15 bg-transparent px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {pageItems.length === 0 ? (
            <EmptyState title="No products found" message="Try adjusting your filters or search terms." />
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {pageItems.length < filtered.length && (
            <div className="mt-14 text-center">
              <button onClick={() => setPage((p) => p + 1)} className="btn-outline">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
