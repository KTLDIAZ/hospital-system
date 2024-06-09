import { Route, Routes } from "react-router-dom"
import UsersPage from '~/modules/user/Index'
import CreateUser from '~/modules/user/CreateUser'
import UpdateUser from '~/modules/user/UpdateUser'
import SingleUser from '~/modules/user/SingleUser'
import PrivateRoute from "./PrivateRoute"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/user/*" element={<PrivateRoute />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<UsersPage />} />
        </Route>
        <Route path="create" element={<PrivateRoute />}>
          <Route index element={<CreateUser />} />
        </Route>
        <Route path="update" element={<PrivateRoute />}>
          <Route index element={<UpdateUser />} />
        </Route>
        <Route path=":id" element={<PrivateRoute />}>
          <Route index element={<SingleUser />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AdminRoutes