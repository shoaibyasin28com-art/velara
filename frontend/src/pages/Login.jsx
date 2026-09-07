import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-3xl">Welcome Back</h1>
        <p className="mt-2 text-center text-sm text-ink/50">Sign in to your VELARA account</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
          <Field label="Password" type="password" value={form.password} onChange={(v) => setForm((f) => ({ ...f, password: v }))} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-3 text-right text-xs">
          <Link to="/forgot-password" className="text-ink/50 underline underline-offset-4">Forgot password?</Link>
        </p>
        <p className="mt-6 text-center text-sm text-ink/60">
          Don't have an account? <Link to="/register" className="text-brass underline underline-offset-4">Register</Link>
        </p>
        <p className="mt-8 border-t border-ink/10 pt-5 text-center text-xs text-ink/40">
          Demo account: demo@velara.com / demo1234
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
