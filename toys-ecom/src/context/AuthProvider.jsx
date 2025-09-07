import { useState, useEffect } from 'react'
import { userAPI } from '../api/api' // <-- adjust path to your api.js

import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // login after successful register/login
  const login = async (userData) => {
    const data = await userAPI.getProfile()
    setUser(data.data.user)
  }

  // Clear cookies + reset state
  const logout = async () => {
    try {
      await userAPI.logout?.() // if you have logout API
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
    }
  }

  // Restore user on first load
  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true)
        const res = await userAPI.getProfile()
        setUser(res.data.user) // backend should return user object
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, [])

  // console.log(user)
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
