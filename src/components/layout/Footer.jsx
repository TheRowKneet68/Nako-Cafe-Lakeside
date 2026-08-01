import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Coffee,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube
} from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

export default function Footer() {
  const { settings } = useData()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const socials = [
    { icon: Instagram, href: settings.instagram, label: 'Instagram' },
    { icon: Facebook, href: settings.facebook, label: 'Facebook' },
    { icon: Twitter, href: settings.twitter, label: 'Twitter' },
    { icon: Youtube, href: settings.youtube, label: 'YouTube' }
  ]

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/menu', label: 'Our Menu' },
    { to: '/coffee', label: 'Featured Coffee' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/reservation', label: 'Reserve a Table' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <footer className="border-t border-white/10 bg-[#0c0c0c]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-wine text-gold">
              <Coffee size={20} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold">Nako</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
                Cafe
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            {settings.footerAbout}
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-gold hover:text-gold"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-gold">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="text-sm text-white/60 transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-gold">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-gold" />
              {settings.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={17} className="shrink-0 text-gold" />
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-gold">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={17} className="shrink-0 text-gold" />
              <a href={`mailto:${settings.email}`} className="hover:text-gold">
                {settings.email}
              </a>
            </li>
            <li className="text-xs uppercase tracking-wider text-white/40">
              {settings.openingDays} · {settings.openingHours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-gold">Newsletter</h3>
          <p className="mt-5 text-sm text-white/55">
            Fresh roasts, seasonal pastries & news from Lakeside — straight to your inbox.
          </p>
          {subscribed ? (
            <p className="mt-4 rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
              Thank you for subscribing!
            </p>
          ) : (
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSubscribed(true)
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="input !py-2.5"
                aria-label="Email address"
              />
              <button type="submit" className="btn-gold !px-4 !py-2.5" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Nako Cafe, Pokhara. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="transition hover:text-gold">
              Admin
            </Link>
            <span>·</span>
            <p>
              Made by{' '}
              <a href="tel:9829117277" className="text-white/60 transition hover:text-gold">
                Ronit Baniya · Surkasha Ghar · 9829117277
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
