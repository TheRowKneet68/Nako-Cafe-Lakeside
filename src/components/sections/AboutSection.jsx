import {
  Armchair,
  Bean,
  CupSoda,
  Info,
  Leaf,
  Sofa,
  Sparkles,
  Users,
  Utensils,
  Wifi
} from 'lucide-react'
import Reveal from '../ui/Reveal.jsx'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'
import { images } from '../../data/siteData.js'
import { useData } from '../../context/DataContext.jsx'

const values = [
  {
    icon: Bean,
    title: 'Small-Batch Roasting',
    text: 'Beans from the hills of Syangja, roasted fresh every week so every cup tastes alive.'
  },
  {
    icon: Leaf,
    title: 'Local Sourcing',
    text: 'Milk, sugar and seasonal produce from Pokhara’s own farms and market gardens.'
  },
  {
    icon: Sparkles,
    title: 'Barista Craft',
    text: 'Every cup is dialled in — dose, ratio and timing, measured shot by shot.'
  },
  {
    icon: Armchair,
    title: 'A Space to Stay',
    text: 'Minimalist, calm and built for lingering — work, chat or simply be.'
  }
]

const amenityGroups = [
  {
    icon: Utensils,
    title: 'Service Options',
    items: ['Outdoor Seating', 'Dine-in', 'Takeaway', 'Delivery', 'On-site Services']
  },
  {
    icon: CupSoda,
    title: 'Offerings',
    items: ['Coffee', 'Vegan Options', 'Vegetarian Options', 'Small Plates', 'Quick Bite', 'Alcohol']
  },
  {
    icon: Sofa,
    title: 'Atmosphere',
    items: ['Casual', 'Cosy', 'Quiet', 'Trendy', 'Solo Dining Friendly']
  },
  {
    icon: Wifi,
    title: 'Amenities',
    items: ['Free Wi-Fi', 'Gender-Neutral Toilets', 'NFC Payments', 'Seating', 'Table Service']
  },
  {
    icon: Users,
    title: 'Our Crowd',
    items: ['Family Friendly', 'Groups', 'LGBTQ+ Friendly', 'Transgender Safe Space', 'Tourists', 'University Students']
  },
  {
    icon: Info,
    title: 'Good to Know',
    items: ['Good for Kids', 'Dogs Allowed', 'Free Street Parking', 'Free Parking Lot', 'Breakfast & Dessert']
  }
]

export default function AboutSection() {
  const { settings } = useData()

  return (
    <section id="about" className="py-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={images.about1}
                alt="Freshly roasted coffee beans at Nako Cafe"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 w-52 overflow-hidden rounded-2xl border-4 border-night shadow-2xl sm:w-64">
              <img
                src={images.about2}
                alt="Latte art poured at the brew bar"
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="absolute -left-6 -top-6 grid h-28 w-28 place-items-center rounded-full bg-gold text-center text-[#2B1A10] shadow-glow">
              <div>
                <p className="font-display text-3xl font-bold">100%</p>
                <p className="px-3 text-[10px] font-semibold uppercase leading-tight tracking-widest">
                  Nepali Beans
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">{settings.aboutEyebrow}</span>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              {settings.aboutTitle} <span className="text-gold">{settings.aboutTitleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 leading-relaxed text-ink/65">
              <p>{settings.aboutText1}</p>
              <p>{settings.aboutText2}</p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.15 + i * 0.08}>
                <div className="card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-wine text-gold">
                    <v.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/55">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-24">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="eyebrow">Good to Know</p>
            <h3 className="mt-3 font-display text-3xl font-bold">
              Amenities & <span className="text-gold">Atmosphere</span>
            </h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenityGroups.map((g, i) => (
              <div key={g.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-wine text-gold">
                    <g.icon size={18} />
                  </span>
                  <h4 className="font-display text-lg font-semibold">{g.title}</h4>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line/15 bg-night px-3.5 py-1.5 text-xs text-ink/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-24">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card border-gold/20 p-8">
              <p className="eyebrow">Our Mission</p>
              <p className="mt-4 leading-relaxed text-ink/70">{settings.mission}</p>
            </div>
            <div className="card p-8">
              <p className="eyebrow">Our Vision</p>
              <p className="mt-4 leading-relaxed text-ink/70">{settings.vision}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-24">
        <Reveal>
          <div className="card grid overflow-hidden md:grid-cols-[320px_1fr]">
            <img
              src={images.chef}
              alt="Head barista at Nako Cafe"
              loading="lazy"
              className="h-80 w-full object-cover md:h-full"
            />
            <div className="p-8 md:p-12">
              <p className="eyebrow">Meet Our Barista</p>
              <h3 className="mt-3 font-display text-3xl font-bold">{settings.chefName}</h3>
              <p className="mt-2 text-sm uppercase tracking-widest text-gold">{settings.chefRole}</p>
              <p className="mt-5 max-w-xl leading-relaxed text-ink/70">{settings.chefBio}</p>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <AnimatedCounter
                    value={10}
                    suffix="+"
                    className="gold-text font-display text-4xl font-bold"
                  />
                  <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">
                    Years Brewing
                  </p>
                </div>
                <div>
                  <AnimatedCounter
                    value={1}
                    suffix="K+"
                    className="gold-text font-display text-4xl font-bold"
                  />
                  <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">
                    Cups Poured
                  </p>
                </div>
                <div>
                  <AnimatedCounter
                    value={100}
                    suffix="%"
                    className="gold-text font-display text-4xl font-bold"
                  />
                  <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">
                    Nepali Beans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
