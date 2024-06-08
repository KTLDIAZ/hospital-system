import { Route, Routes } from 'react-router-dom'
import MedicinePage from '~/modules/medicine/Index'
import AppNavbar from '~/components/AppNavbar';

const PrivateRoutes = () => {
  return (
    <>
    <AppNavbar />
      <Routes>
        <Route path="/" element={<MedicinePage />} />
      </Routes>
    </>
  )
}

export default PrivateRoutes
