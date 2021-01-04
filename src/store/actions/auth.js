import { AUTH_LOGIN, AUTH_LOGOUT } from './actionsTypes'

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('email')

  return {
    type: AUTH_LOGOUT,
  }
}

export function authSuccess(userData) {
  localStorage.setItem('token', userData.token)
  localStorage.setItem('userId', userData.userId)
  localStorage.setItem('email', userData.email)
  localStorage.setItem('expirationDate', userData.expirationDate)

  return {
    type: AUTH_LOGIN,
    payload: userData,
  }
}
