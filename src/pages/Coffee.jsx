import { Link } from 'react-router-dom'
import { ArrowRight, Bean, Coffee as CoffeeIcon, Flame, Leaf, ShoppingBag, Sparkles } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import FoodCard from '../components/ui/FoodCard.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { useData } from '../context/DataContext.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

const highlightIcons = [Bean, Flame, Leaf]
const craftIcons = [Bean, Sparkles, CoffeeIcon]

export default function Coffee() {
  const { foods, settings } = useData()
  const coffee = settings.sections?.coffee || {}
  const highlights = coffee.highlights || []
  const craft = coffee.craft || []
  const intro = coffee.intro || {}
  const craftHeading = coffee.craftHeading || {}
  const favouritesHeading = coffee.favouritesHeading || {}

  useSEO({
    title: 'Featured Coffee',
    description:
      'The Spanish Latte — Nako Cafe’s most loved cup. Espresso blended with sweet condensed milk and silky milk, made from small-batch Nepali beans.'
  })

  const signature = foods.filter((f) => f.popular).slice(0, 8)
  const orderUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Hello Nako Cafe! I would like to order a Spanish Latte.'
  )}`

  return (
    <>
      <PageHeader
        eyebrow="Featured Coffee"
        title="The Spanish Latte"
        subtitle="The cup our regulars say they can't find anywhere else — and the reason many first discover Nako Cafe."
        bg={settings.heroImage || images.hero}
      />

      <section className="py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <img
                src={settings.coffeeImage || images.coffee}
                alt="Spanish Latte with caramel swirl"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">{intro.eyebrow || 'Why It’s a Legend'}</span>
              <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
                {intro.title || 'Espresso, Sweetened'}{' '}
                <span className="text-gold">{intro.titleHighlight || 'the Spanish Way'}</span>
              </h2>
              <p className="mt-6 leading-relaxed text-ink/65">
                {intro.text ||
                  'The Spanish Latte is not just our best-selling drink — it is the drink people cross Lakeside for.'}
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {highlights.map((h, i) => {
                const Icon = highlightIcons[i % highlightIcons.length]
                return (
                  <Reveal key={i} delay={0.1 + i * 0.08}>
                    <div className="card flex items-start gap-4 p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wine text-gold">
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{h.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink/55">{h.text}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href={orderUrl} target="_blank" rel="noreferrer" className="btn-gold">
                  <ShoppingBag size={18} /> Order on WhatsApp
                </a>
                <Link to="/menu" className="btn-outline">
                  See Full Menu <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={craftHeading.eyebrow || 'Our Craft'}
            title={craftHeading.title || 'How We Brew'}
            subtitle={craftHeading.subtitle || 'Three small obsessions that make every cup worth slowing down for.'}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {craft.map((c, i) => {
              const Icon = craftIcons[i % craftIcons.length]
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="card h-full p-8 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-wine text-gold">
                      <Icon size={26} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">{c.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={favouritesHeading.eyebrow || 'Customer Favourites'}
            title={favouritesHeading.title || 'Start With These'}
            subtitle={favouritesHeading.subtitle || 'The drinks and bites our guests order again and again.'}
          />
          {signature.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {signature.map((f, i) => (
                <FoodCard key={f.id} food={f} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink/50">No signature coffees yet.</p>
          )}
          <div className="mt-12 text-center">
            <Link to="/menu" className="btn-outline">
              View the Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}