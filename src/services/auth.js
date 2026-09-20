import { supabase, hasSupabase } from './supabaseClient.js'

const KEY = 'ncl_admin_auth'

// Fallback demo credentials exist ONLY for local development, so the site
// still demos without any .env file (npm run dev). In a production build
// import.meta.env.DEV is `false`, so the fallback folds to '' and the
// admin panel FAILS CLOSED: nobody can sign in until the real credentials
// are supplied via VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD.
const DEMO_FALLBACK_EMAIL = 'admin@nakocafe.com.np'
const DEMO_FALLBACK_PASSWORD = 'admin123'

export const isAdmin = () => localStorage.getItem(KEY) === '1'

async function demoLogin(email, password) {
  const okEmail = import.meta.env.VITE_ADMIN_EMAIL || (import.meta.env.DEV ? DEMO_FALLBACK_EMAIL : '')
  const okPass = import.meta.env.VITE_ADMIN_PASSWORD || (import.meta.env.DEV ? DEMO_FALLBACK_PASSWORD : '')
  if (!okEmail || !okPass) return { ok: false, reason: 'not-configured' }
  if (
    String(email || '').trim().toLowerCase() === okEmail.toLowerCase() &&
    String(password || '') === okPass
  ) {
    localStorage.setItem(KEY, '1')
    return { ok: true }
  }
  return { ok: false, reason: 'invalid' }
}

async function supabaseLogin(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(email || '').trim().toLowerCase(),
      password: String(password || '')
    })
    if (error || !data?.user) return { ok: false, reason: 'invalid' }

    const { data: profile } = await supabase
      .from('ncl_profiles')
      .select('role')
      .eq('id', data.user.id)
      .maybeSingle()

    const role = profile?.role || ''
    if (role !== 'admin' && role !== 'employee') {
      await supabase.auth.signOut().catch(() => {})
      return { ok: false, reason: 'forbidden' }
    }

    localStorage.setItem(KEY, '1')
    return { ok: true, role }
  } catch {
    return { ok: false, reason: 'error' }
  }
}

export function adminLogin(email, password) {
  return hasSupabase ? supabaseLogin(email, password) : demoLogin(email, password)
}

export async function adminLogout() {
  localStorage.removeItem(KEY)
  if (hasSupabase) await supabase.auth.signOut().catch(() => {})
}