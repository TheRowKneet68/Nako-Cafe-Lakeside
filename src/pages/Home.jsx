import Hero from '../components/sections/Hero.jsx'
import Stats from '../components/sections/Stats.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import SignatureSection from '../components/sections/SignatureSection.jsx'
import EventsPreview from '../components/sections/EventsPreview.jsx'
import GallerySection from '../components/sections/GallerySection.jsx'
import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { useData } from '../context/DataContext.jsx'
import { cafeSchema } from '../utils/helpers.js'

export default function Home() {
  const { settings, reviews } = useData()
  useSEO({
    description:
      'Specialty coffee from carefully selected Nepali beans in Lakeside, Pokhara. Spanish Latte, espresso, pour over, fresh pastries & a warm workspace. Rated 4.9/5.',
    image: settings.heroImage,
    jsonLd: cafeSchema(settings, reviews)
  })

  return (
    <>
      <Hero />
      <Stats />
      <AboutSection />
      <SignatureSection />
      <GallerySection />
      <EventsPreview />
      <ReviewsSection limit={6} />
      <CTASection />
    </>
  )
}
