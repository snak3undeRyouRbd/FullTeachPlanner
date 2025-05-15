import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Для ссылок на профили
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import SiteFooter from '../components/SiteFooter';
import { Accordion } from 'react-bootstrap'; // Импортируем Accordion из react-bootstrap

const People = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Для текущего пользователя
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users || []);
        // Предположим, текущий пользователь — это "user" из data.json
        setCurrentUser(data.user || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }

  // Группировка пользователей по классам
  const groupByClass = (users) => {
    return users.reduce((acc, user) => {
      const className = user.class || 'Без класу';
      if (!acc[className]) {
        acc[className] = [];
      }
      acc[className].push(user);
      return acc;
    }, {});
  };

  const isTeacher = currentUser?.role === 'Вчитель';
  const groupedUsers = groupByClass(users);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar userRole={currentUser?.role || 'вчитель'} />

      <main className="flex-grow-1 container my-4">
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold text-dark mb-2">Наші користувачі</h1>
          <p className="lead text-muted">
            {users.filter((u) => u.role === 'вчитель').length} вчителів •{' '}
            {users.filter((u) => u.role === 'учень').length} учнів
          </p>
        </div>

        {isTeacher ? (

          <Accordion defaultActiveKey="0">
            {Object.entries(groupedUsers).map(([className, classUsers], index) => (
              <Accordion.Item eventKey={String(index)} key={className}>
                <Accordion.Header>{className}</Accordion.Header>
                <Accordion.Body>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {classUsers.map((user) => (
                      <div key={user.id} className="col">
                        <div className="card h-100 shadow-sm overflow-hidden">
                          <div className="card-body p-3 d-flex flex-column align-items-center">
                            <div className="d-flex justify-content-center mb-3">
                              <ProfileCard
                                user={user}
                                size="lg"
                                className="d-flex flex-column align-items-center text-center"
                                imageClassName="border border-white shadow"
                              />
                            </div>
                            <div className="mt-auto d-flex justify-content-center w-100">
                              <Link to={`/people/${user.id}`} className="btn btn-light">
                                Профіль
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {users.map((user) => (
              <div key={user.id} className="col">
                <div className="card h-100 shadow-sm overflow-hidden">
                  <div className="card-body p-3 d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center mb-3">
                      <ProfileCard
                        user={user}
                        size="lg"
                        className="d-flex flex-column align-items-center text-center"
                        imageClassName="border border-white shadow"
                      />
                    </div>
                    <div className="mt-auto d-flex justify-content-center w-100">
                      <Link to={`/people/${user.id}`} className="btn btn-light">
                        Профіль
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default People;