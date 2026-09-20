import { useEffect } from 'react'

const SITE = {
  name: 'Nako Cafe',
  url: 'https://nako-cafe-lakeside.vercel.app',
  description:
    'Specialty coffee from carefully selected Nepali beans in Lakeside, Pokhara. Spanish Latte, espresso, pour over & fresh pastries. Open daily 7 AM – 9 PM. Rated 4.9/5.',
  image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80'
}

function setMeta(name, content) {
  let el =
    document.querySelector(`meta[property="${name}"]`) ||
    document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name'
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSEO({ title, description, jsonLd } = {}) {
  useEffect(() => {
    const t = title
      ? `${title} | Nako Cafe`
      : 'Nako Cafe | Specialty Coffee in Pokhara, Nepal'
    document.title = t
    setMeta('description', description || SITE.description)
    setMeta('og:title', t)
    setMeta('og:description', description || SITE.description)
    setMeta('og:type', 'website')
    setMeta('og:url', window.location.href)
    setMeta('og:image', SITE.image)
    setMeta('twitter:card', 'summary_large_image')

    if (jsonLd) {
      let el = document.getElementById('jsonld')
      if (!el) {
        el = document.createElement('script')
        el.type = 'application/ld+json'
        el.id = 'jsonld'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(jsonLd)
    }
  }, [title, description, jsonLd])
}
