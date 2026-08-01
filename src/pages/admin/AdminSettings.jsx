import { useState } from 'react'
import { Save } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { Field } from '../../components/admin/ui.jsx'

export default function AdminSettings() {
  const { settings, updateSettings, resetData } = useData()
  const [form, setForm] = useState({ ...settings })
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleReset = () => {
    if (window.confirm('Reset ALL data (menu, gallery, reviews, reservations, messages) to defaults?')) {
      resetData()
      setForm({ ...settings })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-ink/50">Business information shown across the site.</p>
        </div>
        {saved && <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm text-green-400">Saved ✓</span>}
      </div>

      <form onSubmit={save} className="card grid gap-5 p-6 sm:grid-cols-2">
        <Field label="Restaurant Name">
          <input className="input" value={form.name} onChange={set('name')} />
        </Field>
        <Field label="Tagline">
          <input className="input" value={form.tagline} onChange={set('tagline')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Address">
            <input className="input" value={form.address} onChange={set('address')} />
          </Field>
        </div>
        <Field label="Phone">
          <input className="input" value={form.phone} onChange={set('phone')} />
        </Field>
        <Field label="Mobile">
          <input className="input" value={form.mobile} onChange={set('mobile')} />
        </Field>
        <Field label="Email">
          <input className="input" value={form.email} onChange={set('email')} />
        </Field>
        <Field label="WhatsApp (digits only, e.g. 97798XXXXXXXX)">
          <input className="input" value={form.whatsapp} onChange={set('whatsapp')} />
        </Field>
        <Field label="Map Search Query">
          <input className="input" value={form.mapQuery} onChange={set('mapQuery')} />
        </Field>
        <Field label="Opening Days">
          <input className="input" value={form.openingDays} onChange={set('openingDays')} />
        </Field>
        <Field label="Opening Hours">
          <input className="input" value={form.openingHours} onChange={set('openingHours')} />
        </Field>
        <Field label="Instagram URL">
          <input className="input" value={form.instagram} onChange={set('instagram')} />
        </Field>
        <Field label="Facebook URL">
          <input className="input" value={form.facebook} onChange={set('facebook')} />
        </Field>
        <Field label="Twitter / X URL">
          <input className="input" value={form.twitter} onChange={set('twitter')} />
        </Field>
        <Field label="YouTube URL">
          <input className="input" value={form.youtube} onChange={set('youtube')} />
        </Field>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button type="submit" className="btn-gold">
            <Save size={16} /> Save Settings
          </button>
          <button type="button" onClick={handleReset} className="btn-outline !border-red-500/40 !text-red-400 hover:!bg-red-500 hover:!text-white">
            Reset All Data
          </button>
        </div>
      </form>
    </div>
  )
}
