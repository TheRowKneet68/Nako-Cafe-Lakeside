import emailjs from '@emailjs/browser'

export async function sendEmail({ templateId, templateParams }) {
  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const tmpl = templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const pub = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!service || !tmpl || !pub) {
    console.info('EmailJS not configured — simulating a successful send.')
    return { ok: true, simulated: true }
  }

  try {
    await emailjs.send(service, tmpl, templateParams, { publicKey: pub })
    return { ok: true }
  } catch (err) {
    console.error('EmailJS send failed:', err)
    return { ok: false, error: err?.message || 'Email could not be sent.' }
  }
}
