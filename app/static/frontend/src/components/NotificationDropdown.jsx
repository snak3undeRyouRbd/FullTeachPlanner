import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const NotificationDropdown = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setEvents(data.events || []);
        
        // Преобразуем приглашения в уведомления
        const userInvites = data.invites
          .filter(invite => invite.invitee_id === currentUser?.id)
          .map(invite => {
            const inviter = data.users.find(u => u.id === invite.inviter_id);
            const event = data.events.find(e => e.id === invite.event_id);
            
            return {
              id: invite.id,
              inviterId: invite.inviter_id,
              eventId: invite.event_id,
              avatar: inviter?.profile_photo || '/img/team/profile-picture-1.jpg',
              name: inviter?.name || `Користувач #${invite.inviter_id}`,
              time: formatTime(invite.invite_date),
              timeColor: invite.notification_status === 'нове' ? 'text-danger' : '',
              message: `Запросив вас на подію "${event?.title || 'Невідома подія'}"`,
              status: invite.invite_status
            };
          });
        
        setNotifications(userInvites);
        setLoading(false);
      })
      .catch(err => console.error('Помилка при завантаженні даних:', err));
  }, [currentUser]);

  const formatTime = (dateString) => {
    if (!dateString) return 'щойно';
    
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'щойно';
    if (minutes < 60) return `${minutes} хв тому`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} год тому`;
    
    const days = Math.floor(hours / 24);
    return `${days} дн тому`;
  };

  const getStatusDot = (status) => {
    switch(status) {
      case 'очікує': return <span className="dot bg-warning me-1"></span>;
      case 'прийнято': return <span className="dot bg-success me-1"></span>;
      case 'відхилено': return <span className="dot bg-danger me-1"></span>;
      default: return <span className="dot bg-secondary me-1"></span>;
    }
  };

  return (
    <Dropdown align="end" className="notification-dropdown">
      <Dropdown.Toggle as="a" className="nav-link text-dark notification-bell unread dropdown-toggle">
        <svg className="icon icon-sm text-gray-900" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
        {notifications.some(n => n.notification_status === 'нове') && (
          <span className="icon-badge"></span>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-lg mt-2 py-0">
        <div className="list-group list-group-flush">
          <Dropdown.Item href="/invites" className="text-center text-primary fw-bold border-bottom border-light py-3">
            Запрошення
          </Dropdown.Item>
          
          {loading ? (
            <Dropdown.Item className="text-center py-3">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Завантаження...</span>
              </div>
            </Dropdown.Item>
          ) : notifications.length === 0 ? (
            <Dropdown.Item className="text-center py-3 text-muted">
              Немає нових сповіщень
            </Dropdown.Item>
          ) : (
            notifications.slice(0, 3).map(notification => (
              <Dropdown.Item 
                key={notification.id} 
                href={`/events/${notification.eventId}`}
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
                    <p className="font-small mt-1 mb-0">
                      {getStatusDot(notification.status)}
                      {notification.message}
                    </p>
                  </div>
                </div>
              </Dropdown.Item>
            ))
          )}
          
          <Dropdown.Item href="/invites" className="text-center fw-bold rounded-bottom py-3">
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