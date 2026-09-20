import { Link } from 'react-router-dom'
import { CalendarCheck, Phone } from 'lucide-react'
import Reveal from '../ui/Reveal.jsx'
import { images } from '../../data/siteData.js'
import { useData } from '../../context/DataContext.jsx'

export default function CTASection() {
  const { settings } = useData()

  return (
    <section className="relative overflow-hidden py-28">
      <img
        src={settings.ctaImage || images.cta}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#141210]/85" />
      <Reveal className="container-x relative text-center">
        <p className="eyebrow mb-4">Visit Us Today</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold text-white sm:text-6xl">
          {settings.ctaTitle} <span className="text-gold">{settings.ctaTitleHighlight}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/70">
          {settings.ctaSubtitle}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/reservation" className="btn-gold">
            <CalendarCheck size={18} /> Reserve a Table
          </Link>
          <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="btn-outline">
            <Phone size={18} /> {settings.phone}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
