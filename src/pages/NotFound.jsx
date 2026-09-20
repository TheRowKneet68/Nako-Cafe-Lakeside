import { Link } from 'react-router-dom'
import { Coffee, Home, Menu as MenuIcon } from 'lucide-react'
import { useSEO } from '../hooks/useSEO.js'
import { images } from '../data/siteData.js'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for has wandered off. Back to Nako Cafe for a fresh cup.'
  })

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={images.hero} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[var(--bg)]" />
      </div>

      <div className="container-x py-36 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-wine text-gold">
          <Coffee size={28} />
        </span>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Error 404</p>
        <h1 className="mt-4 font-display text-6xl font-bold text-white sm:text-7xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-white/75">
          The page you were looking for has wandered off for a coffee. Let us get you back to
          somewhere warm.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-gold">
            <Home size={18} /> Back Home
          </Link>
          <Link to="/menu" className="btn-outline !border-[#e8c28e]/70 !text-[#e8c28e] hover:!bg-[#e8c28e] hover:!text-[#241710]">
            <MenuIcon size={18} /> Browse the Menu
          </Link>
        </div>
      </div>
    </section>
  )
}