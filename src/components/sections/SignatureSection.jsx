import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useData } from '../../context/DataContext.jsx'
import FoodCard from '../ui/FoodCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function SignatureSection() {
  const { foods, settings } = useData()
  const signature = foods.filter((f) => f.popular).slice(0, 10)

  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={settings.signatureEyebrow}
          title={settings.signatureTitle}
          subtitle={settings.signatureSubtitle}
        />
      </div>
      <div className="container-x">
        {signature.length ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            className="!pb-14"
          >
            {signature.map((f, i) => (
              <SwiperSlide key={f.id} className="h-auto">
                <FoodCard food={f} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-ink/50">No signature coffees yet.</p>
        )}
      </div>
    </section>
  )
}
