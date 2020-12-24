import { database } from '../../firebase'
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from './actionsTypes'

export function fetchProducts(dispatch, userId) {
  return async (dispatch) => {
    dispatch(fetchProductsStart())
    const productRef = database.ref(userId)
    productRef.on('value', (snapshot) => {
      const products = []
      const response = snapshot.val() || []
      Object.keys(response).forEach((item) => {
        products.push({
          id: item,
          title: response[item].title,
          picture: response[item].picture,
          description: response[item].description,
          discount: response[item].discount || null,
          price: response[item].price,
          date: response[item].date || null,
        })
      })
      dispatch(fetchProductsSucces(products))
    })
  }
}

export function fetchProductsStart() {
  return {
    type: FETCH_PRODUCTS_START,
  }
}
export function fetchProductsError(e) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error: e,
  }
}

export function fetchProductsSucces(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products,
  }
}
