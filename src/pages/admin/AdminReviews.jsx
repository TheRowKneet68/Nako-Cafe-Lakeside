import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { Modal, Field, EmptyState } from '../../components/admin/ui.jsx'
import RatingStars from '../../components/ui/RatingStars.jsx'
import { initials } from '../../utils/helpers.js'
import { notify } from '../../services/notify.js'

const empty = { name: '', location: '', rating: 4.5, text: '' }

export default function AdminReviews() {
  const { reviews, add, remove } = useData()
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)

  const save = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim()) return
    const res = await add('reviews', { ...form, rating: Number(form.rating) || 4.5 })
    if (!res?.ok) {
      notify("We couldn't publish this review. Please try again.", 'error')
      return
    }
    setModal(false)
    setForm(empty)
    notify('Review published.')
  }

  const handleDelete = async (r) => {
    if (!window.confirm(`Delete review by ${r.name}? This can't be undone.`)) return
    const res = await remove('reviews', r.id)
    if (!res?.ok) notify("We couldn't delete this review. Please try again.", 'error')
    else notify('Review deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Reviews</h1>
          <p className="mt-1 text-sm text-ink/50">{reviews.length} guest reviews.</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-gold !px-5 !py-3">
          <Plus size={16} /> Add Review
        </button>
      </div>

      {reviews.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-wine font-display font-bold text-gold">
                    {initials(r.name)}
                  </span>
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-ink/45">{r.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(r)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line/10 text-ink/60 transition hover:border-red-500 hover:text-red-400"
                  aria-label="Delete review"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="mt-3">
                <RatingStars rating={r.rating} size={14} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">“{r.text}”</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No reviews yet." />
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Add Review">
        <form onSubmit={save} className="space-y-5">
          <Field label="Name *">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Hari KC"
              className="input"
            />
          </Field>
          <Field label="Location">
            <input
              value={form.location}
              onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
              placeholder="e.g. Kathmandu, Nepal"
              className="input"
            />
          </Field>
          <Field label={`Rating: ${form.rating}/5`}>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={form.rating}
              onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
              className="w-full accent-gold"
            />
          </Field>
          <Field label="Review text *">
            <textarea
              required
              rows={4}
              value={form.text}
              onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
              placeholder="What did our guest say?"
              className="textarea resize-none"
            />
          </Field>
          <div className="flex gap-3">
            <button type="submit" className="btn-gold flex-1">
              Publish Review
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
