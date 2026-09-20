import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function Lightbox({ index, items, onClose, onNav }) {
  useEffect(() => {
    if (index === null) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [index])

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNav(-1)
            }}
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNav(1)
            }}
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
          <motion.img
            key={index}
            src={items[index].src}
            alt={items[index].alt}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
              {items[index].category}
            </span>
            <p className="mt-1 font-display text-lg">{items[index].alt}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function GallerySection({ full = false }) {
  const { gallery, settings } = useData()
  const [lightbox, setLightbox] = useState(null)
  const items = full ? gallery : gallery.slice(0, 8)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((l) => (l + 1) % items.length)
      if (e.key === 'ArrowLeft') setLightbox((l) => (l - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, items.length])

  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={settings.galleryEyebrow}
          title={settings.galleryTitle}
          subtitle={settings.gallerySubtitle}
        />

        {items.length ? (
          <div
            className={
              full
                ? 'columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4'
                : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
            }
          >
            {items.map((img, i) => (
              <motion.button
                key={img.id}
                type="button"
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className="group relative block w-full overflow-hidden rounded-xl text-left"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    full ? 'h-auto' : 'h-64'
                  }`}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                      {img.category}
                    </span>
                    <p className="font-display text-lg text-white">{img.alt}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50">Gallery is empty.</p>
        )}

        {!full && (
          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-outline">
              View Full Gallery
            </Link>
          </div>
        )}
      </div>

      <Lightbox
        index={lightbox}
        items={items}
        onClose={() => setLightbox(null)}
        onNav={(dir) =>
          setLightbox((l) => (l + dir + items.length) % items.length)
        }
      />
    </section>
  )
}
