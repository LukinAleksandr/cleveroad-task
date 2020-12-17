import React from 'react'
import classes from './Input.module.sass'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const cls = [classes.Input]
  const htmlFor = `${props.type || 'text'}-${Math.random()}`
  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        className="form-control"
        type={props.type || 'text'}
        placeholder={props.placeholder || ''}
        disabled={props.disabled || false}
        id={htmlFor}
        onChange={props.onChange}
        value={props.values}
      />
      {isInvalid(props) ? <span>{props.errorMessage || 'Ошибка!'}</span> : null}
    </div>
  )
}

export default Input
