import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../modules/auth/Login'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}

export default PublicRoutes
