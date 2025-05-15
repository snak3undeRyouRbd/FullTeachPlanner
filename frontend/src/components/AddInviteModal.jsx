import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddInviteModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    inviter_id: '',
    invitee_id: '',
    event_id: '',
    invite_date: new Date().toISOString().split('T')[0], // Сегодняшняя дата
    invite_status: 'pending',
    notification_status: 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Нове запрошення:', formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Додати запрошення</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* ID запрошення (автогенерация, скрытое поле) */}
          <Form.Group className="mb-3" controlId="id" hidden>
            <Form.Control
              type="text"
              name="id"
              value={Math.random().toString(36).substr(2, 9)} // Генерация случайного ID
              readOnly
            />
          </Form.Group>

          {/* ID того, кто приглашает */}
          {/* <Form.Group className="mb-3" controlId="inviter_id">
            <Form.Label>Той, хто запрошує (ID)</Form.Label>
            <Form.Control
              type="text"
              name="inviter_id"
              value={formData.inviter_id}
              onChange={handleChange}
              placeholder="Введіть ID користувача, який запрошує"
              required
            />
          </Form.Group> */}

          {/* ID того, кого приглашают */}
          <Form.Group className="mb-3" controlId="invitee_id">
            <Form.Label>Той, кого запрошують (ID)</Form.Label>
            <Form.Control
              type="text"
              name="invitee_id"
              value={formData.invitee_id}
              onChange={handleChange}
              placeholder="Виберіть користувача, якого запрошують"
              required
            />
          </Form.Group>

          {/* Назва собтиия */}
          <Form.Group className="mb-3" controlId="event_id">
            <Form.Label>Назва події</Form.Label>
            <Form.Control
              type="text"
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
              placeholder="Назва події"
              required
            />
          </Form.Group>

          {/* Дата приглашения */}
          <Form.Group className="mb-3" controlId="invite_date">
            <Form.Label>Дата запрошення</Form.Label>
            <Form.Control
              type="date"
              name="invite_date"
              value={formData.invite_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          
          <p>Користувач отримує повідомлення</p>
          {/* Статус приглашения */}
          {/* <Form.Group className="mb-3" controlId="invite_status">
            <Form.Label>Статус запрошення</Form.Label>
            <Form.Select
              name="invite_status"
              value={formData.invite_status}
              onChange={handleChange}
            >
              <option value="pending">Очікує</option>
              <option value="accepted">Прийнято</option>
              <option value="declined">Відхилено</option>
            </Form.Select>
          </Form.Group> */}

          {/* Статус уведомления */}
          {/* <Form.Group className="mb-3" controlId="notification_status">
            <Form.Label>Статус сповіщення</Form.Label>
            <Form.Select
              name="notification_status"
              value={formData.notification_status}
              onChange={handleChange}
            >
              <option value="pending">Очікує</option>
              <option value="sent">Відправлено</option>
              <option value="failed">Не вдалося</option>
            </Form.Select>
          </Form.Group> */}

          <Button variant="primary" type="submit">
            Додати запрошення
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddInviteModal;