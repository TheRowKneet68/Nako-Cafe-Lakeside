import { CalendarCheck, Image, Mail, Star, UtensilsCrossed } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { StatCard, EmptyState } from '../../components/admin/ui.jsx'
import { statusColor } from '../../utils/helpers.js'

export default function AdminDashboard() {
  const { foods, gallery, reviews, reservations, messages } = useData()
  const pending = reservations.filter((r) => r.status === 'pending').length
  const unread = messages.filter((m) => !m.read).length
  const avg = reviews.length
    ? reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length
    : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">An overview of everything happening at View Side.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UtensilsCrossed} label="Menu Items" value={foods.length} />
        <StatCard icon={CalendarCheck} label="Reservations" value={reservations.length} tone="text-amber-400" />
        <StatCard icon={Mail} label="Unread Messages" value={unread} tone="text-sky-400" />
        <StatCard icon={Star} label="Avg Rating" value={avg ? avg.toFixed(1) : '—'} tone="text-accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-xl font-bold">Recent Reservations</h2>
          <ul className="mt-4 divide-y divide-white/5">
            {reservations.slice(0, 6).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-white/45">
                    {r.date} · {r.time} · {r.guests} guests
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${statusColor(r.status)}`}>
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
          {!reservations.length && <EmptyState text="No reservations yet." />}
        </div>

        <div className="card p-6">
          <h2 className="font-display text-xl font-bold">Recent Messages</h2>
          <ul className="mt-4 divide-y divide-white/5">
            {messages.slice(0, 6).map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {m.subject}
                    {!m.read && <span className="ml-2 rounded bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase text-night">New</span>}
                  </p>
                  <p className="truncate text-xs text-white/45">
                    {m.name} · {m.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {!messages.length && <EmptyState text="No contact messages yet." />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard icon={Image} label="Gallery Photos" value={gallery.length} tone="text-pink-400" />
        <StatCard icon={CalendarCheck} label="Pending" value={pending} tone="text-amber-400" />
        <StatCard icon={Star} label="Total Reviews" value={reviews.length} tone="text-accent" />
      </div>
    </div>
  )
}
