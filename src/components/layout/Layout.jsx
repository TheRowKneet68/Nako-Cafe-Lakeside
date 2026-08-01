import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import BackToTop from './BackToTop.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import FloatingInstagram from './FloatingInstagram.jsx'
import CustomCursor from './CustomCursor.jsx'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <CustomCursor />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <FloatingInstagram />
    </div>
  )
}
