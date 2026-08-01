import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { VegBadge } from './Badges.jsx'
import { formatPrice } from '../../utils/helpers.js'

export default function FoodCard({ food, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group card overflow-hidden"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {typeof food.veg === 'boolean' && <VegBadge veg={food.veg} />}
          {food.popular && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2B1A10]">
              Popular
            </span>
          )}
          {food.new && (
            <span className="rounded-full bg-[#1E1E1E]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F7F3ED]">
              New
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-gold backdrop-blur">
          <Star size={12} className="fill-gold" />
          {Number(food.rating || 4.5).toFixed(1)}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">{food.name}</h3>
          <span className="shrink-0 font-display text-lg font-bold text-gold">
            {formatPrice(food.price)}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{food.description}</p>
      </div>
    </motion.article>
  )
}
