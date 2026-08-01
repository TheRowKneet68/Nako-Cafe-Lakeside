import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, LogIn, Moon, Sun, UtensilsCrossed } from 'lucide-react'
import { adminLogin } from '../../services/auth.js'
import { useTheme } from '../../hooks/useTheme.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [dark, setDark] = useTheme()

  const submit = (e) => {
    e.preventDefault()
    if (adminLogin(email, password)) navigate('/admin')
    else setError('Invalid credentials. Try admin@viewside.com / admin123.')
  }

  return (
    <div className="grid min-h-screen place-items-center bg-night p-4">
      <button
        onClick={() => setDark((d) => !d)}
        className="fixed right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line/15 text-ink transition hover:border-gold hover:text-gold"
        aria-label="Toggle dark mode"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-sm p-8"
      >
        <div className="flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-wine text-gold">
            <UtensilsCrossed size={24} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-xs text-ink/50">
            View Side Restaurant · Pokhara
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="admin@viewside.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" className="btn-gold w-full">
            <LogIn size={16} /> Sign In
          </button>
          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink/40">
            <Lock size={12} /> Default: admin@viewside.com / admin123
          </p>
        </form>
      </motion.div>
    </div>
  )
}
