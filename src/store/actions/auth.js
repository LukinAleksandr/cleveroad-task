import { AUTH_LOGIN, AUTH_LOGOUT } from './actionsTypes'

export function logout() {
  console.log('AUTH_LOGOUT')
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT,
  }
}

export function authSuccess(obj) {
  console.log('AUTH_LOGIN')
  return {
    type: AUTH_LOGIN,
    payload: obj,
  }
}
