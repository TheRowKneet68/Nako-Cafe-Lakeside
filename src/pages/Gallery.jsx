import PageHeader from '../components/ui/PageHeader.jsx'
import GallerySection from '../components/sections/GallerySection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { useData } from '../context/DataContext.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function Gallery() {
  const { settings } = useData()
  const ph = settings.sections?.pageHeaders?.gallery || {}
  useSEO({
    title: 'Gallery',
    description:
      'A look inside Nako Cafe — latte art, the brew bar, warm interiors, outdoor seating and the people who make Lakeside mornings better.'
  })

  return (
    <>
      <PageHeader
        eyebrow={ph.eyebrow || 'Picture Perfect'}
        title={ph.title || 'Our Gallery'}
        subtitle={ph.subtitle || 'Coffee, latte art, interiors and the moments in between.'}
        bg={settings.heroImage || images.hero}
      />
      <GallerySection full />
      <CTASection />
    </>
  )
}
