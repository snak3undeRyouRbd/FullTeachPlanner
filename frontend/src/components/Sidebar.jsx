import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse">
      <div className="sidebar-inner px-4 pt-3">
        <ul className="nav flex-column pt-3 pt-md-0">
          <li className="nav-item site-logo">
            <Link to="/" className="nav-link d-flex align-items-center">
              <img src="/img/logo.png" height="43" width="120" alt="Site Logo" />
            </Link>
          </li>
          <li className={`nav-item ${isActive('/')}`}>
            <Link to="/" className="nav-link">
              <span className="sidebar-icon">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
              </span>
              <span className="sidebar-text">Мій кабінет</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/events')}`}>
            <Link to="/events" className="nav-link">
              <span className="sidebar-icon">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </span>
              <span className="sidebar-text">Події</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/tasks')}`}>
            <Link to="/tasks" className="nav-link">
              <span className="sidebar-icon">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
                </svg>
              </span>
              <span className="sidebar-text">Завдання</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/profile')}`}>
            <Link to="/profile" className="nav-link">
              <span className="sidebar-icon">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                </svg>
              </span>
              <span className="sidebar-text">Профіль</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/people')}`}>
            <Link to="/people" className="nav-link">
              <span className="sidebar-icon">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                </svg>
              </span>
              <span className="sidebar-text">Люди</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/settings')}`}>
            <Link to="/settings" className="nav-link">
              <span className="sidebar-icon">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                </svg>
              </span>
              <span className="sidebar-text">Налаштування</span>
            </Link>
          </li>
          <li role="separator" class="dropdown-divider mt-4 mb-3 border-gray-700"></li>
          <li className={`nav-item ${isActive('/quick-start')}`}>
            <Link to="/quick-start" className="nav-link">
              <span className="sidebar-icon">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                </svg>
              </span>
              <span className="sidebar-text">Справка</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;