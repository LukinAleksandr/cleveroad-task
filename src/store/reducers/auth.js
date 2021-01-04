import { AUTH_LOGIN, AUTH_LOGOUT } from '../actions/actionsTypes'

const initialState = {
  email: null,
  token: null,
  userId: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        email: null,
      }
    default:
      return state
  }
}

export default authReducer
