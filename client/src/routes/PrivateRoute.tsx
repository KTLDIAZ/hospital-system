import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '~/common/hooks/useAuth'
import Layout from '~/components/Layout'

const PrivateRoute = ({ isAllowed = true, redirectTo = '/' }: Props) => {
  const isAuthenticated = useAuth(x => x.isAuthenticated)
  const location = useLocation()

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace /> 
    }
  
  return isAuthenticated ? 
    <Layout children={<Outlet />} /> : 
    <Navigate to="/auth/login" state={{ from: location }}   />
}

interface Props {
  isAllowed?: boolean
  redirectTo?: string
}

export default PrivateRoute
