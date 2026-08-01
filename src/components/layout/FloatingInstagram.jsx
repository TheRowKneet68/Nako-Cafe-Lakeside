import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

export default function FloatingInstagram() {
  const { settings } = useData()

  return (
    <motion.a
      href={settings.instagram}
      target="_blank"
      rel="noreferrer"
      aria-label="Follow us on Instagram"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-24 left-6 z-[60] grid h-11 w-11 place-items-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg"
      style={{ height: 52, width: 52 }}
    >
      <Instagram size={24} className="relative" />
    </motion.a>
  )
}
