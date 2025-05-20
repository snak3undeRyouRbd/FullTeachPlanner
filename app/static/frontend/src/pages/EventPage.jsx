import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { useAuth } from '../context/AuthContext';
import { Card, ListGroup, Button } from 'react-bootstrap';

const EventPage = () => {
  const { eventId } = useParams(); // Получаем ID события из URL
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Полученный eventId:', eventId); // Отладка

    if (!eventId || isNaN(parseInt(eventId))) {
      setError('Недійсний ID події в URL');
      setLoading(false);
      return;
    }

    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Загруженные данные из data.json:', data);

        // Проверка наличия events в data
        if (!data || !data.events) {
          setError('Масив подій не знайдено в data.json');
          setLoading(false);
          return;
        }

        // Поиск события
        const eventIdNum = parseInt(eventId);
        const foundEvent = data.events.find((e) => e.id === eventIdNum);

        if (foundEvent) {
          setEvent(foundEvent);

          // Извлечение участников из event_participants
          const eventParticipants = data.event_participants
            .filter((ep) => ep.event_id === eventIdNum)
            .map((ep) => {
              const user = data.users.find((u) => u.id === ep.user_id);
              return user ? { id: user.id, name: user.name, role: user.role } : null;
            })
            .filter((p) => p !== null);

          setParticipants(eventParticipants);

          // Извлечение связанных задач
          const relatedTasks = data.tasks.filter((task) => task.event_id === eventIdNum);
          setTasks(relatedTasks);
        } else {
          setError(`Подію з ID ${eventId} не знайдено в data.json`);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(`Помилка завантаження: ${err.message}`);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <p className="text-danger">Помилка: {error}</p>
        <Link to="/events" className="btn btn-primary">Повернутися до списку подій</Link>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container my-4">
        <p>Подію не знайдено</p>
        <Link to="/events" className="btn btn-primary">Повернутися до списку подій</Link>
      </div>
    );
  }

  const { title, type, start_date, duration, location, creator_id } = event;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar userRole={currentUser?.role || 'учень'} />
      <main className="flex-grow-1 container my-4">
        <Card className="shadow-sm">
          <Card.Header as="h2" className="bg-primary text-white">
            {title}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Тип:</strong> {type}
            </Card.Text>
            <Card.Text>
              <strong>Дата та час:</strong>{' '}
              {start_date ? new Date(start_date).toLocaleString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : 'Невідомо'}
            </Card.Text>
            <Card.Text>
              <strong>Тривалість:</strong> {duration || 'Невідомо'}
            </Card.Text>
            <Card.Text>
              <strong>Місце:</strong> {location || 'Невідомо'}
            </Card.Text>
            <Card.Text>
              <strong>Організатор:</strong>{' '}
              {creator_id ? `ID організатора: ${creator_id}` : 'Невідомо'}
            </Card.Text>
            <Card.Text>
              <strong>Учасники:</strong>
              {participants.length > 0 ? (
                <ListGroup className="mt-2">
                  {participants.map((participant, index) => (
                    <ListGroup.Item key={index}>
                      {participant.name} ({participant.role})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="mt-2">Немає учасників</p>
              )}
            </Card.Text>
            <Card.Text>
              <strong>Пов’язані завдання:</strong>
              {tasks.length > 0 ? (
                <ListGroup className="mt-2">
                  {tasks.map((task) => (
                    <ListGroup.Item key={task.id}>
                      <strong>{task.title}</strong> ({task.subject})<br />
                      <strong>Опис:</strong> {task.content}<br />
                      <strong>Статус:</strong> {task.status}<br />
                      <strong>Термін виконання:</strong>{' '}
                      {new Date(task.due_date).toLocaleDateString('uk-UA')}<br />
                      <strong>Приорітет:</strong> {task.priority}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="mt-2">Немає пов’язаних завдань</p>
              )}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link to="/events" className="btn btn-secondary me-2">Повернутися до списку</Link>
            <Button variant="primary">Участвую</Button>
            {/* {currentUser?.id === creator_id && (
              <Button variant="primary">Редагувати подію</Button>
            )} */}
          </Card.Footer>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
};

export default EventPage;