import React from 'react'
import { NavLink } from 'react-router-dom'
import './ProductCard.sass'

const ProductCard = (props) => {
  return (
    <div className="card" style={{ width: '12rem' }}>
      <div class="card__preview">
        <img
          title={props.title}
          alt={props.title}
          src={props.picture || 'https://via.placeholder.com/140'}
        />
      </div>
      <div className="card__body">
        <p className="card__title">{props.title}</p>
        <p className="card__description">{props.description}</p>
        <div className="card__discount">
          <span class="badge bg-secondary">
            {props.discount ? `-${props.discount}%` : null}
          </span>
        </div>
        <div className="card__prices">
          <p className="card__prices_price">
            {props.discount ? `<s>${props.price}</s>` : props.price}
          </p>
          <p className="card__prices_discount">
            {props.discount
              ? props.price - (props.price / 100) * props.discount
              : null}
          </p>
          <p className="card__prices_cyrrency">$</p>
          <NavLink className="card__edit" to={`/edit/${props.id}`}>
            Edit
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
