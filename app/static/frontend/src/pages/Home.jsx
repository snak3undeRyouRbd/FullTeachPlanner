import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SiteFooter from '../components/SiteFooter';
import Navbar from '../components/Navbar';
import AddEventModal from '../components/AddEventModal';

const localizer = momentLocalizer(moment);

const Home = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Совещание',
      start: new Date(2025, 3, 26, 10, 0),
      end: new Date(2025, 3, 26, 11, 30),
    },
    {
      id: 2,
      title: 'Обед',
      start: new Date(2025, 3, 26, 12, 0),
      end: new Date(2025, 3, 26, 13, 0),
    },
  ]);

  const messages = {
    today: 'Сьогодні',
    previous: 'Назад',
    next: 'Вперед',
    month: 'Місяць',
    week: 'Тиждень',
    day: 'День',
    agenda: 'Розклад',
    date: 'Дата',
    time: 'Час',
    event: 'Подія',
  };

  const [showEventModal, setShowEventModal] = useState(false);
  const handleAddEvent = () => setShowEventModal(true);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        onAddEvent={handleAddEvent}
      />
      <div style={{ padding: '20px', flex: 1 }}>
        <h1 style={{ marginBottom: '20px' }}>Мій календар</h1>
        <div style={{ height: 'calc(100vh - 180px)' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            defaultView="week"
            style={{ height: '100%' }}
            culture="uk"
          />
        </div>
      </div>

      <SiteFooter />
      <AddEventModal
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
      />
    </div>
  );
};

export default Home;