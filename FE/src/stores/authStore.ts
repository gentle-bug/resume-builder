import { create } from 'zustand'
import { authService } from '../services/authService'

interface User {
  email: string
  fullName: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>
  logout: () => void
  setToken: (token: string) => void
}

const storedToken = localStorage.getItem('cv_token')
const storedUser = localStorage.getItem('cv_user')

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedToken,
  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const response = await authService.login(email, password)
      const { token, email: userEmail, fullName } = response.data
      const user = { email: userEmail, fullName }
      localStorage.setItem('cv_token', token)
      localStorage.setItem('cv_user', JSON.stringify(user))
      set({ token, user, isAuthenticated: true, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  register: async (fullName: string, email: string, password: string) => {
    set({ loading: true })
    try {
      const response = await authService.register(fullName, email, password)
      const { token, email: userEmail, fullName: userName } = response.data
      const user = { email: userEmail, fullName: userName }
      localStorage.setItem('cv_token', token)
      localStorage.setItem('cv_user', JSON.stringify(user))
      set({ token, user, isAuthenticated: true, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('cv_token')
    localStorage.removeItem('cv_user')
    set({ token: null, user: null, isAuthenticated: false })
  },

  setToken: (token: string) => {
    localStorage.setItem('cv_token', token)
    set({ token, isAuthenticated: true })
  },
}))
