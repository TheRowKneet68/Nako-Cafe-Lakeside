import { createContext, useContext, useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!supabase) return
    ;(async () => {
      try {
        const setters = {
          foods: setFoods,
          categories: setCategories,
          gallery: setGallery,
          reviews: setReviews,
          events: setEvents,
          reservations: setReservations,
          messages: setMessages
        }
        for (const key of Object.keys(TABLES)) {
          const { data, error } = await supabase.from(TABLES[key]).select('*')
          if (!error && data?.length) setters[key](data)
        }
        const { data: s } = await supabase.from('ncl_settings').select('*').maybeSingle()
        if (s) setSettings((prev) => ({ ...prev, ...s }))
      } catch (err) {
        console.warn('Supabase sync skipped — running with local data.', err)
      }
    })()
  }, [])

  const setters = {
    foods: setFoods,
    categories: setCategories,
    gallery: setGallery,
    reviews: setReviews,
    events: setEvents,
    reservations: setReservations,
    messages: setMessages
  }

  async function add(key, item) {
    const row = { ...item, id: item.id || uid() }
    setters[key]((p) => [row, ...p])
    if (supabase) await supabase.from(TABLES[key]).insert(row)
  }

  async function update(key, itemId, patch) {
    setters[key]((p) => p.map((x) => (x.id === itemId ? { ...x, ...patch } : x)))
    if (supabase) await supabase.from(TABLES[key]).update(patch).eq('id', itemId)
  }

  async function remove(key, itemId) {
    setters[key]((p) => p.filter((x) => x.id !== itemId))
    if (supabase) await supabase.from(TABLES[key]).delete().eq('id', itemId)
  }

  function addCategory(name) {
    const cat = { id: uid(), name }
    setCategories((p) => [...p, cat])
    if (supabase) supabase.from('ncl_categories').insert(cat)
  }

  function updateSettings(patch) {
    setSettings((p) => ({ ...p, ...patch }))
    if (supabase) supabase.from('ncl_settings').upsert({ id: 1, ...patch })
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
