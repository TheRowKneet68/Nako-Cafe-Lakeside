import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

export default function WhatsAppButton() {
  const { settings } = useData()
  const href = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Hello Nako Cafe! I would like to reserve a table.'
  )}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, type: 'spring', stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-[60] grid place-items-center rounded-full bg-[#25D366] text-white shadow-lg"
      style={{ height: 52, width: 52 }}
      aria-label="Chat on WhatsApp"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      />
      <MessageCircle size={24} className="relative" />
    </motion.a>
  )
}
