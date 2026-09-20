import emailjs from '@emailjs/browser'

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const emailjsConfigured = Boolean(SERVICE && TEMPLATE && PUBLIC)

/**
 * Sends an email through EmailJS.
 * Template params: to_name, subject, message_html.
 * Returns { ok: true } on success, { ok: false, demo: true } when EmailJS is
 * not configured (the request is still saved in the admin panel).
 */
export async function sendEmail({ to_name = 'Nako Cafe', subject, message_html }) {
  if (!emailjsConfigured) {
    console.info('EmailJS not configured — email skipped (request saved in the admin panel instead).')
    return { ok: false, demo: true }
  }
  try {
    await emailjs.send(SERVICE, TEMPLATE, { to_name, subject, message_html }, { publicKey: PUBLIC })
    return { ok: true }
  } catch (err) {
    console.error('EmailJS send failed:', err)
    return { ok: false, error: 'Email service unavailable. Your request is saved in our system.' }
  }
}