import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddButton from './AddButton';
import SearchBar from './SearchBar';
import UserProfile from './UserProfile';
import NotificationDropdown from './NotificationDropdown';

const Navbar = ({
  userRole = 'учень',
  onAddEvent,
  onAddTask,
  onAddInvite,
}) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const getPageSettings = () => {
    const settings = {
      '/events': {
        buttonText: 'Додати подію',
        searchPlaceholder: 'Шукати подію',
        onClick: onAddEvent,
      },
      '/tasks': {
        buttonText: 'Додати завдання',
        searchPlaceholder: 'Шукати завдання',
        onClick: onAddTask,
      },
      '/invites': {
        buttonText: 'Додати запрошення',
        searchPlaceholder: 'Шукати подію',
        onClick: onAddInvite,
      },
      '/people': {
        buttonText: userRole === 'вчитель' ? 'Додати профіль' : 'Додати подію',
        searchPlaceholder: 'Шукати профіль',
        onClick: userRole === 'вчитель' ? () => alert('Додавання профілю ще не реалізовано') : onAddEvent,
      },
    };

    return settings[location.pathname] || {
      buttonText: 'Додати подію',
      searchPlaceholder: 'Шукати',
      onClick: onAddEvent,
    };
  };

  const { buttonText, searchPlaceholder, onClick } = getPageSettings();

  return (
    <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pt-0 pe-2 pb-0">
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
          <div className="d-flex align-items-center">
            <AddButton text={buttonText} onClick={onClick} />
            <SearchBar placeholder={searchPlaceholder} />
          </div>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item dropdown">
              <NotificationDropdown />
            </li>
            <li className="nav-item dropdown ms-lg-3">
              {currentUser ? (
                <UserProfile user={currentUser} />
              ) : (
                <div className="media d-flex align-items-center">
                  <span>Завантаження...</span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;