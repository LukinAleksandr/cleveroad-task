import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useSelector } from 'react-redux'

function App() {
  const token = useSelector((state) => state.auth.token)
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  return (
    <div>
      <Router>
        <div>{routes}</div>
      </Router>
    </div>
  )
}

export default App
