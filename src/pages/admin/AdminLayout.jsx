import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarCheck,
  ExternalLink,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Moon,
  PenSquare,
  Settings,
  Star,
  Sun,
  UtensilsCrossed,
  X
} from 'lucide-react'
import { adminLogout } from '../../services/auth.js'
import { useData } from '../../context/DataContext.jsx'
import { useTheme } from '../../hooks/useTheme.js'

const items = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/foods', label: 'Menu Items', icon: UtensilsCrossed },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/reservations', label: 'Reservations', icon: CalendarCheck },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/content', label: 'Content Editor', icon: PenSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings }
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { reservations, messages } = useData()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useTheme()

  const pending = reservations.filter((r) => r.status === 'pending').length
  const unread = messages.filter((m) => !m.read).length

  const logout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  const nav = (
    <>
      <div className="flex items-center gap-2.5 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-wine text-gold">
          <UtensilsCrossed size={18} />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-semibold">View Side</span>
          <span className="block text-[9px] uppercase tracking-[0.3em] text-gold">Admin Panel</span>
        </span>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-4 py-3 text-sm transition ${
                isActive ? 'bg-wine text-gold' : 'text-ink/65 hover:bg-line/5 hover:text-ink'
              }`
            }
          >
            <span className="flex items-center gap-3">
              <item.icon size={18} />
              {item.label}
            </span>
            {item.to === '/admin/reservations' && pending > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[10px] font-bold text-night">
                {pending}
              </span>
            )}
            {item.to === '/admin/messages' && unread > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[10px] font-bold text-night">
                {unread}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 space-y-1.5 border-t border-line/10 pt-5">
        <button
          onClick={() => setDark((d) => !d)}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-ink/65 transition hover:bg-line/5 hover:text-ink"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />} {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-ink/65 transition hover:bg-line/5 hover:text-ink"
        >
          <ExternalLink size={18} /> View Site
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-ink/65 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-night">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line/10 bg-night p-5 lg:flex">
        {nav}
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex h-full w-64 flex-col border-r border-line/10 bg-night p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-line/10 text-ink/60"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
              {nav}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line/10 bg-night/90 px-5 py-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line/15 text-ink"
            aria-label="Open admin menu"
          >
            <Menu size={18} />
          </button>
          <span className="font-display text-sm font-semibold text-gold">View Side · Admin</span>
          <button
            onClick={() => setDark((d) => !d)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line/15 text-ink transition hover:border-gold hover:text-gold"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main className="mx-auto max-w-6xl p-5 lg:p-8">{<Outlet />}</main>
      </div>
    </div>
  )
}
