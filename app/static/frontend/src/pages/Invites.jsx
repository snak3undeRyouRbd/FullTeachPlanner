import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AddInviteModal from '../components/AddInviteModal';
import { useAuth } from '../context/AuthContext';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Invites = () => {
  const { eventId } = useParams();
  const { currentUser } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invites, setInvites] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const userInvites = data.invites
          .filter(invite => invite.invitee_id === currentUser.id)
          .filter(invite => !eventId || invite.event_id === parseInt(eventId))
          .map(invite => ({
            ...invite,
            statusText: getStatusText(invite.invite_status)
          }));
        
        setInvites(userInvites);
        setUsers(data.users);
        setEvents(data.events);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      });
  }, [currentUser, eventId]);

  const getStatusText = (status) => {
    switch(status) {
      case 'очікує': return 'Очікує підтвердження';
      case 'прийнято': return 'Прийнято';
      case 'відхилено': return 'Відхилено';
      default: return status;
    }
  };

  const handleAddInvite = () => setShowInviteModal(true);

  const handleAcceptInvite = (inviteId) => {
    setInvites(invites.map(invite => 
      invite.id === inviteId 
        ? { ...invite, invite_status: 'прийнято', statusText: 'Прийнято' } 
        : invite
    ));
  };

  const handleRejectInvite = (inviteId) => {
    setInvites(invites.map(invite => 
      invite.id === inviteId 
        ? { ...invite, invite_status: 'відхилено', statusText: 'Відхилено' } 
        : invite
    ));
  };

  const getUserNameById = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Неизвестный пользователь';
  };

  const getEventInfoById = (eventId) => {
    const event = events.find(e => e.id === eventId);
    return event ? {
      title: event.title,
      date: event.start_date,
      type: event.type
    } : {
      title: 'Неизвестное событие',
      date: 'дата не указана',
      type: 'тип не указан'
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'дата не указана';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };

  if (!currentUser) {
    return <div className="text-center py-5">Будь ласка, увійдіть в систему</div>;
  }

  if (loading) {
    return <div className="text-center py-5">Загрузка приглашений...</div>;
  }

  return (
    <div>
      <Navbar 
        userRole={currentUser?.role || 'учень'}
        onAddInvite={handleAddInvite}
      />
      <h1 className="text-center my-4">Мої запрошення</h1>
      
      <div className="container">
        {invites.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <Card.Title>У вас немає нових запрошень</Card.Title>
              {eventId && (
                <Button variant="primary" href="/invites" className="mt-3">
                  Переглянути всі запрошення
                </Button>
              )}
            </Card.Body>
          </Card>
        ) : (
          <ListGroup>
            {invites.map((invite) => {
              const eventInfo = getEventInfoById(invite.event_id);
              const inviterName = getUserNameById(invite.inviter_id);
              
              return (
                <ListGroup.Item key={invite.id} className="mb-3">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <img 
                        alt="Profile" 
                        src="/img/avatar.webp" 
                        className="avatar-md rounded" 
                      />
                    </div>
                    <div className="col">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-1">{inviterName}</h5>
                        <small className="text-muted">
                          {formatDate(invite.invite_date)}
                        </small>
                      </div>
                      
                      <div className="mb-2">
                        <span className="fw-bold">Подія:</span>{' '}
                        <a href={`/events/${invite.event_id}`}>{eventInfo.title}</a>
                      </div>
                      
                      <div className="mb-2">
                        <span className="fw-bold">Дата події:</span> {eventInfo.date}
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="-flex">
                          <span className="fw-bold ">Статус:</span>{' '}
                          <span className={`badge ${
                            invite.invite_status === 'прийнято' ? 'bg-success' :
                            invite.invite_status === 'відхилено' ? 'bg-secondary' :
                            'bg-warning text-dark'
                          }`}>
                            {invite.statusText}
                          </span>
                        </div>
                        
                        {invite.invite_status === 'очікує' && (
                          <div>
                            <Button 
                              variant="success" 
                              size="sm" 
                              className="me-2"
                              onClick={() => handleAcceptInvite(invite.id)}
                            >
                              Прийняти
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleRejectInvite(invite.id)}
                            >
                              Відхилити
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>

      <AddInviteModal
        show={showInviteModal}
        onHide={() => setShowInviteModal(false)}
      />
    </div>
  );
};

export default Invites;