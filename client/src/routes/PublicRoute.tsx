import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '~/common/hooks/useAuth'

const PublicRoute = () => {
  const isAuthenticated= useAuth(s => s.isAuthenticated)

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute
