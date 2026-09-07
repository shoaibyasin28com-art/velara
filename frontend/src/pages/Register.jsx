import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    setLoading(true)
    try {
      await register({ fullName: form.fullName, email: form.email, password: form.password })
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Could not create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-3xl">Create Account</h1>
        <p className="mt-2 text-center text-sm text-ink/50">Join VELARA for a tailored experience</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Field label="Full Name" value={form.fullName} onChange={(v) => update('fullName', v)} required />
          <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
          <Field label="Password" type="password" value={form.password} onChange={(v) => update('password', v)} required />
          <Field label="Confirm Password" type="password" value={form.confirm} onChange={(v) => update('confirm', v)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          Already have an account? <Link to="/login" className="text-brass underline underline-offset-4">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

function Field({ label, className = '', ...props }) {
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
