import PageHeader from '../components/ui/PageHeader.jsx'
import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import ReviewForm from '../components/sections/ReviewForm.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function Reviews() {
  useSEO({
    title: 'Guest Reviews',
    description:
      'Read why guests rate Nako Cafe 4.9/5 — the Spanish latte, espresso and warm service our regulars rave about in Lakeside, Pokhara.'
  })

  return (
    <>
      <PageHeader
        eyebrow="Guest Stories"
        title="Customer Reviews"
        subtitle="Honest words from locals and travellers who have enjoyed their coffee with us."
        bg={images.about1}
      />
      <ReviewsSection />
      <section className="pb-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl">
            <ReviewForm />
          </Reveal>
        </div>
      </section>
      <CTASection />
    </>
  )
}
