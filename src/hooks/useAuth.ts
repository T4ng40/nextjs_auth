import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

export function useAuth() {
  const contextValue = useContext(AuthContext)

  if (!contextValue) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }

  return contextValue
}
