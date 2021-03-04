import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import loginIcon from '../assets/svg/login.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';

const Header = ({ activeSidebar, setActiveSidebar }) => {

  const dispatch = useDispatch();
  const isAuth = useSelector(({ auth }) => auth.isAuth);

  const logOut = () => dispatch(logout());

  const burgerMenuToggle = () => {
    setActiveSidebar(!activeSidebar);
  }

  return (
    <div className="header">
      <div className="header__nav">

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/home">Home</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/users">Users</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/news">News</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to={`/profile`}>Profile</NavLink>
            </li>
          </ul>
        </nav>

        <div className={`burger ${!activeSidebar ? "active" : "no-active"}`} onClick={() => burgerMenuToggle()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <li className="nav__item">

        </li>
      </div>

      {isAuth
        ? <button
          className="header__login-button"
          onClick={() => logOut()}
        >
          <span>logOut</span>
          <img src={loginIcon} alt="login" />
        </button>
        :
        <Link className="header__login-button" to='/login' >
          <span>login</span>
          <img src={loginIcon} alt="login" />
        </Link>
      }


    </div >
  )
}

export default Header;