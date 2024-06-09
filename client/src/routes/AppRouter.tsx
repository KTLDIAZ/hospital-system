import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import Login from '~/modules/auth/Login'
import MedicineRoutes from './MedicineRoutes'
import AdminRoutes from './AdminRoutes'

const AppRouter = ({ children }: React.PropsWithChildren) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="auth/*" element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path='*' element={<Navigate to='/auth/login' />} />
        </Route>
        <Route path='medicine/*' element={<MedicineRoutes />} />
        <Route path='admin/*' element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
