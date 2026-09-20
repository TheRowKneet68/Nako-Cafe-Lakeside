import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarRange, Music2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Countdown from '../components/sections/Countdown.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { useData } from '../context/DataContext.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function Events() {
  useSEO({
    title: 'Events',
    description:
      'Live music, latte art workshops, tastings and slow Sunday mornings at Nako Cafe, Lakeside Pokhara. Check what is coming up and book your spot.'
  })

  const { events } = useData()
  const [view, setView] = useState('upcoming')

  const { upcoming, past, next } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const sorted = [...events].sort((a, b) => (a.date > b.date ? 1 : -1))
    return {
      upcoming: sorted.filter((e) => e.date >= today),
      past: sorted.filter((e) => e.date < today).reverse(),
      next: sorted.find((e) => e.date >= today)
    }
  }, [events])

  const shown = view === 'upcoming' ? upcoming : past

  return (
    <>
      <PageHeader
        eyebrow="Live Music & Events"
        title="Evenings Worth Staying For"
        subtitle="Acoustic sets, latte art nights and slow tastings — the events calendar at Nako Cafe."
        bg={images.cta}
      />

      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="flex justify-center">
              <div className="inline-flex rounded-full border border-line/15 bg-card p-1.5">
                <button
                  onClick={() => setView('upcoming')}
                  className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                    view === 'upcoming' ? 'bg-gold text-[#2B1A10]' : 'text-ink/60 hover:text-gold'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setView('past')}
                  className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                    view === 'past' ? 'bg-gold text-[#2B1A10]' : 'text-ink/60 hover:text-gold'
                  }`}
                >
                  Past Nights
                </button>
              </div>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl space-y-5">
            {shown.length ? (
              shown.map((e, i) => {
                const d = new Date(`${e.date}T12:00:00`)
                return (
                  <Reveal key={e.id} delay={i * 0.06}>
                    <article className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-wine text-gold">
                        <span className="font-display text-3xl font-bold leading-none">{d.getDate()}</span>
                        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em]">
                          {d.toLocaleString('en', { month: 'short' })}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                            {e.tag}
                          </span>
                          <span className="rounded bg-line/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink/60">
                            {e.time}
                          </span>
                          {e.featured && (
                            <span className="rounded bg-wine px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 font-display text-xl font-semibold">{e.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink/60">{e.description}</p>
                      </div>
                      <div className="shrink-0">
                        {view === 'upcoming' ? (
                          <Link to="/reservation" className="btn-outline !px-5 !py-2.5">
                            <CalendarRange size={15} /> Book Your Spot
                          </Link>
                        ) : (
                          <span className="rounded-full border border-gold/20 px-4 py-2 text-xs font-semibold text-gold">
                            That was a night ✦
                          </span>
                        )}
                      </div>
                    </article>
                  </Reveal>
                )
              })
            ) : (
              <Reveal>
                <div className="card p-12 text-center">
                  <Music2 size={40} className="mx-auto text-ink/25" />
                  <p className="mt-4 font-display text-xl text-ink/70">
                    {view === 'upcoming'
                      ? 'New events are being booked. Follow us on Instagram for the drop.'
                      : 'No past events yet — the first season is still being written.'}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          {upcoming.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-16">
                <SectionHeading
                  eyebrow="Next Event"
                  title="Counting Down"
                  subtitle={`${next.title} · ${next.date}`}
                />
                <div className="mx-auto max-w-2xl">
                  <Countdown target={next.date} label="until the next event" />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection />
    </>
  )
}