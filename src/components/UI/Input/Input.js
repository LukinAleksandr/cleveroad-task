import React from 'react'
import classes from './Input.module.sass'

function isInvalid({ valid, touched }) {
  return !valid && touched
}

const Input = (props) => {
  const cls = [classes.Input]
  const htmlFor = `${props.type || 'text'}-${Math.random()}`
  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  return (
    <>
      <div className="input-group mb-1">
        <span className="input-group-text">{props.label}</span>
        <input
          className="form-control"
          type={props.type || 'text'}
          name={props.name || ''}
          placeholder={props.placeholder || ''}
          disabled={props.disabled || false}
          checked={props.checked || null}
          id={htmlFor}
          onChange={props.onChange}
          value={props.value}
          min={props.min || null}
          max={props.max || null}
        />
      </div>
      {isInvalid(props) ? <span>{props.errorMessage || 'Ошибка!'}</span> : null}
    </>
  )
}

export default Input
