'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext({
  user: null,
  setUser: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // On mount, try to load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Whenever user changes, update localStorage
  const setUserAndPersist = (userData) => {
    setUser(userData)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser: setUserAndPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
