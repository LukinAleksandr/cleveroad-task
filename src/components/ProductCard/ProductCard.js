import React from 'react'
import { NavLink } from 'react-router-dom'
import './ProductCard.sass'

const discount = (props) => {
  return props.discount && props.date > new Date().getTime() ? (
    <>
      <span className="badge bg-secondary">-{props.discount}%</span>
      <span className="badge bg-secondary">
        Осталось:{' '}
        {Math.ceil((props.date - new Date().getTime()) / 1000 / 60 / 60 / 24)}{' '}
        д.
      </span>
    </>
  ) : null
}

const oldPrice = (props) => {
  return props.discount && props.date > new Date().getTime() ? (
    <s>${props.price}</s>
  ) : (
    props.price
  )
}

const newPrice = (props) => {
  return props.discount && props.date > new Date().getTime()
    ? (props.price - (props.price / 100) * props.discount).toFixed(2)
    : null
}

const ProductCard = (props) => {
  return (
    <div className="card" style={{ width: '12rem' }}>
      <div className="card__preview">
        <img
          title={props.title}
          alt={props.title}
          src={props.picture || 'https://via.placeholder.com/220'}
        />
      </div>
      <div className="card__body">
        <p className="card__title" title={props.title}>
          {props.title}
        </p>
        <p className="card__description" title={props.description}>
          {props.description}
        </p>
        <div className="card__discount">{discount(props)}</div>
        <div className="card__prices">
          <p className="card__prices_price">{oldPrice(props)}</p>
          <p className="card__prices_discount">{newPrice(props)}</p>
          <p className="card__prices_cyrrency">$</p>
        </div>
        {props.button ? (
          <NavLink className="card__edit" to={props.button.link}>
            {props.button.value}
          </NavLink>
        ) : null}
      </div>
    </div>
  )
}

export default ProductCard
