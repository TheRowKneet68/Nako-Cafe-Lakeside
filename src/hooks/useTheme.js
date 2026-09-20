import { useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('ncl_theme') === 'dark'
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('ncl_theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark]
}
