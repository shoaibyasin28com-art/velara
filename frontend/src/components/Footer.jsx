import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-charcoal text-ivory">
      <div className="container-x grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <span className="font-display text-xl tracking-widest2">VELARA</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            Modern clothing, footwear and accessories, made to be worn for years, not seasons.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest2 text-brassLight">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
            <li><Link to="/shop/men">Men</Link></li>
            <li><Link to="/shop/women">Women</Link></li>
            <li><Link to="/shop/shoes">Shoes</Link></li>
            <li><Link to="/shop/watches">Watches</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest2 text-brassLight">Customer Service</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/returns">Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest2 text-brassLight">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest2 text-brassLight">Follow</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>TikTok</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6">
        <p className="container-x text-center text-xs text-ivory/40">
          © {new Date().getFullYear()} VELARA. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
