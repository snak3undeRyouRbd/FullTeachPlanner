import React, { useEffect, useState } from 'react';
import QRCodeModal from './QRCodeModal';

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleShare = (eventId) => {
    const url = `http://127.0.0.1:5000/events/${eventId}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Посилання на подію скопійовано до буфера обміну!');
      })
      .catch(err => {
        console.error('Помилка копіювання:', err);
        alert('Не вдалося скопіювати посилання.');
      });
  };

  const handleShowQRCode = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseQRCode = () => {
    setSelectedEvent(null);
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
                <th className="border-bottom" scope="col">Дії</th>
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
                    {event.location}
                  </td>
                  <td className="fw-bolder text-gray-500">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleShowQRCode(event)}
                        title="Поділитися"
                      >
                        <svg
                          className="icon icon-xs"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    Події не знайдені
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedEvent && (
        <QRCodeModal
          show={!!selectedEvent}
          onHide={handleCloseQRCode}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventsTable;