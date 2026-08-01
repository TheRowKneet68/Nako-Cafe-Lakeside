import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ImagePlus, X } from 'lucide-react'

export function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`card w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} p-6`}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-line/10 transition hover:border-gold hover:text-gold"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
        {label}
      </span>
      {children}
    </label>
  )
}

export function ImageInput({ value, onChange, label = 'Image' }) {
  const fileRef = useRef()

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-bl bg-red-600 text-white"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-dashed border-line/25 text-ink/50 transition hover:border-gold hover:text-gold"
            aria-label="Upload image"
          >
            <ImagePlus size={20} />
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
        <input
          type="text"
          className="input"
          placeholder="or paste an image URL"
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </Field>
  )
}

export function StatCard({ icon: Icon, label, value, tone = 'text-gold' }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-night ${tone}`}>
        <Icon size={22} />
      </span>
      <div>
        <p className="font-display text-2xl font-bold">{value}</p>
        <p className="text-xs uppercase tracking-wider text-ink/50">{label}</p>
      </div>
    </div>
  )
}

export function EmptyState({ text = 'Nothing here yet.' }) {
  return <p className="py-10 text-center text-sm text-ink/40">{text}</p>
}
