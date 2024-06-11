import { Route, Routes } from "react-router-dom"
import UsersPage from '~/modules/user/Index'
import CreateUserPage from '~/modules/user/CreateUserPage'
import UpdateUserPage from '~/modules/user/UpdateUserPage'
import SingleUserPage from '~/modules/user/SingleUserPage'
import PrivateRoute from "./PrivateRoute"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/user/*" element={<PrivateRoute />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<UsersPage />} />
        </Route>
        <Route path="create" element={<PrivateRoute />}>
          <Route index element={<CreateUserPage />} />
        </Route>
        <Route path="update/:id" element={<PrivateRoute />}>
          <Route index element={<UpdateUserPage />} />
        </Route>
        <Route path=":id" element={<PrivateRoute />}>
          <Route index element={<SingleUserPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AdminRoutes