import { combineReducers } from 'redux'
import authReducer from './auth'
import productsReducer from './products'

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
})

export default rootReducer
