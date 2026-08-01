import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { EmptyState } from '../../components/admin/ui.jsx'

export default function AdminMessages() {
  const { messages, update, remove } = useData()

  const handleDelete = (m) => {
    if (window.confirm('Delete this message?')) remove('messages', m.id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Contact Messages</h1>
        <p className="mt-1 text-sm text-white/50">
          {messages.filter((m) => !m.read).length} unread of {messages.length} total.
        </p>
      </div>

      {messages.length ? (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`card flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between ${m.read ? '' : 'border-gold/30'}`}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{m.subject}</h3>
                  {!m.read && (
                    <span className="rounded bg-gold px-2 py-0.5 text-[9px] font-bold uppercase text-night">New</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-white/55">
                  {m.name} · <span className="text-white/40">{m.email}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{m.message}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => update('messages', m.id, { read: !m.read })}
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-gold hover:text-gold"
                  aria-label="Toggle read"
                >
                  {m.read ? <MailOpen size={14} /> : <Mail size={14} />}
                  {m.read ? 'Mark unread' : 'Mark read'}
                </button>
                <button
                  onClick={() => handleDelete(m)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-red-500 hover:text-red-400"
                  aria-label="Delete message"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No contact messages yet." />
      )}
    </div>
  )
}
