import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabase } from '../services/supabaseClient.js'
import { trackVisit, getVisits } from '../services/analytics.js'
import { defaultCategories } from '../data/categories.js'
import { defaultFoods } from '../data/foods.js'
import { defaultGallery } from '../data/gallery.js'
import { defaultReviews } from '../data/reviews.js'
import { defaultEvents } from '../data/events.js'
import { defaultSettings } from '../data/siteData.js'

const DataContext = createContext(null)

const KEYS = {
  foods: 'ncl_foods',
  categories: 'ncl_categories',
  gallery: 'ncl_gallery',
  reviews: 'ncl_reviews',
  events: 'ncl_events',
  reservations: 'ncl_reservations',
  messages: 'ncl_messages',
  settings: 'ncl_settings'
}

const TABLES = {
  foods: 'ncl_foods',
  categories: 'ncl_categories',
  gallery: 'ncl_gallery',
  reviews: 'ncl_reviews',
  events: 'ncl_events',
  reservations: 'ncl_reservations',
  messages: 'ncl_messages'
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

// Fields the DB owns; never send them on insert/update.
function stripSystem(row) {
  const { id: _id, created_at: _ca, ...rest } = row || {}
  const clean = {}
  for (const [k, v] of Object.entries(rest)) if (v !== undefined) clean[k] = v
  return clean
}

export function DataProvider({ children }) {
  const [foods, setFoods] = useState(() => load(KEYS.foods, defaultFoods))
  const [categories, setCategories] = useState(() => load(KEYS.categories, defaultCategories))
  const [gallery, setGallery] = useState(() => load(KEYS.gallery, defaultGallery))
  const [reviews, setReviews] = useState(() => load(KEYS.reviews, defaultReviews))
  const [events, setEvents] = useState(() => load(KEYS.events, defaultEvents))
  const [reservations, setReservations] = useState(() => load(KEYS.reservations, []))
  const [messages, setMessages] = useState(() => load(KEYS.messages, []))
  const [settings, setSettings] = useState(() => ({ ...defaultSettings, ...load(KEYS.settings, {}) }))
  const [visits, setVisits] = useState(0)

  useEffect(() => localStorage.setItem(KEYS.foods, JSON.stringify(foods)), [foods])
  useEffect(() => localStorage.setItem(KEYS.categories, JSON.stringify(categories)), [categories])
  useEffect(() => localStorage.setItem(KEYS.gallery, JSON.stringify(gallery)), [gallery])
  useEffect(() => localStorage.setItem(KEYS.reviews, JSON.stringify(reviews)), [reviews])
  useEffect(() => localStorage.setItem(KEYS.events, JSON.stringify(events)), [events])
  useEffect(() => localStorage.setItem(KEYS.reservations, JSON.stringify(reservations)), [reservations])
  useEffect(() => localStorage.setItem(KEYS.messages, JSON.stringify(messages)), [messages])
  useEffect(() => localStorage.setItem(KEYS.settings, JSON.stringify(settings)), [settings])

  // Record this visit (local counter always; server RPC when Supabase is on).
  useEffect(() => {
    trackVisit()
    getVisits().then(setVisits)
  }, [])

  const setters = useRef({
    foods: setFoods,
    categories: setCategories,
    gallery: setGallery,
    reviews: setReviews,
    events: setEvents,
    reservations: setReservations,
    messages: setMessages
  })

  // Pull every table from Supabase and trust the DB (local storage is just a
  // demo/offline cache). Runs on mount and again when a staff member signs in.
  const syncAll = async () => {
    if (!supabase) return
    for (const key of Object.keys(TABLES)) {
      const { data, error } = await supabase.from(TABLES[key]).select('*')
      if (!error && data?.length) setters.current[key](data)
    }
    const { data: s } = await supabase.from('ncl_settings').select('*').maybeSingle()
    if (s) setSettings((prev) => ({ ...prev, ...s }))
    const visitsValue = await getVisits()
    setVisits(Number(visitsValue) || 0)
  }

  // Initial sync (anon data) + re-sync on auth changes so RLS-protected
  // tables (reservations, messages) populate once a staff member logs in.
  useEffect(() => {
    if (!supabase) return
    syncAll().catch(() => {})
    const { data: sub } = supabase.auth.onAuthStateChange((_event) => {
      syncAll().catch(() => {})
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function add(key, item) {
    if (supabase) {
      const { data, error } = await supabase
        .from(TABLES[key])
        .insert(stripSystem(item))
        .select()
        .single()
      if (error) return { ok: false, error }
      setters.current[key]((p) => [data, ...p.filter((x) => x.id !== data.id)])
      return { ok: true, data }
    }
    const row = { ...stripSystem(item), id: item?.id || uid() }
    setters.current[key]((p) => [row, ...p])
    return { ok: true, data: row }
  }

  async function update(key, itemId, patch) {
    if (supabase) {
      const { data, error } = await supabase
        .from(TABLES[key])
        .update(stripSystem(patch))
        .eq('id', itemId)
        .select()
        .single()
      if (error) return { ok: false, error }
      setters.current[key]((p) => p.map((x) => (x.id === itemId ? { ...x, ...data } : x)))
      return { ok: true, data }
    }
    setters.current[key]((p) => p.map((x) => (x.id === itemId ? { ...x, ...patch } : x)))
    return { ok: true }
  }

  async function remove(key, itemId) {
    if (supabase) {
      const { error } = await supabase.from(TABLES[key]).delete().eq('id', itemId)
      if (error) return { ok: false, error }
    }
    setters.current[key]((p) => p.filter((x) => x.id !== itemId))
    return { ok: true }
  }

  async function addCategory(name) {
    if (supabase) {
      const { data, error } = await supabase.from('ncl_categories').insert({ name }).select().single()
      if (error) return { ok: false, error }
      setCategories((p) => [...p, data])
      return { ok: true, category: data }
    }
    const cat = { id: uid(), name }
    setCategories((p) => [...p, cat])
    return { ok: true, category: cat }
  }

  function updateSettings(patch) {
    setSettings((p) => ({ ...p, ...patch }))
    if (!supabase) return Promise.resolve({ ok: true })
    return supabase
      .from('ncl_settings')
      .upsert({ id: 1, ...stripSystem(patch) })
      .then(({ error }) => (error ? { ok: false, error } : { ok: true }))
  }

  function resetData() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
    setFoods(defaultFoods)
    setCategories(defaultCategories)
    setGallery(defaultGallery)
    setReviews(defaultReviews)
    setEvents(defaultEvents)
    setReservations([])
    setMessages([])
    setSettings(defaultSettings)
  }

  return (
    <DataContext.Provider
      value={{
        foods,
        categories,
        gallery,
        reviews,
        events,
        reservations,
        messages,
        settings,
        visits,
        add,
        update,
        remove,
        addCategory,
        updateSettings,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within a DataProvider')
  return ctx
}