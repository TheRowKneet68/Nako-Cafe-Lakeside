import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { useData } from '../context/DataContext.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { sendEmail } from '../services/emailService.js'
import { escapeHtml } from '../lib/escape.js'
import { images } from '../data/siteData.js'

export default function Contact() {
  useSEO({
    title: 'Contact Us',
    description:
      'Contact Nako Cafe in Pokhara, Nepal. Call, email or visit us at Lakeside — open daily, 7:00 AM to 9:00 PM. Follow us on Instagram.'
  })

  const { add, settings } = useData()
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    await add('messages', { ...data, read: false })
    await sendEmail({
      to_name: settings.name,
      subject: `[Nako Cafe] ${data.subject}`,
      message_html: [
        `<p><strong>New contact message from ${escapeHtml(data.name)}</strong></p>`,
        `<p>Email: ${escapeHtml(data.email)}</p>`,
        `<p>Subject: ${escapeHtml(data.subject)}</p>`,
        `<p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`
      ].join('')
    })
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 5000)
  }

  const cards = [
    { icon: MapPin, title: 'Address', lines: [settings.address] },
    { icon: Phone, title: 'Phone', lines: [settings.phone, settings.mobile] },
    { icon: Mail, title: 'Email', lines: [settings.email] },
    { icon: Clock, title: 'Opening Hours', lines: [`${settings.openingDays}`, settings.openingHours] }
  ]

  return (
    <>
      <PageHeader
        eyebrow="Say Hello"
        title="Contact Us"
        subtitle="We'd love to hear from you — questions, feedback or a group visit to the cafe."
        bg={images.cta}
      />

      <section className="py-16">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="card h-full p-6 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-wine text-gold">
                    <c.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm text-ink/60">
                      {l}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold">Send Us a Message</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="input"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
                      })}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="input"
                      {...register('subject', { required: 'Subject is required' })}
                    />
                    {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Write your message…"
                      className="textarea resize-none"
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message is too short' }
                      })}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn-gold mt-6">
                    <Send size={17} /> Send Message
                  </button>
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline mt-6"
                  >
                    <Instagram size={17} /> Follow on Instagram
                  </a>
                </div>
                <AnimatePresence>
                  {sent && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
                    >
                      <Check size={16} /> Thank you! Your message has been received.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full min-h-[420px] overflow-hidden rounded-2xl border border-line/15">
                <iframe
                  title="Nako Cafe location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery)}&output=embed`}
                  className="h-full w-full"
                  style={{ border: 0, minHeight: 420 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
