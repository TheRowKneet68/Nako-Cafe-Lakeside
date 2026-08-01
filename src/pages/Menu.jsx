import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Soup } from 'lucide-react'
import { useData } from '../context/DataContext.jsx'
import FoodCard from '../components/ui/FoodCard.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function Menu() {
  useSEO({
    title: 'Our Menu',
    description:
      'Explore the full Nako Cafe menu — espresso, lattes, Spanish latte, pour over, cold brew, hot chocolate, tea, pastries, desserts & light food. With veg, popular and new badges.'
  })

  const { foods, categories } = useData()
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return foods.filter(
      (f) =>
        (cat === 'all' || f.category === cat) &&
        (!query ||
          f.name.toLowerCase().includes(query) ||
          (f.description || '').toLowerCase().includes(query))
    )
  }, [foods, cat, q])

  const counts = useMemo(() => {
    const c = { all: foods.length }
    categories.forEach((x) => {
      c[x.id] = foods.filter((f) => f.category === x.id).length
    })
    return c
  }, [foods, categories])

  return (
    <>
      <PageHeader
        eyebrow="Taste the Menu"
        title="Our Coffee & Menu"
        subtitle="Search, filter by category, and spot the veg, popular and new picks at a glance."
        bg={images.hero}
      />

      <section className="py-16">
        <div className="container-x">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search drinks… e.g. latte, spanish, mocha"
                className="input !pl-11"
                aria-label="Search menu items"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2.5">
              <button
                onClick={() => setCat('all')}
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  cat === 'all'
                    ? 'border-gold bg-gold text-[#2B1A10]'
                    : 'border-line/20 text-ink/60 hover:border-gold hover:text-gold'
                }`}
              >
                All · {counts.all}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    cat === c.id
                      ? 'border-gold bg-gold text-[#2B1A10]'
                      : 'border-line/20 text-ink/60 hover:border-gold hover:text-gold'
                  }`}
                >
                  {c.name} · {counts[c.id] || 0}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((f, i) => (
                <FoodCard key={f.id} food={f} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {!filtered.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 flex flex-col items-center text-ink/50"
            >
              <Soup size={48} className="mb-4 text-ink/25" />
              <p className="font-display text-xl">No items match your search.</p>
              <p className="mt-1 text-sm">Try a different keyword or category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
