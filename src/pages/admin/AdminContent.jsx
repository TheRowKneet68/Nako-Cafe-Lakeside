import { useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { Field, ImageInput } from '../../components/admin/ui.jsx'
import { notify } from '../../services/notify.js'
import { defaultSections } from '../../data/siteData.js'

const TEXT_GROUPS = [
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
    title: 'Events',
    fields: [
      { key: 'eventsEyebrow', label: 'Eyebrow', type: 'input' },
      { key: 'eventsTitle', label: 'Title', type: 'input' },
      { key: 'eventsSubtitle', label: 'Subtitle', type: 'input' }
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

const IMAGE_FIELDS = [
  { key: 'heroImage', label: 'Homepage hero background' },
  { key: 'aboutImage1', label: 'About — main photo' },
  { key: 'aboutImage2', label: 'About — small photo' },
  { key: 'chefImage', label: 'About — barista photo' },
  { key: 'ctaImage', label: 'CTA banner background' },
  { key: 'coffeeImage', label: 'Coffee page — featured drink' }
]

const BADGES = ['Nepali Beans', 'Caramel Sweetness', 'Silky Finish']

export default function AdminContent() {
  const { settings, updateSettings } = useData()
  const [form, setForm] = useState(() =>
    Object.fromEntries(
      [
        ...TEXT_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, settings[f.key] || ''])),
        ...IMAGE_FIELDS.map((f) => [f.key, settings[f.key] || ''])
      ]
    )
  )
  const [sections, setSections] = useState(() => ({
    ...defaultSections,
    ...(settings.sections || {})
  }))

  const save = async (e) => {
    e.preventDefault()
    const res = await updateSettings({ ...form, sections })
    if (res?.ok) notify('Website content saved successfully.')
    else notify("We couldn't save the content. Please try again.", 'error')
  }

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))
  const setImg = (key) => (url) => setForm((p) => ({ ...p, [key]: url }))

  const setStat = (i, patch) =>
    setSections((s) => ({ ...s, stats: s.stats.map((x, idx) => (idx === i ? { ...x, ...patch } : x)) }))
  const setValue = (i, patch) =>
    setSections((s) => ({ ...s, values: s.values.map((x, idx) => (idx === i ? { ...x, ...patch } : x)) }))
  const setAmenityTitle = (i, title) =>
    setSections((s) => ({ ...s, amenities: s.amenities.map((x, idx) => (idx === i ? { ...x, title } : x)) }))
  const setAmenityItems = (i, items) =>
    setSections((s) => ({ ...s, amenities: s.amenities.map((x, idx) => (idx === i ? { ...x, items } : x)) }))
  const setCoffee = (group, i, patch) =>
    setSections((s) => ({
      ...s,
      coffee: { ...s.coffee, [group]: s.coffee[group].map((x, idx) => (idx === i ? { ...x, ...patch } : x)) }
    }))
  const setCoffeeField = (key, value) =>
    setSections((s) => ({ ...s, coffee: { ...s.coffee, [key]: value } }))
  const setBarista = (key, patch) =>
    setSections((s) => ({ ...s, barista: { ...s.barista, [key]: { ...(s.barista[key] || {}), ...patch } } }))
  const setPageHeader = (key, patch) =>
    setSections((s) => ({ ...s, pageHeaders: { ...s.pageHeaders, [key]: { ...(s.pageHeaders[key] || {}), ...patch } } }))
  const addBlock = (group, block) => setSections((s) => ({ ...s, [group]: [...s[group], block] }))
  const removeBlock = (group, i) =>
    setSections((s) => ({ ...s, [group]: s[group].filter((_, idx) => idx !== i) }))

  const input = (val, onChange, placeholder) => (
    <input type="text" value={val} onChange={onChange} placeholder={placeholder} className="input" />
  )
  const textarea = (val, onChange, rows = 2) => (
    <textarea rows={rows} value={val} onChange={onChange} className="textarea resize-none" />
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Content Editor</h1>
        <p className="mt-1 text-sm text-ink/50">
          Edit every piece of text and image on the website — it updates instantly across all pages.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        {/* Images */}
        <div className="card p-6">
          <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">Images</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {IMAGE_FIELDS.map((f) => (
              <ImageInput key={f.key} value={form[f.key]} onChange={setImg(f.key)} label={f.label} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="card p-6">
          <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
            Stats & Numbers
          </h2>
          <p className="mt-2 text-xs text-ink/50">
            The figures shown on the homepage and About page. Leave the suffix empty for a plain number.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {sections.stats.map((st, i) => (
              <div key={i} className="rounded-xl border border-line/10 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Number">
                    <input
                      type="number"
                      step="0.1"
                      value={st.value}
                      onChange={(e) => setStat(i, { value: Number(e.target.value) || 0 })}
                      className="input"
                    />
                  </Field>
                  <Field label="Suffix">
                    {input(st.suffix, (e) => setStat(i, { suffix: e.target.value }), 'e.g. +, /5, %')}
                  </Field>
                </div>
                <Field label="Label">
                  {input(st.label, (e) => setStat(i, { label: e.target.value }), 'e.g. Average Rating')}
                </Field>
              </div>
            ))}
          </div>
        </div>

        {/* About values */}
        <div className="card p-6">
          <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
            About — Value Cards
          </h2>
          <p className="mt-2 text-xs text-ink/50">The four cards on the About section.</p>
          <div className="mt-5 space-y-4">
            {sections.values.map((v, i) => (
              <div key={i} className="rounded-xl border border-line/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid flex-1 gap-3 sm:grid-cols-2">
                    <Field label={`Title ${i + 1}`}>
                      {input(v.title, (e) => setValue(i, { title: e.target.value }))}
                    </Field>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBlock('values', i)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line/10 text-ink/60 transition hover:border-red-500 hover:text-red-400"
                    aria-label="Remove value card"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mt-3">
                  <Field label="Text">
                    {textarea(v.text, (e) => setValue(i, { text: e.target.value }))}
                  </Field>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addBlock('values', { title: '', text: '' })}
            className="btn-outline mt-4 !px-4 !py-2 text-xs"
          >
            <Plus size={14} /> Add Value Card
          </button>
        </div>

        {/* Amenities */}
        <div className="card p-6">
          <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
            About — Amenities & Atmosphere
          </h2>
          <p className="mt-2 text-xs text-ink/50">One item per line. Add or remove items freely.</p>
          <div className="mt-5 space-y-4">
            {sections.amenities.map((g, i) => (
              <div key={i} className="rounded-xl border border-line/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <Field label="Group title">
                    {input(g.title, (e) => setAmenityTitle(i, e.target.value))}
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeBlock('amenities', i)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line/10 text-ink/60 transition hover:border-red-500 hover:text-red-400"
                    aria-label="Remove group"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <Field label="Items (one per line)">
                  {textarea(g.items.join('\n'), (e) =>
                    setAmenityItems(i, e.target.value.split('\n').filter((x) => x.trim()))
                  )}
                </Field>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addBlock('amenities', { title: '', items: [] })}
            className="btn-outline mt-4 !px-4 !py-2 text-xs"
          >
            <Plus size={14} /> Add Group
          </button>
        </div>

        {/* Coffee page */}
        <div className="card p-6">
          <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
            Coffee Page — Intro & Headings
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Intro eyebrow">
              {input(sections.coffee.intro.eyebrow, (e) => setCoffeeField('intro', { ...sections.coffee.intro, eyebrow: e.target.value }))}
            </Field>
            <Field label="Intro title">
              {input(sections.coffee.intro.title, (e) => setCoffeeField('intro', { ...sections.coffee.intro, title: e.target.value }))}
            </Field>
            <Field label="Intro title highlight (gold)">
              {input(sections.coffee.intro.titleHighlight, (e) => setCoffeeField('intro', { ...sections.coffee.intro, titleHighlight: e.target.value }))}
            </Field>
            <div className="sm:col-span-2">
              <Field label="Intro paragraph">
                {textarea(sections.coffee.intro.text, (e) => setCoffeeField('intro', { ...sections.coffee.intro, text: e.target.value }), 4)}
              </Field>
            </div>
            <Field label="Craft — eyebrow">
              {input(sections.coffee.craftHeading.eyebrow, (e) => setCoffeeField('craftHeading', { ...sections.coffee.craftHeading, eyebrow: e.target.value }))}
            </Field>
            <Field label="Craft — title">
              {input(sections.coffee.craftHeading.title, (e) => setCoffeeField('craftHeading', { ...sections.coffee.craftHeading, title: e.target.value }))}
            </Field>
            <div className="sm:col-span-2">
              <Field label="Craft — subtitle">
                {input(sections.coffee.craftHeading.subtitle, (e) => setCoffeeField('craftHeading', { ...sections.coffee.craftHeading, subtitle: e.target.value }))}
              </Field>
            </div>
            <Field label="Favourites — eyebrow">
              {input(sections.coffee.favouritesHeading.eyebrow, (e) => setCoffeeField('favouritesHeading', { ...sections.coffee.favouritesHeading, eyebrow: e.target.value }))}
            </Field>
            <Field label="Favourites — title">
              {input(sections.coffee.favouritesHeading.title, (e) => setCoffeeField('favouritesHeading', { ...sections.coffee.favouritesHeading, title: e.target.value }))}
            </Field>
            <div className="sm:col-span-2">
              <Field label="Favourites — subtitle">
                {input(sections.coffee.favouritesHeading.subtitle, (e) => setCoffeeField('favouritesHeading', { ...sections.coffee.favouritesHeading, subtitle: e.target.value }))}
              </Field>
            </div>
          </div>
        </div>

        {/* Barista counters */}
        <div className="card p-6">
          <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
            About — Barista Numbers
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {(['years', 'cups', 'beans']).map((key) => (
              <div key={key} className="rounded-xl border border-line/10 p-4">
                <Field label={key === 'years' ? 'Years Brewing' : key === 'cups' ? 'Cups Poured' : 'Nepali Beans'}>
                  <input
                    type="number"
                    value={sections.barista[key].value}
                    onChange={(e) => setBarista(key, { value: Number(e.target.value) || 0 })}
                    className="input"
                  />
                </Field>
                <Field label="Suffix">
                  {input(sections.barista[key].suffix, (e) => setBarista(key, { suffix: e.target.value }))}
                </Field>
              </div>
            ))}
          </div>
        </div>

        {/* Coffee page cards */}
        {(['highlights', 'craft']).map((group) => (
          <div key={group} className="card p-6">
            <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
              Coffee Page — {group === 'highlights' ? 'Why It’s a Legend' : 'How We Brew'}
            </h2>
            <div className="mt-5 space-y-4">
              {sections.coffee[group].map((c, i) => (
                <div key={i} className="rounded-xl border border-line/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid flex-1 gap-3 sm:grid-cols-2">
                      <Field label={`Title ${i + 1}`}>
                        {input(c.title, (e) => setCoffee(group, i, { title: e.target.value }), BADGES[i])}
                      </Field>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBlock(group, i)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line/10 text-ink/60 transition hover:border-red-500 hover:text-red-400"
                      aria-label="Remove block"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="mt-3">
                    <Field label="Text">
                      {textarea(c.text, (e) => setCoffee(group, i, { text: e.target.value }))}
                    </Field>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addBlock(group, { title: '', text: '' })}
              className="btn-outline mt-4 !px-4 !py-2 text-xs"
            >
              <Plus size={14} /> Add Block
            </button>
          </div>
        ))}

        {/* Page headers */}
        <div className="card p-6">
          <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
            Page Headers (banners)
          </h2>
          <p className="mt-2 text-xs text-ink/50">
            The eyebrow, title and subtitle shown on the banner of each page.
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            {Object.entries(sections.pageHeaders || {}).map(([key, ph]) => (
              <div key={key} className="rounded-xl border border-line/10 p-4">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gold">
                  {key[0].toUpperCase() + key.slice(1)} page
                </h3>
                <div className="space-y-3">
                  <Field label="Eyebrow">
                    {input(ph.eyebrow, (e) => setPageHeader(key, { eyebrow: e.target.value }))}
                  </Field>
                  <Field label="Title">
                    {input(ph.title, (e) => setPageHeader(key, { title: e.target.value }))}
                  </Field>
                  <Field label="Subtitle">
                    {input(ph.subtitle, (e) => setPageHeader(key, { subtitle: e.target.value }))}
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text groups */}
        {TEXT_GROUPS.map((group) => (
          <div key={group.title} className="card p-6">
            <h2 className="border-b border-line/10 pb-3 font-display text-xl font-bold text-gold">
              {group.title}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {group.fields.map((f) => (
                <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <Field label={f.label}>
                    {f.type === 'textarea'
                      ? textarea(form[f.key] || '', set(f.key))
                      : input(form[f.key] || '', set(f.key))}
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