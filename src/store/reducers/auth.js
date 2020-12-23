import { AUTH_LOGIN, AUTH_LOGOUT } from '../actions/actionsTypes'

const initialState = {
  token: null,
  userId: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}

export default authReducer
