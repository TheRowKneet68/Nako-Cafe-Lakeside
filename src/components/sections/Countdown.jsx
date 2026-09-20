import { useEffect, useState } from 'react'

function diff(target) {
  const now = new Date()
  const t = new Date(target)
  const d = Math.max(0, t - now)
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    mins: Math.floor((d % 3600000) / 60000),
    secs: Math.floor((d % 60000) / 1000)
  }
}

export default function Countdown({ target, label = 'until the event' }) {
  const [t, setT] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const cells = [
    ['Days', t.days],
    ['Hours', t.hours],
    ['Mins', t.mins],
    ['Secs', t.secs]
  ]
  const done = cells.every(([, v]) => v === 0)

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {done ? (
        <div className="min-w-[220px] rounded-2xl border border-gold/25 bg-card p-6 text-center">
          <p className="font-display text-2xl font-bold text-gold">Tonight!</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">{label}</p>
        </div>
      ) : (
        cells.map(([k, v]) => (
          <div key={k} className="min-w-[76px] rounded-2xl border border-gold/25 bg-card p-4 text-center">
            <p className="font-display text-3xl font-bold text-gold">{String(v).padStart(2, '0')}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/50">{k}</p>
          </div>
        ))
      )}
    </div>
  )
}