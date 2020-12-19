import React from 'react'
import './Alert.sass'

const Alert = (props) => {
  return (
    <div className="alert alert-warning my-alert" role="alert">
      {props.message}
    </div>
  )
}

export default Alert
