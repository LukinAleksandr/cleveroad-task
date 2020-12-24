import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import Loader from '../components/Loader/Loader'
import { fetchProducts } from '../store/actions/products'
import './ProductsPage.sass'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.userId)
  const loading = useSelector((state) => state.products.loading)
  const products = useSelector((state) => state.products.products)

  useEffect(() => {
    dispatch(fetchProducts(dispatch, userId))
  }, [dispatch, userId])

  const renderProducts = () => {
    const html =
      products.length !== 0 ? (
        products.map((item) => {
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              picture={item.picture}
              description={item.description}
              discount={item.discount || null}
              price={item.price}
              date={item.date || null}
              button={{
                value: 'Edit',
                link: `/edit/${item.id}`,
              }}
            />
          )
        })
      ) : (
        <div className="flex">
          <p>Список товаров пуст.</p>
          <NavLink className="card__edit" to={`/create`}>
            Добавить товар
          </NavLink>
        </div>
      )

    return html
  }

  return (
    <>
      <h1 className="display-6">Список товаров</h1>
      <article id="product-list">
        {loading && Object.keys(products).length === 0 ? (
          <Loader></Loader>
        ) : (
          renderProducts()
        )}
      </article>
    </>
  )
}

export default ProductsPage
