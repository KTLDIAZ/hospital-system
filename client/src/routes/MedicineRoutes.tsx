import { Route, Routes } from 'react-router-dom'
import MedicinesPage from '~/modules/medicine/Index'
import CreateMedicine from '~/modules/medicine/CreateMedicinePage'
import CreateInventory from '~/modules/medicine/CreateInventoryPage'
import CreateTransactionPage from '~/modules/medicine/CreateTransactionPage'
import SingleMedicine from '~/modules/medicine/SingleMedicinePage'
import PrivateRoute from './PrivateRoute'

const MedicineRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<MedicinesPage />} />
      </Route>
      <Route path="create" element={<PrivateRoute />}>
        <Route index element={<CreateMedicine />} />
      </Route>
      <Route path=":id/create-inventory" element={<PrivateRoute />}>
        <Route index element={<CreateInventory />} />
      </Route>
      <Route path=":id/create-transaction" element={<PrivateRoute />}>
        <Route index element={<CreateTransactionPage />} />
      </Route>
      <Route path=":id" element={<PrivateRoute />}>
        <Route index element={<SingleMedicine />} />
      </Route>
    </Routes>
  )
}

export default MedicineRoutes
