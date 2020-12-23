import axios from 'axios'
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from './actionsTypes'

export function fetchProducts(dispatch, userId) {
  return async (dispatch) => {
    dispatch(fetchProductsStart())
    try {
      const myProducts = await axios.get(
        `https://cleveroad-product-default-rtdb.firebaseio.com/${userId}.json`
      )
      const products = []
      Object.keys(myProducts.data).forEach((id) => {
        products.push({
          id,
          title: myProducts.data[id].title,
          picture: myProducts.data[id].picture,
          description: myProducts.data[id].description,
          discount: myProducts.data[id].discount || null,
          price: myProducts.data[id].price,
          date: myProducts.data[id].date || null,
        })
      })
      dispatch(fetchProductsSucces(products))
    } catch (e) {
      dispatch(fetchProductsError(e))
    }
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
