import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

// Hook for consuming auth context
export const useAuth = () => {
  return useContext(AuthContext)
}
