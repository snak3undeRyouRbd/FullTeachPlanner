import React from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';

const NotificationDropdown = () => {
  const notifications = [
    {
      id: 1,
      avatar: '/img/team/profile-picture-1.jpg',
      name: 'Петро Еськів',
      time: 'a few moments ago',
      timeColor: 'text-danger',
      message: 'Added you to an event "Project stand-up" tomorrow at 12:30 AM.'
    },
    {
      id: 2,
      avatar: '/img/team/profile-picture-5.jpg',
      name: 'Алла Сокрута',
      time: '2 hrs ago',
      timeColor: '',
      message: 'New message: "We need to improve the UI/UX for the landing page."'
    }
  ];

  return (
    <Dropdown align="end" className="notification-dropdown">
      <Dropdown.Toggle as="a" className="nav-link text-dark notification-bell unread dropdown-toggle">
        <svg className="icon icon-sm text-gray-900" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-lg mt-2 py-0">
        <div className="list-group list-group-flush">
          <Dropdown.Item href="/events#invites" className="text-center text-primary fw-bold border-bottom border-light py-3">
            Запрошення на подію
          </Dropdown.Item>
          
          {notifications.map(notification => (
            <Dropdown.Item 
              key={notification.id} 
              href="/events#invites" 
              className="list-group-item list-group-item-action border-bottom"
            >
              <div className="row align-items-center">
                <div className="col-auto">
                  <img 
                    alt="Notification" 
                    src={notification.avatar} 
                    className="avatar-md rounded"
                  />
                </div>
                <div className="col ps-0 ms-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="h6 mb-0 text-small">{notification.name}</h4>
                    </div>
                    <div className="text-end">
                      <small className={notification.timeColor}>{notification.time}</small>
                    </div>
                  </div>
                  <p className="font-small mt-1 mb-0">{notification.message}</p>
                </div>
              </div>
            </Dropdown.Item>
          ))}
          
          <Dropdown.Item href="/events#invites" className="text-center fw-bold rounded-bottom py-3">
            <svg className="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
            </svg>
            Дивитись усі
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;