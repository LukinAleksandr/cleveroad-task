import React from 'react'
import './Navbar.sass'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions/auth'

const Navbar = (ev) => {
  const email = useSelector((state) => state.auth.email)
  const dispatch = useDispatch()
  const exit = () => {
    dispatch(logout())
  }
  return (
    <nav className="top-menu navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <div id="navbar">
          <ul id="navbar__list">
            <li className="navbar__item">
              <NavLink className="nav-link" to="/products">
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
            <span className="nav-email">{email}</span>
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
