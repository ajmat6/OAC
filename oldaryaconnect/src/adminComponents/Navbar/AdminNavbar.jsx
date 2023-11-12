import React from 'react'
import {Link} from 'react-router-dom'
import {Nav, NavDropdown, Container } from 'react-bootstrap'
import {useNavigate}  from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userAuthReducer';

function AdminNavbar() {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);


  const Logout = () => {
    dispatch(logout()) // dispatching logout action in the store
    navigate('/')
  }

  // when the user is logged in:
  const loggedIn = () => {
    console.log('loggedin')
    return <button className="btn btn-primary mx-1 text-blue-600" onClick={Logout}>Logout</button>
  }

  // when the user is not logged in:
  const notLogeedIn = () => {
    return (
      <form className="d-flex" role="search">
        <Link className="btn btn-secondary mx-1" to="/signin" role="button">Login</Link>
        <Link className="btn btn-secondary mx-1" to="/signup" role="button">Sign Up</Link>
      </form>
    )
  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark navbar-default">
        <div className="container-fluid mx-3">
          <Link className="navbar-brand" to="/adminHome">
            Admin - Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="" id="">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <Link className={`nav-link ${location.pathname === "/"? "active" : ""}`} aria-current="page" to="/"> */}
                {/* <Link className='nav-link active' aria-current="page" to="/">
                  Home
                </Link> */}
              </li>
              <li className="nav-item">
                
              </li>
            </ul>

            <button className="btn btn-primary mx-1 text-blue-600" onClick={Logout}>Logout</button>
            {/* {auth.authenticate ? loggedIn() : notLogeedIn()} */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNavbar;
