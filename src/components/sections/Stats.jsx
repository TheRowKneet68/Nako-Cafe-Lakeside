import AnimatedCounter from '../ui/AnimatedCounter.jsx'
import Reveal from '../ui/Reveal.jsx'

const stats = [
  { value: 4.9, suffix: '/5', decimals: 1, label: 'Average Rating' },
  { value: 177, suffix: '+', decimals: 0, label: 'Google Reviews' },
  { value: 20, suffix: '+', decimals: 0, label: 'Brews on the Menu' },
  { value: 100, suffix: '%', decimals: 0, label: 'Nepali-Grown Beans' }
]

export default function Stats() {
  return (
    <section className="border-y border-line/10 bg-cream">
      <div className="container-x grid grid-cols-2 gap-10 py-16 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <AnimatedCounter
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
              className="gold-text font-display text-5xl font-bold"
            />
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink/55">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
