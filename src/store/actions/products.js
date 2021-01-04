import { database } from '../../firebase'
import { FETCH_START, FETCH_PRODUCTS_SUCCESS, FETCH_END } from './actionsTypes'

export function fetchProducts(dispatch, userId) {
  return async (dispatch) => {
    dispatch(fetchStart())
    const productRef = database.ref()
    productRef.on('value', (snapshot) => {
      const products = []
      const general = {}
      const response = snapshot.val() || []
      Object.keys(response).forEach((user_id) => {
        Object.keys(response[user_id]).forEach((product_id) => {
          response[user_id][product_id].userId = user_id
        })
        Object.assign(general, response[user_id])
      })

      Object.keys(general).forEach((item) => {
        products.push({
          id: item,
          userId: general[item].userId,
          title: general[item].title,
          picture: general[item].picture,
          pictureName: general[item].pictureName,
          description: general[item].description,
          discount: general[item].discount || null,
          price: general[item].price,
          date: general[item].date || null,
        })
      })
      dispatch(fetchProductsSucces(products))
    })
  }
}

export function fetchStart() {
  return {
    type: FETCH_START,
  }
}
export function fetchEnd() {
  return {
    type: FETCH_END,
  }
}

export function fetchProductsSucces(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products,
  }
}
