import React, { useEffect, useState } from 'react';

const EventsTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка при завантаженні JSON');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data.events);
      })
      .catch(error => {
        console.error('Помилка:', error);
      });
  }, []);

  const getLocationIcon = (trend) => {
    const isUp = trend === 'up';
    const colorClass = isUp ? 'text-success' : 'text-danger';
    const path = isUp
      ? 'M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z'
      : 'M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z';

    return (
      <svg
        className={`icon icon-xs ${colorClass} me-2`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" d={path} clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="col-12 mb-4">
      <div className="card border-0 shadow">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="fs-5 fw-bold mb-0">Події</h2>
            </div>
            <div className="col text-end">
              <a href="#" className="btn btn-sm btn-primary">
                Дивитись усі
              </a>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th className="border-bottom" scope="col">Назва</th>
                <th className="border-bottom" scope="col">Дата початку</th>
                <th className="border-bottom" scope="col">Тривалість</th>
                <th className="border-bottom" scope="col">Місце</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <th className="text-gray-900" scope="row">
                    <a href={`/events/${event.id}`}>{event.title}</a>
                  </th>
                  <td className="fw-bolder text-gray-500">
                    {event.start_date}
                  </td>
                  <td className="fw-bolder text-gray-500">
                    {event.duration}
                  </td>
                  <td className="fw-bolder text-gray-500">
                    <div className="d-flex">
                      {getLocationIcon(event.location_trend)}
                      {event.location}
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    Події не знайдені
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
