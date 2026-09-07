export default function Rating({ value = 0, count, size = 'sm' }) {
  const stars = [0, 1, 2, 3, 4]
  const dim = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {stars.map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`${dim} ${i < Math.round(value) ? 'fill-brass' : 'fill-stone/40'}`}
          >
            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
          </svg>
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-ink/50">({count})</span>}
    </div>
  )
}
