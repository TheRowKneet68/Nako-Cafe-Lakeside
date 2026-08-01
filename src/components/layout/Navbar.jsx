import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Coffee, Menu, Moon, Sun, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/coffee', label: 'Coffee' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' }
]

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('nako_theme') === 'dark'
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('nako_theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark]
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-night/90 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-wine text-gold transition group-hover:scale-105">
            <Coffee size={20} />
          </span>
          <span className="leading-tight">
            <span
              className={`block font-display text-lg font-semibold tracking-wide ${
                scrolled || open ? 'text-ink' : 'text-white'
              }`}
            >
              Nako
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
              Cafe
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative text-sm tracking-wide transition-colors hover:text-gold ${
                  isActive
                    ? 'text-gold'
                    : scrolled || open
                      ? 'text-ink/80'
                      : 'text-white/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded bg-gold"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className={`grid h-10 w-10 place-items-center rounded-full border transition hover:border-gold hover:text-gold ${
              scrolled || open ? 'border-line/25 text-ink' : 'border-white/15 text-white'
            }`}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link to="/reservation" className="btn-gold !px-5 !py-2.5">
            <CalendarCheck size={16} /> Reserve
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className={`grid h-11 w-11 place-items-center rounded-full border transition hover:border-gold hover:text-gold ${
              scrolled || open ? 'border-line/25 text-ink' : 'border-white/15 text-white'
            }`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition hover:border-gold hover:text-gold ${
              scrolled || open ? 'border-line/25 text-ink' : 'border-white/15 text-white'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 pb-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 font-display text-xl transition ${
                        isActive ? 'bg-wine text-gold' : 'hover:bg-white/5'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/reservation" className="btn-gold mt-3">
                <CalendarCheck size={16} /> Reserve a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
