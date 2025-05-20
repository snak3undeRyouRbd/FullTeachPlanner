import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import AddEventModal from '../components/AddEventModal';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(false);
  const [blockInactive, setBlockInactive] = useState(false);
  const [inactiveTimeout, setInactiveTimeout] = useState(15);

  const [showEventModal, setShowEventModal] = useState(false);
  const handleAddEvent = () => setShowEventModal(true);

  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  const handleNotificationsChange = (e) => {
    setNotifications(e.target.checked);
  };

  const handleBlockInactiveChange = (e) => {
    setBlockInactive(e.target.checked);
  };

  const handleInactiveTimeoutChange = (e) => {
    setInactiveTimeout(Number(e.target.value));
  };


  return (
    <div>
      <Navbar 
        onAddEvent={handleAddEvent}
      />
      <div className="container mt-4 mb-5">
        <h1>Налаштування</h1>

        {/* Общие настройки */}
        <h2 className="mt-5">Загальні налаштування</h2>
        <form className="mt-4">
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="themeCheck"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
            <label className="form-check-label" htmlFor="themeCheck">
              Темна тема
            </label>
            <p className="form-text text-muted">
              Увімкніть, щоб використовувати темну тему для інтерфейсу.
            </p>
          </div> */}
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="notificationsCheck"
              checked={notifications}
              onChange={handleNotificationsChange}
            />
            <label className="form-check-label" htmlFor="notificationsCheck">
              Надсилати сповіщення
            </label>
            <p className="form-text text-muted">
              Увімкніть, щоб отримувати сповіщення про події та завдання.
            </p>
          </div> */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="blockInactiveCheck"
              checked={blockInactive}
              onChange={handleBlockInactiveChange}
            />
            <label className="form-check-label" htmlFor="blockInactiveCheck">
              Блокувати доступ без активності
            </label>
            <p className="form-text text-muted">
              Увімкніть, щоб блокувати доступ до сторінки при відсутності активності.
            </p>
            {blockInactive && (
              <div className="mt-2">
                <label htmlFor="inactiveTimeout" className="form-label">
                  Час бездіяльності (хвилини):
                </label>
                <input
                  type="number"
                  className="form-control w-25"
                  id="inactiveTimeout"
                  min="1"
                  value={inactiveTimeout}
                  onChange={handleInactiveTimeoutChange}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      <SiteFooter />
      <AddEventModal
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
      />
    </div>
  );
};

export default Settings;