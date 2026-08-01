import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 28 })
  const ringY = useSpring(y, { stiffness: 300, damping: 28 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) =>
      setHovering(!!e.target.closest('a,button,[role="button"],input,textarea,select'))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      >
        <motion.div
          animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 1 : 0.8 }}
          transition={{ duration: 0.25 }}
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border border-gold/70"
        />
      </motion.div>
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block">
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold" />
      </motion.div>
    </>
  )
}
