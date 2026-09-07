import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useState } from 'react'

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart()
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)

  const discount = applied ? subtotal * 0.1 : 0
  const shipping = items.length === 0 ? 0 : subtotal > 150 ? 0 : 12
  const tax = (subtotal - discount) * 0.05
  const total = subtotal - discount + shipping + tax

  function applyCoupon(e) {
    e.preventDefault()
    if (coupon.trim().toUpperCase() === 'VELARA10') {
      setApplied(coupon)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-24">
        <EmptyState
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Explore the collection to find something you'll love."
          action={<Link to="/shop" className="btn-primary">Continue Shopping</Link>}
        />
      </div>
    )
  }

  return (
    <div className="container-x py-14">
      <h1 className="font-display text-3xl">Shopping Cart</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-ink/10">
          {items.map((item) => (
            <div key={item.key} className="flex gap-5 py-6">
              <div className="h-28 w-24 shrink-0 overflow-hidden bg-charcoal/5">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base">{item.name}</h3>
                    <p className="mt-1 text-xs text-ink/50">
                      Size: {item.size} · Color: {item.color}
                    </p>
                  </div>
                  <p className="whitespace-nowrap font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-ink/20">
                    <button className="px-3 py-1.5" onClick={() => updateQuantity(item.key, item.quantity - 1)}>−</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button className="px-3 py-1.5" onClick={() => updateQuantity(item.key, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.key)} className="text-xs text-ink/40 underline underline-offset-4">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-6">
            <Link to="/shop" className="text-sm underline underline-offset-4">← Continue Shopping</Link>
            <button onClick={clearCart} className="text-sm text-ink/40 underline underline-offset-4">Clear Cart</button>
          </div>
        </div>

        <div className="h-fit border border-ink/10 p-7">
          <h3 className="font-display text-lg">Order Summary</h3>
          <form onSubmit={applyCoupon} className="mt-5 flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 border border-ink/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
            />
            <button type="submit" className="btn-outline px-4 py-2 text-xs">Apply</button>
          </form>
          {applied && <p className="mt-2 text-xs text-brass">Coupon applied — 10% off</p>}

          <div className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm">
            <div className="flex justify-between text-ink/70">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            {applied && (
              <div className="flex justify-between text-brass">
                <span>Discount</span><span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink/70">
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-ink/70">
              <span>Tax</span><span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary mt-6 block w-full text-center">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
