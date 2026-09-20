// Tiny pub/sub toast bus — no dependency. Admin pages call notify() after
// add/edit/delete and AdminLayout renders the toasts.
const listeners = new Set()

export function notify(message, tone = 'success') {
  listeners.forEach((fn) => fn({ message, tone, id: Date.now() + Math.random() }))
}

export function onNotify(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}