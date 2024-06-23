import Cookies from 'js-cookie'
import { createContext, useRef } from 'react'
import { createStore } from 'zustand'
import { decodeJwt } from 'jose'

interface AuthProps {
  token?: string
}

export interface AuthState extends AuthProps {
  isAuthenticated: boolean
  roles: string[]
  login: (path: string) => void
  logout: () => void
}

export type AuthStore = ReturnType<typeof createAuthStore>

const createAuthStore = (initProps: AuthProps) => {
  let roles: string[] = []

  const isAuthenticated = initProps.token !== undefined
  if (isAuthenticated) {
    const claims = decodeJwt(initProps.token!)
    roles = claims.roles as string[]
  }

  return createStore<AuthState>(set => ({
    isAuthenticated,
    roles,
    login: (path = '/') => {
      set({ isAuthenticated: true })
      window.location.replace(path)
    },
    logout: () => {
      Cookies.remove('token')
      set({ isAuthenticated: false })
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
  return <AuthContext.Provider value={storeRef.current}>{children}</AuthContext.Provider>
}
