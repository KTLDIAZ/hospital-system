import { useContext } from 'react'
import { AuthContext, AuthState } from '../context/AuthContext'
import { useStore } from 'zustand'

function useAuth<T>(selector: (state: AuthState) => T): T {
  const store = useContext(AuthContext)
  if (!store) throw new Error('Missing AuthContext.Provider in the tree')
  return useStore(store, selector)
}

export default useAuth
