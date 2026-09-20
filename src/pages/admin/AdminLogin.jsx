import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, LogIn, Moon, Sun, UtensilsCrossed } from 'lucide-react'
import { adminLogin } from '../../services/auth.js'
import { useTheme } from '../../hooks/useTheme.js'

const MESSAGES = {
  'not-configured':
    "This site hasn't been set up for admin login yet. The owner needs to configure the admin credentials (see the README).",
  invalid: 'That email and password combination is not correct.',
  forbidden: 'This account does not have admin access.',
  error: "We couldn't sign you in right now. Please try again in a moment."
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [dark, setDark] = useTheme()

  const submit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) return setError('Please enter both your email and password.')
    setBusy(true)
    setError('')
    const res = await adminLogin(email, password)
    setBusy(false)
    if (res?.ok) navigate('/admin')
    else setError(MESSAGES[res?.reason] || MESSAGES.error)
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
            Nako Cafe · Pokhara
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
              placeholder="you@example.com"
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
          <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-60">
            {busy ? <span className="animate-pulse">Signing in…</span> : (<><LogIn size={16} /> Sign In</>)}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink/40">
            <Lock size={12} /> This area is for Nako Cafe staff only.
          </p>
        </form>
      </motion.div>
    </div>
  )
}