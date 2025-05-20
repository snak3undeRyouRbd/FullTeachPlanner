import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { Accordion } from 'react-bootstrap';
import AddEventModal from '../components/AddEventModal';

const QA = () => {
    const [showEventModal, setShowEventModal] = useState(false);
    const handleAddEvent = () => setShowEventModal(true);

  return (
    <div>
      <Navbar 
        onAddEvent={handleAddEvent}
      />
      <div className="container mt-4 mb-5">
        <h1>Довідка</h1>
        
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>1. Як користуватись сайтом (навігація)</Accordion.Header>
            <Accordion.Body>
              <p>Для навігації по сайту використовуйте головне меню у верхній частині сторінки:</p>
              <ul>
                <li><strong>Головна</strong> - перехід на головну сторінку</li>
                <li><strong>Події</strong> - перегляд та керування вашими подіями</li>
                <li><strong>Завдання</strong> - список ваших завдань</li>
                <li><strong>Довідка</strong> - поточна сторінка з інструкціями</li>
              </ul>
              <p>Ви також можете використовувати бічну панель для швидкого доступу до основних функцій.</p>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header>2. Як додати подію</Accordion.Header>
            <Accordion.Body>
              <p>Щоб додати нову подію:</p>
              <ol>
                <li>Перейдіть у розділ "Події"</li>
                <li>Натисніть кнопку "Додати подію"</li>
                <li>Заповніть форму:
                  <ul>
                    <li>Назва події</li>
                    <li>Дата та час початку</li>
                    <li>Опис (необов'язково)</li>
                    <li>Категорія</li>
                  </ul>
                </li>
                <li>Натисніть "Зберегти"</li>
              </ol>
              <p>Після збереження подія з'явиться у вашому календарі та списку подій.</p>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="2">
            <Accordion.Header>3. Як створити задачу</Accordion.Header>
            <Accordion.Body>
              <p>Для створення нової задачі:</p>
              <ol>
                <li>Перейдіть у розділ "Завдання"</li>
                <li>Натисніть кнопку "Нове завдання"</li>
                <li>Заповніть необхідні поля:
                  <ul>
                    <li>Назва завдання</li>
                    <li>Пріоритет (низький, середній, високий)</li>
                    <li>Дедлайн (якщо потрібно)</li>
                    <li>Опис (необов'язково)</li>
                  </ul>
                </li>
                <li>Натисніть "Додати"</li>
              </ol>
              <p>Завдання буде додано до вашого списку. Ви можете позначати його як виконане, редагувати або видаляти.</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      
      <SiteFooter />
      <AddEventModal
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
      />
    </div>
  );
};

export default QA;