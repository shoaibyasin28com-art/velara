import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-7xl text-brass">404</p>
      <h1 className="mt-4 font-display text-2xl">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink/55">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  )
}
