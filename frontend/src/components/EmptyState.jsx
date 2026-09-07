export default function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="max-w-sm text-sm text-ink/60">{message}</p>
      {action}
    </div>
  )
}
