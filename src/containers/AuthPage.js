import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './AuthPage.sass'
import { authSuccess, logout } from '../store/actions/auth'
import Input from '../components/UI/Input/Input'
import { useHttp } from '../hooks/http.hook'
import { useInput } from '../hooks/input.hook'

const AuthPage = () => {
  const dispatch = useDispatch()
  const { loading, request, error } = useHttp()
  const { changeTextInput } = useInput()
  const [validForm, setValidForm] = useState(false)
  const [loginInput, setLoginInput] = useState({
    value: '',
    isValid: false,
    validation: {
      required: true,
      email: true,
    },
  })
  const [passwordInput, setPasswordInput] = useState({
    value: '',
    isValid: false,
    validation: {
      required: true,
      minLength: 6,
    },
  })

  useEffect(() => {
    const validForm = loginInput.isValid && passwordInput.isValid
    setValidForm(validForm)
  }, [loginInput, passwordInput])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        dispatch(
          authSuccess({
            token,
            userId,
            expirationDate,
          })
        )
        setTimeout(() => {
          dispatch(logout())
        }, expirationDate.getTime() - new Date().getTime())
      }
    }
  }, [dispatch])

  const pressHandler = (event) => {
    if (!loading && validForm && event.key === 'Enter') {
      authHandler('log')
    }
  }
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
      email: loginInput.value,
      password: passwordInput.value,
      returnSecureToken: true,
    })
    if (fetch) {
      const expirationDate = new Date(
        new Date().getTime() + fetch.expiresIn * 1000
      )
      dispatch(
        authSuccess({
          token: fetch.idToken,
          userId: fetch.localId,
          expirationDate,
        })
      )

      setTimeout(() => {
        dispatch(logout())
      }, fetch.expiresIn * 1000)
    }
  }

  return (
    <div id="auth-page">
      <h2>Авторизация</h2>
      <div id="auth-form" onKeyPress={pressHandler}>
        <Input
          value={loginInput.value}
          name="login"
          label="Email"
          touched={!!loginInput.value}
          type="email"
          errorMessage="Введите корректный email!"
          valid={loginInput.isValid}
          onChange={(ev) => changeTextInput(ev, setLoginInput)}
        ></Input>
        <Input
          value={passwordInput.value}
          name="password"
          label="Password"
          type="password"
          touched={!!passwordInput.value}
          errorMessage="Введите корректный пароль!"
          valid={passwordInput.isValid}
          onChange={(ev) => changeTextInput(ev, setPasswordInput)}
        ></Input>
        <div id="buttons-block">
          <button
            className="btn btn-primary"
            disabled={loading || !validForm}
            onClick={() => authHandler('log')}
          >
            Авторизация
          </button>
          <button
            className="btn btn-success"
            disabled={loading || !validForm}
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
