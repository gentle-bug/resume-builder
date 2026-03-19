import api from './api'

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (fullName: string, email: string, password: string) =>
    api.post('/auth/register', { fullName, email, password }),
}
