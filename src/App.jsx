import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import Preloader from './components/layout/Preloader.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import Coffee from './pages/Coffee.jsx'
import Gallery from './pages/Gallery.jsx'
import Events from './pages/Events.jsx'
import Reviews from './pages/Reviews.jsx'
import Reservation from './pages/Reservation.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import RequireAdmin from './components/admin/RequireAdmin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminFoods from './pages/admin/AdminFoods.jsx'
import AdminEvents from './pages/admin/AdminEvents.jsx'
import AdminGallery from './pages/admin/AdminGallery.jsx'
import AdminReservations from './pages/admin/AdminReservations.jsx'
import AdminMessages from './pages/admin/AdminMessages.jsx'
import AdminReviews from './pages/admin/AdminReviews.jsx'
import AdminContent from './pages/admin/AdminContent.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <Preloader />
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {isAdmin ? (
            <Routes location={location}>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="foods" element={<AdminFoods />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="reservations" element={<AdminReservations />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Layout>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/coffee" element={<Coffee />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          )}
        </motion.div>
    </>
  )
}
