import { Link, useLocation, Navigate } from 'react-router-dom'

export default function OrderSuccess() {
  const { state } = useLocation()
  if (!state?.orderNumber) return <Navigate to="/" replace />

  const { orderNumber, total, form, shippingMethod } = state

  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brass/15 text-brass">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-3xl">Order Confirmed</h1>
      <p className="mt-2 text-ink/60">Thank you for shopping with VELARA.</p>
      <p className="mt-4 text-sm uppercase tracking-widest2 text-ink/50">
        Order Number: <span className="text-ink">#{orderNumber}</span>
      </p>

      <div className="mt-10 w-full max-w-md border border-ink/10 p-7 text-left text-sm">
        <div className="flex justify-between border-b border-ink/10 pb-3">
          <span className="text-ink/50">Total Paid</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b border-ink/10 py-3">
          <span className="text-ink/50">Shipping To</span>
          <span>{form.city}, {form.country}</span>
        </div>
        <div className="flex justify-between pt-3">
          <span className="text-ink/50">Estimated Delivery</span>
          <span>{shippingMethod === 'express' ? '1-2 business days' : '4-6 business days'}</span>
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Link to="/account/orders" className="btn-outline">View Order</Link>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  )
}
