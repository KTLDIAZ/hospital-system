import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'

const AppRouter = ({ children }: React.PropsWithChildren) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes />} />
        <Route path="/" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
