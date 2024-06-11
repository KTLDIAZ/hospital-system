import { Route, Routes } from 'react-router-dom'
import MedicinesPage from '~/modules/medicine/Index'
import CreateMedicine from '~/modules/medicine/CreateMedicine'
import UpdateMedicine from '~/modules/medicine/UpdateMedicine'
import CreateTransaction from '~/modules/medicine/CreateTransaction'
import SingleMedicine from '~/modules/medicine/SingleMedicine'
import PrivateRoute from './PrivateRoute'

const MedicineRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<MedicinesPage />} />
      </Route>
      <Route path="/create" element={<PrivateRoute />}>
        <Route index element={<CreateMedicine />} />
      </Route>
      <Route path="/update" element={<PrivateRoute />}>
        <Route index element={<UpdateMedicine />} />
      </Route>
      <Route path="/create-transaction" element={<PrivateRoute />}>
        <Route index element={<CreateTransaction />} />
      </Route>
      <Route path="/:id" element={<PrivateRoute />}>
        <Route index element={<SingleMedicine />} />
      </Route>
    </Routes>
  )
}

export default MedicineRoutes
