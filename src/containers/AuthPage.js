import React, { useState } from 'react'
import classes from './AuthPage.sass'
import is from 'is_js'
import Input from '../components/UI/Input/Input'

const AuthPage = () => {
  let [form, setForm] = useState({
    isFormValid: false,
    formInputs: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  })
  const loginHandler = (ev) => {
    ev.preventDefault()
    console.log('qq')
  }

  const validateInput = (value, validation) => {
    if (!validation) {
      return true
    }
    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
      isValid = is.email(value) && isValid
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const chengeHandler = (ev) => {
    const formInputs = { ...form.formInputs }
    const targetInput = { ...formInputs[ev.target.type] }

    targetInput.value = ev.target.value
    targetInput.touched = true
    targetInput.valid = validateInput(targetInput.value, targetInput.validation)
    formInputs[ev.target.type] = targetInput
    let isFormValid = true

    Object.keys(formInputs).forEach((name) => {
      isFormValid = formInputs[name].valid && isFormValid
    })

    console.log({
      isFormValid,
      formInputs,
    })

    setForm({
      isFormValid,
      formInputs,
    })
  }

  return (
    <div id="auth-page" className="container-fluid">
      <h2>Авторизация</h2>
      <div id="auth-form">
        {Object.keys(form.formInputs).map((item, index) => {
          const input = form.formInputs[item]
          return (
            <Input
              key={input.type + index}
              values={input.value}
              type={input.type}
              label={input.label}
              errorMessage={input.errorMessage}
              valid={input.valid}
              touched={input.touched}
              shouldValidate={!!input.validation}
              onChange={(ev) => chengeHandler(ev)}
            />
          )
        })}

        <div id="buttons-block">
          {' '}
          <button
            className="btn btn-primary"
            disabled={!form.isFormValid}
            onClick={loginHandler}
          >
            Авторизация
          </button>
          <button
            className="btn btn-success"
            disabled={!form.isFormValid}
            onClick={loginHandler}
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
