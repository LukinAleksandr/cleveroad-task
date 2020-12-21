import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './AuthPage.sass'
import { validateInput } from '../validate/validateInput'
import { authSuccess, logout } from '../store/actions/auth'
import Input from '../components/UI/Input/Input'
import { useHttp } from '../hooks/http.hook'

const AuthPage = () => {
  let [form, setForm] = useState({
    isFormValid: false,
    formInputs: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        name: 'email',
        errorMessage: 'Введите корректный email!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
        event: (ev) => chengeHandler(ev),
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        name: 'password',
        errorMessage: 'Введите корректный пароль!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
        event: (ev) => chengeHandler(ev),
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
  }, [dispatch])

  const authHandler = async (method) => {
    console.log('authHandler')
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
    setForm((prevState) => {
      const formInputs = { ...prevState.formInputs }
      const targetInput = { ...formInputs[ev.target.name] }

      targetInput.value = ev.target.value
      targetInput.touched = true
      targetInput.valid = validateInput(
        targetInput.value,
        targetInput.validation
      )
      formInputs[ev.target.type] = targetInput
      let isFormValid = true

      Object.keys(formInputs).forEach((name) => {
        isFormValid = formInputs[name].valid && isFormValid
      })
      return {
        isFormValid,
        formInputs,
      }
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
              name={input.name}
              checked={input.checked}
              disabled={input.disabled || false}
              errorMessage={input.errorMessage}
              valid={input.valid}
              event={input.event || null}
              touched={input.touched}
              shouldValidate={!!input.validation}
              onChange={input.event}
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
