import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
          <div className="d-flex align-items-center">
            <button className="btn btn-gray-800 d-inline-flex align-items-center me-2 dropdown-toggle">
              <svg className="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Додати подію
            </button>
            <form className="navbar-search form-inline" id="navbar-search-main">
              <div className="input-group input-group-merge search-bar">
                <span className="input-group-text" id="topbar-addon">
                  <svg className="icon icon-xs" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </span>
                <input type="text" className="form-control" placeholder="Шукати" aria-label="Шукати" />
              </div>
            </form>
          </div>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item dropdown">
              <Link className="nav-link text-dark notification-bell unread dropdown-toggle" to="/notifications">
                <svg className="icon icon-sm text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </Link>
            </li>
            <li className="nav-item dropdown ms-lg-3">
              <Link className="nav-link dropdown-toggle pt-1 px-0" to="/profile">
                <div className="media d-flex align-items-center">
                  <img className="avatar rounded-circle" alt="Profile" src="/img/team/profile-picture-3.jpg" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-gray-900">Марія Мовчан</span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;