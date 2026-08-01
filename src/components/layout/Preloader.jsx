import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Coffee } from 'lucide-react'

export default function Preloader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#1E1E1E]"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid h-20 w-20 place-items-center rounded-full bg-wine text-gold shadow-glow"
            >
              <Coffee size={34} />
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="font-display text-2xl font-bold tracking-wide">
                Nako <span className="text-gold">Cafe</span>
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-gold/70">Lakeside · Pokhara</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10"
            >
              <motion.span
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                className="block h-full w-full bg-gold"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
