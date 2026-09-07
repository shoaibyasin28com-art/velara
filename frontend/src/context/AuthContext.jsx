import { createContext, useContext, useEffect, useState } from 'react'
import authService from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('velara_token')
    if (!token) {
      setLoading(false)
      return
    }
    authService
      .me()
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('velara_token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const { data } = await authService.login(email, password)
    localStorage.setItem('velara_token', data.access_token)
    setUser(data.user)
    return data.user
  }

  async function register(payload) {
    const { data } = await authService.register(payload)
    localStorage.setItem('velara_token', data.access_token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('velara_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
