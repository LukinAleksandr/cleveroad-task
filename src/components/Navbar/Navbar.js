import React from 'react'
import './Navbar.sass'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/auth'

const Navbar = (ev) => {
  const dispatch = useDispatch()
  const exit = () => {
    dispatch(logout())
  }
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create
              </NavLink>
            </li>
          </ul>

          <div className="nav-button">
            <button className="btn btn-outline-success" onClick={() => exit()}>
              Exit
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
