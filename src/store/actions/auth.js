import { AUTH_LOGIN, AUTH_LOGOUT } from './actionsTypes'

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT,
  }
}

export function authSuccess(obj) {
  return {
    type: AUTH_LOGIN,
    payload: obj,
  }
}
