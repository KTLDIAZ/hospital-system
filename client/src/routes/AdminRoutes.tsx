import { Route, Routes } from 'react-router-dom'
import CreateUserPage from '~/modules/user/CreateUserPage'
import UpdateUserPage from '~/modules/user/UpdateUserPage'
import PrivateRoute from './PrivateRoute'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/user/*" element={<PrivateRoute />}>
        <Route path="create" element={<CreateUserPage />} />
        <Route path="update/:id" element={<UpdateUserPage />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
