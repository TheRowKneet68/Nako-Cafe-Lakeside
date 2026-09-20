import { supabase, hasSupabase } from './supabaseClient.js'

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024
const MAX_DIM = 1600

// Validate, downscale and re-encode the image (browser-side), then persist it
// to the Supabase "ncl-content" bucket when connected. Falls back to a plain
// data-URL for the localStorage demo so the site works without any backend.
export async function uploadImage(file) {
  if (!file) return { ok: false, error: 'Please choose an image.' }
  if (!ALLOWED.includes(file.type)) return { ok: false, error: 'Images must be JPG, PNG or WebP.' }
  if (file.size > MAX_BYTES) return { ok: false, error: 'Images must be under 5 MB.' }

  const optimized = await optimizeImage(file)
  const blob = optimized?.blob || file

  if (hasSupabase) {
    try {
      const path = `nako/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`
      const { error } = await supabase.storage
        .from('ncl-content')
        .upload(path, blob, { contentType: 'image/webp', upsert: false })
      if (error) return { ok: false, error: 'Upload failed. Please try again.' }
      const url = supabase.storage.from('ncl-content').getPublicUrl(path).data.publicUrl
      return { ok: true, url }
    } catch {
      return { ok: false, error: 'Upload failed. Please try again.' }
    }
  }

  const dataUrl = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => resolve(null)
    reader.readAsDataURL(blob)
  })
  if (!dataUrl) return { ok: false, error: 'We could not read that image.' }
  return { ok: true, url: dataUrl }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

async function optimizeImage(file) {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const scale = Math.min(1, MAX_DIM / Math.max(img.naturalWidth, img.naturalHeight))
    const w = Math.max(1, Math.round(img.naturalWidth * scale))
    const h = Math.max(1, Math.round(img.naturalHeight * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, w, h)
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82))
    return blob ? { blob, w, h } : null
  } catch {
    return null
  } finally {
    URL.revokeObjectURL(url)
  }
}