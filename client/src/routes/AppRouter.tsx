import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import Login from '~/modules/auth/Login'
import MedicineRoutes from './MedicineRoutes'
import AdminRoutes from './AdminRoutes'
import useAuth from '~/common/hooks/useAuth'
import AppNavbar from '~/components/AppNavbar'
import PrivateRoute from './PrivateRoute'
import Home from '~/modules/Home'
import CreateMedicalHistoryPage from '~/modules/user/CreateMedicalHistory'
import SingleUserPage from '~/modules/user/SingleUserPage'
import UsersPage from '~/modules/user/Index'

const AppRouter = ({ children }: React.PropsWithChildren) => {
  const isAuthenticated = useAuth(s => s.isAuthenticated)
  return (
    <BrowserRouter>
      {isAuthenticated && <AppNavbar />}
      {children}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="auth/*" element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Route>
        <Route path="medicine/*" element={<MedicineRoutes />} />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="user/*" element={<PrivateRoute allowedRoles={['admin', 'staff', 'doctor']} />}>
          <Route index element={<UsersPage />} />
          <Route path=":id" element={<SingleUserPage />} />
          <Route
            path=":id/create-medical-history"
            element={<PrivateRoute allowedRoles={['admin', 'doctor']} />}
          >
            <Route index element={<CreateMedicalHistoryPage />} />
          </Route>
        </Route>

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
