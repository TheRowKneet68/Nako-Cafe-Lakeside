import { Navigate } from 'react-router-dom'
import { isAdmin } from '../../services/auth.js'

export default function RequireAdmin({ children }) {
  if (!isAdmin()) return <Navigate to="/admin/login" replace />
  return children
}
