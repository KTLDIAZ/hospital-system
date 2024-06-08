import {  Flowbite } from 'flowbite-react'
import AppRouter from './routes/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <Flowbite theme={{ mode: 'auto' }}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider> 
    </Flowbite>
  )
}

export default App
