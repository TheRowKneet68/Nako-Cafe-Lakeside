import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import RatingStars from '../ui/RatingStars.jsx'
import { initials } from '../../utils/helpers.js'

export default function ReviewsSection({ limit }) {
  const { reviews, settings } = useData()
  const shown = limit ? reviews.slice(0, limit) : reviews
  const avg = reviews.length
    ? reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length
    : 0

  return (
    <section className="bg-cream py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={settings.reviewsEyebrow}
          title={settings.reviewsTitle}
          subtitle={settings.reviewsSubtitle}
        />

        <div className="mx-auto mb-14 flex max-w-md items-center gap-5 rounded-2xl border border-gold/20 bg-card p-6">
          <div className="gold-text font-display text-6xl font-bold">{avg.toFixed(1)}</div>
          <div>
            <RatingStars rating={avg} size={20} />
            <p className="mt-1.5 text-sm text-ink/55">
              {reviews.length} featured reviews · 177+ on Google
            </p>
          </div>
        </div>

        {shown.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((r, i) => (
              <motion.figure
                key={r.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="card relative p-6"
              >
                <Quote size={42} className="absolute right-5 top-5 text-gold/15" />
                <RatingStars rating={r.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-ink/70">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-wine font-display font-bold text-gold">
                    {initials(r.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-ink/45">{r.location}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50">No reviews yet — be the first to leave one.</p>
        )}

        {limit && shown.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/reviews" className="btn-outline">
              Read All Reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
