import { Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { EmptyState } from '../../components/admin/ui.jsx'
import { formatDate, statusColor } from '../../utils/helpers.js'

export default function AdminReservations() {
  const { reservations, update, remove } = useData()

  const handleDelete = (r) => {
    if (window.confirm(`Delete reservation for ${r.name}?`)) remove('reservations', r.id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Reservations</h1>
        <p className="mt-1 text-sm text-ink/50">{reservations.length} bookings received.</p>
      </div>

      {reservations.length ? (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div key={r.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{r.name}</h3>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${statusColor(r.status)}`}>
                    {r.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/55">
                  {formatDate(r.date)} · {r.time} · {r.guests} guests
                </p>
                <p className="mt-0.5 text-xs text-ink/40">
                  {r.phone}
                  {r.email ? ` · ${r.email}` : ''}
                </p>
                {r.request && <p className="mt-2 text-sm text-ink/50">“{r.request}”</p>}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <select
                  value={r.status}
                  onChange={(e) => update('reservations', r.id, { status: e.target.value })}
                  className="select !w-36 !py-2"
                  aria-label="Update status"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDelete(r)}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line/10 text-ink/60 transition hover:border-red-500 hover:text-red-400"
                  aria-label="Delete reservation"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No reservations yet." />
      )}
    </div>
  )
}
