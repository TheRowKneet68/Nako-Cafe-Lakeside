import PageHeader from '../components/ui/PageHeader.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function About() {
  useSEO({
    title: 'About Us',
    description:
      'The story of Nako Cafe — small-batch Nepali beans, barista craft and a warm minimalist space in the heart of Lakeside, Pokhara.'
  })

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About Nako Cafe"
        subtitle="Small-batch Nepali coffee, poured with care in a space made for lingering."
        bg={images.about2}
      />
      <AboutSection />
      <CTASection />
    </>
  )
}
