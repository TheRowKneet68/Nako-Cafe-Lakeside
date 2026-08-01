import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarCheck, ChevronDown, Coffee, ShoppingBag } from 'lucide-react'
import { images } from '../../data/siteData.js'
import { useData } from '../../context/DataContext.jsx'

export default function Hero() {
  const { settings } = useData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const orderUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Hello Nako Cafe! I would like to place an order.'
  )}`

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <img src={images.hero} alt="A warm cup of coffee at Nako Cafe" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-[var(--bg)]" />
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute bottom-[24%] left-1/2 -translate-x-1/2">
        <span className="steam-wisp" style={{ left: -22, animationDelay: '0s' }} />
        <span className="steam-wisp" style={{ left: -2, animationDelay: '0.9s' }} />
        <span className="steam-wisp" style={{ left: 16, animationDelay: '1.8s' }} />
      </div>

      <motion.div style={{ opacity }} className="container-x py-36 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="eyebrow mb-6"
        >
          {settings.heroBadge}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-8xl"
        >
          {settings.heroTitle} <span className="gold-text italic">{settings.heroHighlight}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/80"
        >
          {settings.heroSubtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/menu" className="btn-outline">
            <Coffee size={18} /> View Menu
          </Link>
          <a href={orderUrl} target="_blank" rel="noreferrer" className="btn-wine">
            <ShoppingBag size={18} /> Order Now
          </a>
          <Link to="/reservation" className="btn-gold">
            <CalendarCheck size={18} /> Reserve a Table
          </Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <ChevronDown size={34} />
      </motion.a>
    </section>
  )
}
