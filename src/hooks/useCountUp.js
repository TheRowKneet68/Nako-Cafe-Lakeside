import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { duration = 1600, decimals = 0, start = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(start)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const step = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(start + (target - start) * eased)
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration, decimals, start])

  return [ref, value]
}
