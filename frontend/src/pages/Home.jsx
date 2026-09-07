import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero3D from '../components/Hero3D.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Rating from '../components/Rating.jsx'
import { categories, products, reviews } from '../data/mockProducts.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).concat(products).slice(0, 8)
  const bestSellers = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4)

  return (
    <div>
      {/* HERO */}
      <section className="relative flex h-[86vh] min-h-[560px] items-center overflow-hidden bg-ink text-ivory">
        <Hero3D />
        <div className="container-x relative z-10">
          <motion.p initial="hidden" animate="show" variants={fadeUp} className="eyebrow text-brassLight">
            The Autumn Collection
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Define Your Style
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-md text-base text-ivory/70"
          >
            Discover premium fashion designed for modern living — clothing, footwear and accessories built to last.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link to="/shop/men" className="btn-primary !bg-brass !text-ink hover:!bg-brassLight">
              Shop Men
            </Link>
            <Link to="/shop/women" className="btn-outline !border-ivory/40 !text-ivory hover:!bg-ivory hover:!text-ink">
              Shop Women
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Explore</p>
            <h2 className="mt-2 font-display text-3xl">Shop by Category</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.slug} to={`/shop/${c.slug}`} className="group relative block overflow-hidden aspect-[3/4]">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-lg text-ivory">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-x py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Fresh In</p>
            <h2 className="mt-2 font-display text-3xl">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden text-sm underline underline-offset-4 sm:inline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative my-24 overflow-hidden bg-ink py-24 text-center text-ivory">
        <p className="eyebrow text-brassLight">Limited Time</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Up to 40% Off</h2>
        <p className="mx-auto mt-4 max-w-md text-ivory/70">
          Elevate your wardrobe with our latest collection of tailored essentials.
        </p>
        <Link to="/shop" className="btn-primary mt-8 inline-flex !bg-brass !text-ink hover:!bg-brassLight">
          Shop Now
        </Link>
      </section>

      {/* BEST SELLERS */}
      <section className="container-x py-16">
        <div className="mb-10">
          <p className="eyebrow">Fan Favorites</p>
          <h2 className="mt-2 font-display text-3xl">Best Sellers</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* WHY VELARA */}
      <section className="container-x py-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Premium Quality', desc: 'Sourced fabrics and hardware, finished by hand.' },
            { title: 'Secure Payment', desc: 'Encrypted checkout on every order, every time.' },
            { title: 'Fast Delivery', desc: 'Dispatched within 24 hours on all in-stock items.' },
            { title: 'Easy Returns', desc: '30-day returns, no questions asked.' }
          ].map((f) => (
            <div key={f.title} className="border border-ink/10 p-7">
              <h3 className="font-display text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-charcoal/[0.03] py-24">
        <div className="container-x">
          <div className="mb-10 text-center">
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-2 font-display text-3xl">What Customers Say</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-ivory p-7">
                <Rating value={r.rating} />
                <p className="mt-4 text-sm leading-relaxed text-ink/70">&ldquo;{r.comment}&rdquo;</p>
                <p className="mt-5 text-sm font-medium">{r.name}</p>
                <p className="text-xs text-ink/40">{r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-x py-24 text-center">
        <p className="eyebrow">Newsletter</p>
        <h2 className="mt-2 font-display text-3xl">Stay Ahead of the Style</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-brass"
          />
          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  )
}
