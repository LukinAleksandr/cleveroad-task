import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'

const ProductPage = () => {
  console.log('ProductPage')
  const dispatch = useDispatch()
  const exit = () => {
    dispatch(logout())
  }

  return (
    <>
      <h1>Product Page</h1>
      <button onClick={() => exit()}>Exit</button>
    </>
  )
}

export default ProductPage
