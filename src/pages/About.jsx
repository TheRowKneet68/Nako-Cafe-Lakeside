import PageHeader from '../components/ui/PageHeader.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { useData } from '../context/DataContext.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function About() {
  const { settings } = useData()
  const ph = settings.sections?.pageHeaders?.about || {}
  useSEO({
    title: 'About Us',
    description:
      'The story of Nako Cafe — small-batch Nepali beans, barista craft and a warm minimalist space in the heart of Lakeside, Pokhara.'
  })

  return (
    <>
      <PageHeader
        eyebrow={ph.eyebrow || 'Our Story'}
        title={ph.title || 'About Nako Cafe'}
        subtitle={ph.subtitle || 'Small-batch Nepali coffee, poured with care in a space made for lingering.'}
        bg={settings.aboutImage2 || images.about2}
      />
      <AboutSection />
      <CTASection />
    </>
  )
}
