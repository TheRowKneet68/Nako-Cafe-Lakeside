import { useMemo, useState } from 'react'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { Modal, Field, ImageInput, EmptyState } from '../../components/admin/ui.jsx'
import { VegBadge, SpicyIndicator } from '../../components/ui/Badges.jsx'
import { formatPrice } from '../../utils/helpers.js'

const empty = {
  name: '',
  category: '',
  price: '',
  description: '',
  image: '',
  veg: true,
  spicy: 0,
  popular: false,
  new: false,
  rating: 4.5
}

export default function AdminFoods() {
  const { foods, categories, add, update, remove, addCategory } = useData()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [q, setQ] = useState('')
  const [newCat, setNewCat] = useState('')

  const filtered = useMemo(
    () => foods.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())),
    [foods, q]
  )

  const openAdd = () => {
    setEditing(null)
    setForm({ ...empty, category: categories[0]?.id || '' })
    setModal(true)
  }

  const openEdit = (f) => {
    setEditing(f)
    setForm({ ...empty, ...f, price: String(f.price) })
    setModal(true)
  }

  const save = async (e) => {
    e.preventDefault()
    let category = form.category
    if (newCat.trim()) {
      await addCategory(newCat.trim())
      category = newCat.trim()
    }
    const payload = {
      ...form,
      category,
      price: Number(form.price) || 0,
      spicy: Number(form.spicy) || 0,
      rating: Number(form.rating) || 4.5
    }
    if (editing) await update('foods', editing.id, payload)
    else await add('foods', payload)
    setModal(false)
    setNewCat('')
  }

  const handleDelete = (f) => {
    if (window.confirm(`Delete "${f.name}" from the menu?`)) remove('foods', f.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Menu Items</h1>
          <p className="mt-1 text-sm text-white/50">{foods.length} dishes across {categories.length} categories.</p>
        </div>
        <button onClick={openAdd} className="btn-gold !px-5 !py-3">
          <Plus size={16} /> Add Food Item
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search menu items…"
          className="input !pl-10"
        />
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((f) => (
            <div key={f.id} className="card flex gap-4 p-4">
              <img src={f.image} alt={f.name} className="h-24 w-24 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="truncate font-display text-lg font-semibold">{f.name}</h3>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEdit(f)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-gold hover:text-gold"
                      aria-label={`Edit ${f.name}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(f)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:border-red-500 hover:text-red-400"
                      aria-label={`Delete ${f.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/50">
                  <span className="rounded bg-white/5 px-2 py-0.5 capitalize">{f.category}</span>
                  <VegBadge veg={f.veg} />
                  <SpicyIndicator level={f.spicy} />
                  {f.popular && <span className="rounded bg-gold px-2 py-0.5 font-semibold text-night">Popular</span>}
                  {f.new && <span className="rounded bg-white/10 px-2 py-0.5 font-semibold text-white/70">New</span>}
                </div>
                <p className="mt-1.5 font-display text-gold">{formatPrice(f.price)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No menu items match your search." />
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Food Item' : 'Add Food Item'} wide>
        <form onSubmit={save} className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ImageInput value={form.image} onChange={(image) => setForm((p) => ({ ...p, image }))} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Name *">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Chicken Chowmein"
                className="input"
              />
            </Field>
          </div>
          <Field label="Category *">
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="select"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <div>
            <Field label="New category (optional)">
              <input
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                placeholder="e.g. Seafood"
                className="input"
              />
            </Field>
          </div>
          <Field label="Price (Rs) *">
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
              placeholder="350"
              className="input"
            />
          </Field>
          <Field label="Rating (0–5)">
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
              className="input"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="A short, appetising description…"
                className="textarea resize-none"
              />
            </Field>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
            <label className="flex items-center gap-2.5 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.veg}
                onChange={(e) => setForm((p) => ({ ...p, veg: e.target.checked }))}
                className="h-4 w-4 accent-gold"
              />
              Vegetarian
            </label>
            <label className="flex items-center gap-2.5 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.popular}
                onChange={(e) => setForm((p) => ({ ...p, popular: e.target.checked }))}
                className="h-4 w-4 accent-gold"
              />
              Popular badge
            </label>
            <label className="flex items-center gap-2.5 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.new}
                onChange={(e) => setForm((p) => ({ ...p, new: e.target.checked }))}
                className="h-4 w-4 accent-gold"
              />
              New badge
            </label>
            <Field label="Spice level">
              <select
                value={form.spicy}
                onChange={(e) => setForm((p) => ({ ...p, spicy: Number(e.target.value) }))}
                className="select !w-28"
              >
                <option value={0}>None</option>
                <option value={1}>Mild</option>
                <option value={2}>Medium</option>
                <option value={3}>Hot</option>
              </select>
            </Field>
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-gold flex-1">
              {editing ? 'Save Changes' : 'Add Item'}
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
