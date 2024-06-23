import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '~/common/hooks/useAuth'
import useAuthorization from '~/common/hooks/useAuthorization'

const PrivateRoute = ({ allowedRoles, redirectTo = '/' }: Props) => {
  const isAuthenticated = useAuth(x => x.isAuthenticated)
  const { isInRole } = useAuthorization()
  const location = useLocation()
  const isAllowed = allowedRoles === undefined || isInRole(allowedRoles)

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }

  return isAuthenticated ? (
    <div className="p-6">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} />
  )
}

interface Props {
  allowedRoles?: string[]
  redirectTo?: string
}

export default PrivateRoute
