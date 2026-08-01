import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { Modal, Field, ImageInput, EmptyState } from '../../components/admin/ui.jsx'

export default function AdminGallery() {
  const { gallery, add, remove } = useData()
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ src: '', alt: '', category: 'Interior' })

  const save = async (e) => {
    e.preventDefault()
    if (!form.src) return
    await add('gallery', form)
    setModal(false)
    setForm({ src: '', alt: '', category: 'Interior' })
  }

  const handleDelete = (item) => {
    if (window.confirm('Delete this gallery image?')) remove('gallery', item.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Gallery</h1>
          <p className="mt-1 text-sm text-ink/50">{gallery.length} photos.</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-gold !px-5 !py-3">
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {gallery.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item) => (
            <div key={item.id} className="group card overflow-hidden">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <button
                  onClick={() => handleDelete(item)}
                  className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-red-400 opacity-0 backdrop-blur transition group-hover:opacity-100"
                  aria-label="Delete image"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium">{item.alt || 'Untitled'}</p>
                <p className="text-xs uppercase tracking-wider text-ink/40">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No photos yet — add your first one." />
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Add Gallery Photo">
        <form onSubmit={save} className="space-y-5">
          <ImageInput value={form.src} onChange={(src) => setForm((p) => ({ ...p, src }))} />
          <Field label="Caption / Alt text">
            <input
              value={form.alt}
              onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))}
              placeholder="e.g. Lakeside terrace at sunset"
              className="input"
            />
          </Field>
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="select"
            >
              {['Interior', 'Food', 'Kitchen', 'Outdoor', 'Family Dining', 'Night View', 'Coffee', 'Dessert'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <div className="flex gap-3">
            <button type="submit" className="btn-gold flex-1" disabled={!form.src}>
              Add Photo
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
