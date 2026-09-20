import { useMemo, useState } from 'react'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { Modal, Field, ImageInput, EmptyState } from '../../components/admin/ui.jsx'
import { formatDate } from '../../utils/helpers.js'
import { notify } from '../../services/notify.js'

const empty = {
  title: '',
  date: '',
  time: '',
  tag: '',
  description: '',
  image: '',
  featured: false
}

export default function AdminEvents() {
  const { events, add, update, remove } = useData()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [q, setQ] = useState('')

  const filtered = useMemo(
    () =>
      events
        .filter((e) => e.title.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => (a.date > b.date ? 1 : -1)),
    [events, q]
  )

  const openAdd = () => {
    setEditing(null)
    setForm(empty)
    setModal(true)
  }

  const openEdit = (e) => {
    setEditing(e)
    setForm({ ...empty, ...e })
    setModal(true)
  }

  const save = async (ev) => {
    ev.preventDefault()
    if (!form.title || !form.date) return
    const res = editing ? await update('events', editing.id, form) : await add('events', form)
    if (!res?.ok) {
      notify("We couldn't save this event. Please check the information and try again.", 'error')
      return
    }
    setModal(false)
    notify(editing ? 'Event updated successfully.' : 'Event added successfully.')
  }

  const handleDelete = async (e) => {
    if (!window.confirm(`Delete "${e.title}"? This can't be undone.`)) return
    const res = await remove('events', e.id)
    if (!res?.ok) notify("We couldn't delete this event. Please try again.", 'error')
    else notify('Event deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Events</h1>
          <p className="mt-1 text-sm text-ink/50">{events.length} events on the calendar.</p>
        </div>
        <button onClick={openAdd} className="btn-gold !px-5 !py-3">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events…"
          className="input !pl-10"
        />
      </div>

      {filtered.length ? (
        <div className="space-y-4">
          {filtered.map((e) => (
            <div key={e.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-wine text-gold">
                <span className="font-display text-xl font-bold leading-none">
                  {e.date ? new Date(`${e.date}T12:00:00`).getDate() : '—'}
                </span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]">
                  {e.date
                    ? new Date(`${e.date}T12:00:00`).toLocaleString('en', { month: 'short' })
                    : ''}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {e.tag && (
                    <span className="rounded bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                      {e.tag}
                    </span>
                  )}
                  {e.time && (
                    <span className="rounded bg-line/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink/60">
                      {e.time}
                    </span>
                  )}
                  {e.featured && (
                    <span className="rounded bg-wine px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 truncate font-display text-lg font-semibold">{e.title}</h3>
                <p className="text-xs text-ink/45">
                  {e.date ? formatDate(e.date) : 'No date'}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={() => openEdit(e)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line/10 text-ink/60 transition hover:border-gold hover:text-gold"
                  aria-label={`Edit ${e.title}`}
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(e)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line/10 text-ink/60 transition hover:border-red-500 hover:text-red-400"
                  aria-label={`Delete ${e.title}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No events yet — add your first event." />
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Event' : 'Add Event'} wide>
        <form onSubmit={save} className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ImageInput value={form.image} onChange={(image) => setForm((p) => ({ ...p, image }))} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Title *">
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Acoustic Night at Nako"
                className="input"
              />
            </Field>
          </div>
          <Field label="Date *">
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="Time">
            <input
              type="text"
              value={form.time}
              onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
              placeholder="e.g. 6:30 PM"
              className="input"
            />
          </Field>
          <Field label="Tag / Category">
            <input
              type="text"
              value={form.tag}
              onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
              placeholder="e.g. Live Music"
              className="input"
            />
          </Field>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2.5 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                className="h-4 w-4 accent-gold"
              />
              Featured event
            </label>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="What makes this night worth it…"
                className="textarea resize-none"
              />
            </Field>
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-gold flex-1">
              {editing ? 'Save Changes' : 'Add Event'}
            </button>
            <button type="button" onClick={() => setModal(false)} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}