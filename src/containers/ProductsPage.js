import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard/ProductCard'
// import ProductCard from '../components/ProductCard/ProductCard'
import { useHttp } from '../hooks/http.hook'
import './ProductsPage.sass'

const ProductsPage = () => {
  const [products, setProducts] = useState(null)
  const userId = useSelector((state) => state.auth.userId)
  const { request } = useHttp()

  useEffect(() => {
    console.log(products)
  }, [products])

  const printProduct = async () => {
    const getProduct = await request(
      `https://cleveroad-product-default-rtdb.firebaseio.com/${userId}.json`,
      'GET'
    )
    setProducts(getProduct)

    const html = Object.keys(products).map((item, index) => {
      const props = products[item]
      return (
        <ProductCard
          key={item + index}
          title={props.title}
          picture={props.picture}
          description={props.description}
          discount={props.discount || null}
          price={props.price}
        />
      )
    })

    return html
  }

  return (
    <>
      <h1 className="display-6">Product Page</h1>
      <article id="product-list">{printProduct()}</article>
    </>
  )
}

export default ProductsPage
