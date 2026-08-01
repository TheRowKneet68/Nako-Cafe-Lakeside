import { useCountUp } from '../../hooks/useCountUp.js'

export default function AnimatedCounter({ value, suffix = '', decimals = 0, className = '' }) {
  const [ref, n] = useCountUp(value, { decimals })
  return (
    <span ref={ref} className={className}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}
