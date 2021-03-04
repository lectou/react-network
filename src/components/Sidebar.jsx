import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { DialogsList } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../redux/actions/profile';
import SidebarImage from '../assets/images/sidebar-image.jpg';
import UserIcon from '../assets/svg/user.svg';
import OutlookIcon from '../assets/images/outlook-icon.svg';
import LinkedinIcon from '../assets/images/linkedin-icon.svg';
import GithubIcon from '../assets/images/github-icon.svg';

export default function Sidebar({ setActiveSidebar }) {

  const dispatch = useDispatch();

  const handleOutsideClick = (event) => {

    const header = document.getElementsByClassName('header')[0];
    const dialogList = document.getElementsByClassName('dialog-list')[0];
    if (event.path.includes(header) || event.path.includes(dialogList)) {
      return;
    } else {
      setActiveSidebar(false);
    }
  };

  const { name, status, photo, info } = useSelector(({ profile }) => profile);
  const isAuth = useSelector(({ auth }) => auth.isAuth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <img src={SidebarImage} alt="sidebar-img" />
        {!isAuth
          ? <Link className="sidebar__login" to="/login">Not authorized</Link>
          : null}
      </div>

      <div className="sidebar__content">
        <div className="profile">

          {isAuth
            ? <>
              {photo
                ? <img className="profile__avatar" src={photo} alt="user" />
                : <img className="profile__avatar" src={UserIcon} alt="user" />
              }
              <div className="profile__description">
                <div className="profile__name">{name}</div>
                <div className="profile__status">{status}</div>
              </div>
            </>
            : null
          }


          {isAuth
            ? <>
              <ul className="social">
                <li className="social-item">
                  <a href="mailto:lectou@outlook.com"
                  ><img src={OutlookIcon} alt="outlook-icon" />
                  </a>
                </li>
                <li className="social-item">
                  <a href="#"><img src={LinkedinIcon} alt="linkedin-icon" /></a>
                </li>
                <li className="social-item">
                  <a href="#"><img src={GithubIcon} alt="github-icon" /></a>
                </li>
              </ul>
              <div className="profile__text">{info}</div>
            </>
            : null}
        </div>

        <nav className="nav nav-mobile">
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
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {isAuth
        ? <DialogsList
          setActiveSidebar={setActiveSidebar}
        />
        : null}

    </aside>
  )
}
