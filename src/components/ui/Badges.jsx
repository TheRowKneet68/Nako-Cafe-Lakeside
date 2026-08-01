import { Flame } from 'lucide-react'

export function VegBadge({ veg }) {
  return (
    <span
      title={veg ? 'Vegetarian' : 'Non-Vegetarian'}
      className="grid h-5 w-5 shrink-0 place-items-center rounded border-2 border-white bg-white/10"
    >
      <span className={`h-2.5 w-2.5 rounded-full ${veg ? 'bg-green-500' : 'bg-red-600'}`} />
    </span>
  )
}

export function SpicyIndicator({ level = 0, className = '' }) {
  if (!level) return null
  return (
    <span className={`flex items-center gap-0.5 ${className}`} title={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <Flame key={i} size={13} className={i <= level ? 'fill-red-500 text-red-500' : 'text-ink/20'} />
      ))}
    </span>
  )
}
