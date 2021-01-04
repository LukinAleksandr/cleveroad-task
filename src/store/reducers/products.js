import {
  FETCH_START,
  FETCH_END,
  FETCH_PRODUCTS_SUCCESS,
} from '../actions/actionsTypes'
const initialState = {
  products: [],
  loading: false,
  error: null,
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products,
      }
    case FETCH_END:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default productsReducer
