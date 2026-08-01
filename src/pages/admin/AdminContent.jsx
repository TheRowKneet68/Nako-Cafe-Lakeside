import { useState } from 'react'
import { Save } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { Field } from '../../components/admin/ui.jsx'

const GROUPS = [
  {
    title: 'Hero Section',
    fields: [
      { key: 'heroBadge', label: 'Badge (small top line)', type: 'input' },
      { key: 'heroTitle', label: 'Title', type: 'input' },
      { key: 'heroHighlight', label: 'Title highlight (gold italic word)', type: 'input' },
      { key: 'heroSubtitle', label: 'Subtitle', type: 'textarea' }
    ]
  },
  {
    title: 'About / Story',
    fields: [
      { key: 'aboutEyebrow', label: 'Eyebrow', type: 'input' },
      { key: 'aboutTitle', label: 'Title', type: 'input' },
      { key: 'aboutTitleHighlight', label: 'Title highlight (gold word)', type: 'input' },
      { key: 'aboutText1', label: 'Paragraph 1', type: 'textarea' },
      { key: 'aboutText2', label: 'Paragraph 2', type: 'textarea' }
    ]
  },
  {
    title: 'Mission & Vision',
    fields: [
      { key: 'mission', label: 'Mission', type: 'textarea' },
      { key: 'vision', label: 'Vision', type: 'textarea' }
    ]
  },
  {
    title: 'Barista',
    fields: [
      { key: 'chefName', label: 'Name', type: 'input' },
      { key: 'chefRole', label: 'Role / title', type: 'input' },
      { key: 'chefBio', label: 'Bio', type: 'textarea' }
    ]
  },
  {
    title: 'Customer Favourites',
    fields: [
      { key: 'signatureEyebrow', label: 'Eyebrow', type: 'input' },
      { key: 'signatureTitle', label: 'Title', type: 'input' },
      { key: 'signatureSubtitle', label: 'Subtitle', type: 'input' }
    ]
  },
  {
    title: 'Gallery',
    fields: [
      { key: 'galleryEyebrow', label: 'Eyebrow', type: 'input' },
      { key: 'galleryTitle', label: 'Title', type: 'input' },
      { key: 'gallerySubtitle', label: 'Subtitle', type: 'input' }
    ]
  },
  {
    title: 'Reviews',
    fields: [
      { key: 'reviewsEyebrow', label: 'Eyebrow', type: 'input' },
      { key: 'reviewsTitle', label: 'Title', type: 'input' },
      { key: 'reviewsSubtitle', label: 'Subtitle', type: 'input' }
    ]
  },
  {
    title: 'Reserve CTA Banner',
    fields: [
      { key: 'ctaTitle', label: 'Title', type: 'input' },
      { key: 'ctaTitleHighlight', label: 'Title highlight (gold word)', type: 'input' },
      { key: 'ctaSubtitle', label: 'Subtitle', type: 'input' }
    ]
  },
  {
    title: 'Footer',
    fields: [{ key: 'footerAbout', label: 'About text', type: 'textarea' }]
  }
]

export default function AdminContent() {
  const { settings, updateSettings } = useData()
  const [form, setForm] = useState(() =>
    Object.fromEntries(GROUPS.flatMap((g) => g.fields.map((f) => [f.key, settings[f.key] || ''])))
  )
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Content Editor</h1>
          <p className="mt-1 text-sm text-ink/50">
            Edit every piece of text on the website — it updates instantly across all pages.
          </p>
        </div>
        {saved && (
          <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm text-green-400">Saved ✓</span>
        )}
      </div>

      <form onSubmit={save} className="space-y-6">
        {GROUPS.map((group) => (
          <div key={group.title} className="card p-6">
            <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
              {group.title}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {group.fields.map((f) => (
                <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <Field label={f.label}>
                    {f.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={form[f.key] || ''}
                        onChange={set(f.key)}
                        className="textarea resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[f.key] || ''}
                        onChange={set(f.key)}
                        className="input"
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button type="submit" className="btn-gold !px-8">
            <Save size={16} /> Save All Changes
          </button>
        </div>
      </form>
    </div>
  )
}
