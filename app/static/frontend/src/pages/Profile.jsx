import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/uk';
import SiteFooter from '../components/SiteFooter';
import Navbar from '../components/Navbar';
import AddEventModal from '../components/AddEventModal';

moment.locale('uk');

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEventModal, setShowEventModal] = useState(false);
  const handleAddEvent = () => setShowEventModal(true);

  const isSubMenuActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const isOverviewActive = () => {
    return location.pathname === '/profile' ? 'active' : '';
  };

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading user data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;
  if (!user) return <div>Дані користувача не знайдено</div>;

  return (
    <div>
      <Navbar 
        onAddEvent={handleAddEvent}
      />
      <h1>Профіль користувача</h1>

      <nav>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <Link
              className={`nav-link ${isOverviewActive()}`}
              to="/profile"
              style={{ padding: '0.5rem 1rem' }}
            >
              Огляд
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isSubMenuActive('/profile/edit')}`}
              to="/profile/edit"
              style={{ padding: '0.5rem 1rem' }}
            >
              Редагувати
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isSubMenuActive('/profile/settings')}`}
              to="/profile/settings"
              style={{ padding: '0.5rem 1rem' }}
            >
              Налаштування
            </Link>
          </li>
        </ul>
      </nav>

      <div className="profile-content">
        {/* Outlet для вложенных маршрутов (например, /profile/edit) */}
        <Outlet />
      </div>
      <SiteFooter />
      <AddEventModal
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
      />
    </div>
  );
};

export default Profile;