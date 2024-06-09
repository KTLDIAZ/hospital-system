import Cookies from 'js-cookie'
import { createContext, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { createStore } from 'zustand'

interface AuthProps {
  isAuthenticated: boolean
}

export interface AuthState extends AuthProps {
  isAuthenticated: boolean
  init: () => void
  login: (path: string) => void
  logout: () => void
}

export type AuthStore = ReturnType<typeof createAuthStore>

const createAuthStore = (initProps: AuthProps) => {
  return createStore<AuthState>((set) => ({
    ...initProps,
    init: () => {
      const token = Cookies.get('token')
      console.log(token)
      set({ isAuthenticated: token != null })
    },
    login: (path = '/') => {
      set({ isAuthenticated: true})
      Navigate({ to: path, })
    },
    logout: () => {
      Cookies.remove('token')
      set({ isAuthenticated: false})
    }
  }))
}

export const AuthContext = createContext<AuthStore | null>(null)

type AuthProviderProps = React.PropsWithChildren<AuthProps>


export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const storeRef = useRef<AuthStore>()
  if (!storeRef.current) {
    storeRef.current = createAuthStore(props)
  }
  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  )
}
