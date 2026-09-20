import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, ThumbsUp } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

export default function ReviewForm() {
  const { add } = useData()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [rating, setRating] = useState(4)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (name.trim().length < 2) return setError('Please enter your name.')
    if (text.trim().length < 10) return setError('Please write at least one full sentence (10+ characters).')
    setError('')
    const res = await add('reviews', {
      name: name.trim(),
      location: location.trim() || 'Guest',
      rating,
      text: text.trim()
    })
    if (!res?.ok) return setError("We couldn't submit your review right now. Please try again.")
    setName('')
    setLocation('')
    setText('')
    setRating(4)
    setDone(true)
    setTimeout(() => setDone(false), 4500)
  }

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-wine text-gold">
          <ThumbsUp size={20} />
        </span>
        <div>
          <h3 className="font-display text-2xl font-bold">Share Your Experience</h3>
          <p className="text-sm text-ink/50">Enjoyed your coffee? Tell others what you thought.</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-ink/70">Your rating:</span>
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                className="transition hover:scale-110"
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
              >
                <Star
                  size={28}
                  className={
                    n <= (hover || rating) ? 'fill-gold text-gold' : 'text-ink/25'
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hari KC"
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Kathmandu, Nepal"
              className="input"
            />
          </div>
        </div>

        <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
              Your review *
            </label>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you order? How was the service and the view?"
            className="textarea resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-4">
          <button type="submit" className="btn-gold">
            <Star size={16} /> Submit Review
          </button>
          {done && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm text-green-400"
            >
              <Check size={16} /> Thank you — your review is now live!
            </motion.p>
          )}
        </div>
      </form>
    </div>
  )
}
