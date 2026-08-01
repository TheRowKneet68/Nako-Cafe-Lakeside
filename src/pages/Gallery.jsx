import PageHeader from '../components/ui/PageHeader.jsx'
import GallerySection from '../components/sections/GallerySection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function Gallery() {
  useSEO({
    title: 'Gallery',
    description:
      'A look inside Nako Cafe — latte art, the brew bar, warm interiors, outdoor seating and the people who make Lakeside mornings better.'
  })

  return (
    <>
      <PageHeader
        eyebrow="Picture Perfect"
        title="Our Gallery"
        subtitle="Coffee, latte art, interiors and the moments in between."
        bg={images.hero}
      />
      <GallerySection full />
      <CTASection />
    </>
  )
}
