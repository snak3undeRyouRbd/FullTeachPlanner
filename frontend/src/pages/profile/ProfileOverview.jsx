import React, { useState, useEffect  } from 'react';
import AddEventModal from '../components/AddEventModal';
import moment from 'moment';
import 'moment/locale/uk';
// import { useAuth } from '../context/AuthContext';
moment.locale('uk');

const ProfileOverview = () => {
    // const { currentUser } = useAuth();
    const [user, setUser] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const handleAddEvent = () => setShowEventModal(true);
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

<div className="card p-4">
          <div className="d-flex align-items-center mb-3">
            <img
              src={user.profile_photo}
              alt="Фото профілю"
              className="rounded-circle me-3"
              style={{ width: '80px', height: '80px' }}
            />
            <div>
              <h2>{user.name}</h2>
              <p className="text-muted">{user.role}</p>
            </div>
          </div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Клас:</strong> {user.class}</p>
          <p>
            <strong>Дата народження:</strong>{' '}
            {moment(user.birthday).format('D MMMM YYYY')}
          </p>
          <p>
            <strong>Останній візит:</strong>{' '}
            {moment(user.data_visited).format('D MMMM YYYY, HH:mm')}
          </p>
          <p>
            <strong>Дата приєднання:</strong>{' '}
            {moment(user.joined_at).format('D MMMM YYYY')}
          </p>
        </div>
        
      <AddEventModal
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
      />
    </div>
  );
};

export default ProfileOverview;