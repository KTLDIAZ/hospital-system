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
      <Route path="/" element={<PrivateRoute allowedRoles={['admin', 'staff', 'doctor']} />}>
        <Route index element={<MedicinesPage />} />
        <Route path="create" element={<CreateMedicine />} />
        <Route path=":id/create-inventory" element={<CreateInventory />} />
        <Route path=":id/create-transaction" element={<CreateTransactionPage />} />
        <Route path=":id" element={<SingleMedicine />} />
      </Route>
    </Routes>
  )
}

export default MedicineRoutes
