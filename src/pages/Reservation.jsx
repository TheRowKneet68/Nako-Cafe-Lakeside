import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Check, Clock, MapPin, Phone, Users } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { useData } from '../context/DataContext.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { sendEmail } from '../services/emailService.js'
import { escapeHtml } from '../lib/escape.js'
import { images } from '../data/siteData.js'

const timeSlots = []
for (let h = 7; h <= 21; h++) {
  for (const m of [0, 30]) {
    if (h === 21 && m === 30) continue
    const label = `${h % 12 === 0 ? 12 : h % 12}:${m.toString().padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
    timeSlots.push(label)
  }
}

export default function Reservation() {
  useSEO({
    title: 'Reserve a Table',
    description:
      'Reserve your table at Nako Cafe, Pokhara. Name, phone, guests, date & time — reserve in seconds for the best seats at Lakeside.'
  })

  const { add, settings } = useData()
  const ph = settings.sections?.pageHeaders?.reservation || {}
  const [submitted, setSubmitted] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const today = new Date().toISOString().split('T')[0]

  const onSubmit = async (data) => {
    const reservation = { ...data, status: 'pending' }
    const res = await add('reservations', reservation)
    if (!res?.ok) {
      setSubmitError("We couldn't save your reservation right now. Please try again or call us.")
      return
    }
    setSubmitError('')
    await sendEmail({
      to_name: settings.name,
      subject: `Reservation request · ${data.name}`,
      message_html: [
        `<p><strong>New reservation request</strong></p>`,
        `<p>${escapeHtml(data.name)} · ${escapeHtml(data.guests)} guests · ${escapeHtml(data.date)} at ${escapeHtml(data.time)}</p>`,
        `<p>Phone: ${escapeHtml(data.phone)}${data.email ? ` · Email: ${escapeHtml(data.email)}` : ''}</p>`,
        data.request ? `<p>Request: ${escapeHtml(data.request)}</p>` : ''
      ].join('')
    })
    setSubmitted(reservation)
    reset()
  }

  return (
    <>
      <PageHeader
        eyebrow={ph.eyebrow || 'Book a Table'}
        title={ph.title || 'Reserve Your Visit'}
        subtitle={ph.subtitle || "Tell us when — we'll keep the best seat by the window ready for you."}
        bg={settings.heroImage || images.hero}
      />

      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_360px]">
          <Reveal>
            <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sita Sharma"
                    className="input"
                    {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name is too short' } })}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +977 98XXXXXXXX"
                    className="input"
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: { value: /^[+0-9\s-]{7,15}$/, message: 'Enter a valid phone number' }
                    })}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input"
                    {...register('email', {
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
                    })}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Guests *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    placeholder="2"
                    className="input"
                    {...register('guests', {
                      required: 'Guests required',
                      min: { value: 1, message: 'At least 1 guest' },
                      max: { value: 20, message: 'Max 20 guests (call for groups)' }
                    })}
                  />
                  {errors.guests && <p className="mt-1.5 text-xs text-red-400">{errors.guests.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Date *
                  </label>
                  <input
                    type="date"
                    min={today}
                    className="input"
                    {...register('date', { required: 'Date is required' })}
                  />
                  {errors.date && <p className="mt-1.5 text-xs text-red-400">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Time *
                  </label>
                  <select
                    className="select"
                    defaultValue=""
                    {...register('time', { required: 'Time is required' })}
                  >
                    <option value="" disabled>
                      Select a time
                    </option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="mt-1.5 text-xs text-red-400">{errors.time.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Special Request
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Window seat, birthday cake, vegetarian preference…"
                    className="textarea resize-none"
                    {...register('request')}
                  />
                </div>
              </div>
              <button type="submit" className="btn-gold mt-6 w-full">
                <CalendarCheck size={18} /> Confirm Reservation
              </button>
              {submitError && (
                <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {submitError}
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-5">
              <div className="card border-gold/20 p-6">
                <h3 className="font-display text-xl font-semibold text-gold">Opening Hours</h3>
                <div className="mt-4 flex items-start gap-3 text-ink/70">
                  <Clock size={18} className="mt-0.5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-ink">{settings.openingDays}</p>
                    <p className="text-sm">{settings.openingHours}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-3 text-ink/70">
                  <Users size={18} className="mt-0.5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-ink">Groups up to 20</p>
                    <p className="text-sm">Larger parties — give us a call.</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-display text-xl font-semibold text-gold">Need Help?</h3>
                <div className="mt-4 space-y-3 text-sm text-ink/70">
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-gold">
                    <Phone size={16} className="text-gold" /> {settings.phone}
                  </a>
                  <p className="flex items-center gap-3">
                    <MapPin size={16} className="shrink-0 text-gold" /> {settings.address}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[96] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setSubmitted(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="card max-w-md p-10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 14 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500/15 text-green-400"
              >
                <Check size={40} />
              </motion.span>
              <h3 className="mt-6 font-display text-3xl font-bold">Table Reserved!</h3>
              <p className="mt-3 leading-relaxed text-ink/65">
                Thank you, {submitted.name}. We&apos;ve saved a table for {submitted.guests} on{' '}
                {submitted.date} at {submitted.time}.
                {submitted.request && (
                  <>
                    {' '}
                    We&apos;ll do our best to arrange: <span className="text-gold">&ldquo;{submitted.request}&rdquo;</span>
                  </>
                )}
              </p>
              <button onClick={() => setSubmitted(null)} className="btn-gold mt-7">
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
