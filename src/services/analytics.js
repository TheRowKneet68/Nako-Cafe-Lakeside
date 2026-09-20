import { supabase } from './supabaseClient.js'

// local fallback counter so the dashboard works without Supabase
const LOCAL_KEY = 'ncl_visits'

export function getLocalVisits() {
  return Number(localStorage.getItem(LOCAL_KEY) || 0)
}

// Records a visit locally and best-effort server-side (via the SECURITY
// DEFINER RPC ncl_track_visit — anon can never write analytics directly).
export async function trackVisit() {
  const local = getLocalVisits() + 1
  localStorage.setItem(LOCAL_KEY, String(local))
  if (supabase) {
    try {
      await supabase.rpc('ncl_track_visit')
    } catch (err) {
      console.warn('Server-side visit tracking skipped.', err?.message)
    }
  }
  return local
}

// Returns the server counter when Supabase is configured, else the local one.
export async function getVisits() {
  if (!supabase) return getLocalVisits()
  try {
    const { data } = await supabase
      .from('ncl_analytics')
      .select('value')
      .eq('key', 'visits')
      .maybeSingle()
    return data ? Number(data.value) : getLocalVisits()
  } catch (err) {
    console.warn('Visit counter read failed.', err?.message)
    return getLocalVisits()
  }
}