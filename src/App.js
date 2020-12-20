import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.sass'
import { useRoutes } from './routes'
import Navbar from './components/Navbar/Navbar'

function App() {
  const token = useSelector((state) => state.auth.token)
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  return (
    <div className="container-fluid leyout">
      <Router>
        {isAuth ? <Navbar></Navbar> : null}
        <main className="container main">{routes}</main>
      </Router>
    </div>
  )
}

export default App
