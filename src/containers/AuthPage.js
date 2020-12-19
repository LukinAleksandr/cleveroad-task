import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './AuthPage.sass'
import { validateInput } from '../validate/validateInput'
import { authSuccess, logout } from '../store/actions/auth'
import Input from '../components/UI/Input/Input'
import { useHttp } from '../hooks/http.hook'

const AuthPage = () => {
  console.log('AuthPage')
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
  const dispatch = useDispatch()
  const { loading, request, error } = useHttp()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        console.log(expirationDate.getTime() - new Date().getTime())
        dispatch(authSuccess(token))
        setTimeout(() => {
          dispatch(logout())
        }, expirationDate.getTime() - new Date().getTime())
      }
    }
  }, [])

  const authHandler = async (method) => {
    let url = ''
    if (!method) {
      return false
    }
    if (method === 'reg') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCADADOx-1HOi2p0bcUZw6AzpM-dlbRQEo'
    }

    if (method === 'log') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCADADOx-1HOi2p0bcUZw6AzpM-dlbRQEo'
    }

    let fetch = await request(url, 'POST', {
      email: form.formInputs.email.value,
      password: form.formInputs.password.value,
      returnSecureToken: true,
    })
    if (fetch) {
      const expirationDate = new Date(
        new Date().getTime() + fetch.expiresIn * 1000
      )
      localStorage.setItem('token', fetch.idToken)
      localStorage.setItem('userId', fetch.localId)
      localStorage.setItem('expirationDate', expirationDate)

      dispatch(authSuccess(fetch.idToken))

      setTimeout(() => {
        dispatch(logout())
      }, fetch.expiresIn * 1000)
    }
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
          <button
            className="btn btn-primary"
            disabled={loading || !form.isFormValid}
            onClick={() => authHandler('log')}
          >
            Авторизация
          </button>
          <button
            className="btn btn-success"
            disabled={loading || !form.isFormValid}
            onClick={() => authHandler('reg')}
          >
            Регистрация
          </button>
        </div>
      </div>
      <span className="error">{error}</span>
    </div>
  )
}

export default AuthPage
