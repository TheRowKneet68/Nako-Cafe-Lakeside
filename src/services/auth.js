const KEY = 'ncl_admin_auth'

export const isAdmin = () => localStorage.getItem(KEY) === '1'

export const adminLogin = (email, password) => {
  const expectedEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@nakocafe.com.np'
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  if (email.trim().toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword) {
    localStorage.setItem(KEY, '1')
    return true
  }
  return false
}

export const adminLogout = () => localStorage.removeItem(KEY)