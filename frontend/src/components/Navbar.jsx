import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop/men', label: 'Men' },
  { to: '/shop/women', label: 'Women' },
  { to: '/shop/shoes', label: 'Shoes' },
  { to: '/shop/watches', label: 'Watches' },
  { to: '/shop/accessories', label: 'Accessories' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { count } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function submitSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-ivory/95 shadow-sm backdrop-blur' : 'bg-ivory'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <button
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <Link to="/" className="font-display text-2xl tracking-[0.15em]">
          VELARA
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? 'text-brass' : 'text-ink/80 hover:text-brass'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <Link to={user ? '/account' : '/login'} aria-label="Account">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.6-3.6 4.9-5.5 8-5.5S18.4 16.4 20 20" />
            </svg>
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] text-ink">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ink/10 bg-ivory">
          <form onSubmit={submitSearch} className="container-x flex items-center gap-3 py-4">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories, brands..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="text-sm text-ink/50">
              Close
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-4/5 max-w-xs bg-ivory p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-xl tracking-widest2">VELARA</span>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg text-ink/85"
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-1 bg-ink/40" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}
