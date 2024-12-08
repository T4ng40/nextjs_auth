'use client'

import { User } from '@/entities/User'
import React, { createContext } from 'react'

interface IAuthContextValue {
  user: User | null
  isSignedIn: boolean
}

export const AuthContext = createContext({} as IAuthContextValue)

interface IAuthProviderProps {
  children: React.ReactNode
  user: User | null
}

export function AuthProvider({ children, user }: IAuthProviderProps) {
  const isSignedIn = !!user
  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
