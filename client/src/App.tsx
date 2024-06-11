import { Flowbite } from 'flowbite-react'
import AppRouter from './routes/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './common/context/AuthContext'
import Cookies from 'js-cookie'

const queryClient = new QueryClient()

const App = () => {
  const token = Cookies.get('token')

  return (
    <Flowbite theme={{ mode: 'auto' }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider isAuthenticated={token != null}>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </Flowbite>
  )
}

export default App
