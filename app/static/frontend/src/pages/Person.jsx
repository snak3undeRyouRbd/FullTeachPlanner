import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/uk'; // Подключаем локализацию
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';

// Устанавливаем локализацию один раз
moment.locale('uk');

const Person = () => {
  const { id } = useParams(); // Получаем параметр id из URL
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных из data.json
  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Ищем пользователя по id
        const foundPerson = data.users.find((user) => user.id === parseInt(id));
        setPerson(foundPerson || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading person data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]); // Зависимость от id, чтобы перезагружать данные при смене id

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;
  if (!person) return <div>Людину не знайдено</div>;

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Інформація про людину</h1>
        <div className="card p-4">
          <div className="d-flex align-items-center mb-3">
            <img
              src={person.profile_photo}
              alt="Фото профілю"
              className="rounded-circle me-3"
              style={{ width: '80px', height: '80px' }}
            />
            <div>
              <h2>{person.name}</h2>
              <p className="text-muted">{person.role}</p>
            </div>
          </div>
          <p><strong>ID:</strong> {person.id}</p>
          <p><strong>Email:</strong> {person.email}</p>
          <p><strong>Клас:</strong> {person.class}</p>
          <p>
            <strong>Дата народження:</strong>{' '}
            {moment(person.birthday).format('D MMMM YYYY')}
          </p>
          <p>
            <strong>Останній візит:</strong>{' '}
            {moment(person.data_visited).format('D MMMM YYYY, HH:mm')}
          </p>
          <p>
            <strong>Дата приєднання:</strong>{' '}
            {moment(person.joined_at).format('D MMMM YYYY')}
          </p>
          <Link to="/people" className="btn btn-primary mt-3">
            Назад до списку
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Person;