import { Star } from 'lucide-react'

export default function RatingStars({ rating = 0, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-gold text-gold' : 'text-ink/25'}
        />
      ))}
    </div>
  )
}
