import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarRange } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function EventsPreview() {
  const { events, settings } = useData()

  const upcoming = [...events]
    .filter((e) => e.date >= new Date().toISOString().split('T')[0])
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 3)

  if (!upcoming.length) return null

  return (
    <section className="bg-cream py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={settings.eventsEyebrow || 'What’s On'}
          title={settings.eventsTitle || 'Events & Evenings'}
          subtitle={settings.eventsSubtitle || 'Live music, workshops and tastings — the calendar at Nako Cafe.'}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {upcoming.map((e, i) => {
            const d = new Date(`${e.date}T12:00:00`)
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group card overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded bg-wine px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                    {e.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} · {e.time}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{e.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/55">{e.description}</p>
                </div>
              </motion.article>
            )
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 text-center">
            <Link to="/events" className="btn-outline">
              <CalendarRange size={17} /> See All Events
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}