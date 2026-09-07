import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import EmptyState from '../components/EmptyState.jsx'

const steps = ['Information', 'Shipping', 'Payment']

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', state: '', country: '', postalCode: ''
  })
  const [placing, setPlacing] = useState(false)

  const shippingCost = shippingMethod === 'express' ? 25 : subtotal > 150 ? 0 : 12
  const tax = subtotal * 0.05
  const total = subtotal + shippingCost + tax

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function next(e) {
    e.preventDefault()
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  async function placeOrder(e) {
    e.preventDefault()
    setPlacing(true)
    // Demo checkout — no real payment is processed. In production this
    // calls POST /api/orders on the FastAPI backend.
    await new Promise((r) => setTimeout(r, 900))
    const orderNumber = `VEL-${Math.floor(10000 + Math.random() * 89999)}`
    clearCart()
    navigate('/order-success', { state: { orderNumber, total, form, shippingMethod } })
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-24">
        <EmptyState
          title="Nothing to check out"
          message="Your cart is empty — add a few pieces before checking out."
          action={<Link to="/shop" className="btn-primary">Browse the Shop</Link>}
        />
      </div>
    )
  }

  return (
    <div className="container-x py-14">
      <h1 className="font-display text-3xl">Checkout</h1>

      <div className="mt-6 flex gap-6 text-xs uppercase tracking-widest2">
        {steps.map((s, i) => (
          <span key={s} className={i <= step ? 'text-brass' : 'text-ink/30'}>
            {i + 1}. {s}
          </span>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          {step === 0 && (
            <form onSubmit={next} className="space-y-5">
              <h2 className="font-display text-xl">Customer Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full Name" value={form.fullName} onChange={(v) => update('fullName', v)} required />
                <Input label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
                <Input label="Phone" value={form.phone} onChange={(v) => update('phone', v)} required />
              </div>
              <h2 className="pt-4 font-display text-xl">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Address" value={form.address} onChange={(v) => update('address', v)} required className="sm:col-span-2" />
                <Input label="City" value={form.city} onChange={(v) => update('city', v)} required />
                <Input label="State" value={form.state} onChange={(v) => update('state', v)} required />
                <Input label="Country" value={form.country} onChange={(v) => update('country', v)} required />
                <Input label="Postal Code" value={form.postalCode} onChange={(v) => update('postalCode', v)} required />
              </div>
              <button type="submit" className="btn-primary">Continue to Shipping</button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={next} className="space-y-5">
              <h2 className="font-display text-xl">Shipping Method</h2>
              {[
                { id: 'standard', label: 'Standard Delivery', desc: '4-6 business days', price: subtotal > 150 ? 'Free' : '$12.00' },
                { id: 'express', label: 'Express Delivery', desc: '1-2 business days', price: '$25.00' }
              ].map((opt) => (
                <label key={opt.id} className={`flex cursor-pointer items-center justify-between border p-4 ${shippingMethod === opt.id ? 'border-ink' : 'border-ink/15'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id)} className="accent-brass" />
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-ink/50">{opt.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm">{opt.price}</span>
                </label>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(0)} className="btn-outline">Back</button>
                <button type="submit" className="btn-primary">Continue to Payment</button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={placeOrder} className="space-y-5">
              <h2 className="font-display text-xl">Payment</h2>
              <p className="text-xs text-ink/50">Demo checkout — no real payment will be processed.</p>
              {[
                { id: 'cod', label: 'Cash on Delivery' },
                { id: 'card', label: 'Credit / Debit Card (Demo)' }
              ].map((opt) => (
                <label key={opt.id} className={`flex cursor-pointer items-center gap-3 border p-4 ${paymentMethod === opt.id ? 'border-ink' : 'border-ink/15'}`}>
                  <input type="radio" checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} className="accent-brass" />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
              {paymentMethod === 'card' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Card Number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                  <Input label="Expiry" placeholder="MM/YY" />
                  <Input label="CVC" placeholder="123" />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-outline">Back</button>
                <button type="submit" disabled={placing} className="btn-primary disabled:opacity-60">
                  {placing ? 'Placing Order…' : 'Place Order'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="h-fit border border-ink/10 p-7">
          <h3 className="font-display text-lg">Order Summary</h3>
          <div className="mt-5 space-y-3 divide-y divide-ink/10 text-sm">
            {items.map((i) => (
              <div key={i.key} className="flex justify-between pt-3 first:pt-0">
                <span className="text-ink/70">{i.name} × {i.quantity}</span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-sm">
            <div className="flex justify-between text-ink/70"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-ink/70"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-ink/70"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">{label}</span>
      <input
        {...props}
        onChange={(e) => props.onChange?.(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-brass"
      />
    </label>
  )
}
