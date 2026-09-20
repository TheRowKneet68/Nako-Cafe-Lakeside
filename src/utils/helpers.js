export const cn = (...cls) => cls.filter(Boolean).join(' ')

export const formatPrice = (n) => `Rs ${Number(n || 0).toLocaleString()}`

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

export const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const statusColor = (status = 'pending') =>
  ({
    pending: 'bg-amber-500/15 text-amber-400',
    confirmed: 'bg-green-500/15 text-green-400',
    cancelled: 'bg-red-500/15 text-red-400'
  })[status] || 'bg-white/10 text-white/60'

export const cafeSchema = (s, reviews = []) => {
  const avg = reviews.length
    ? (reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length).toFixed(1)
    : null
  const rating = avg ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avg, reviewCount: String(reviews.length) } } : {}
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: s.name,
    description: s.tagline,
    image: s.heroImage || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80',
    servesCuisine: ['Coffee', 'Tea', 'Pastries', 'Light Food'],
    priceRange: s.priceRange || 'Rs 1-500',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address,
      addressLocality: 'Pokhara',
      addressCountry: 'NP'
    },
    telephone: s.phone,
    email: s.email,
    openingHours: 'Mo-Su 07:00-21:00',
    ...rating
  }
}
