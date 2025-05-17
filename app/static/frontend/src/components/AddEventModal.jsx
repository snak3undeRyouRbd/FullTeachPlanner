import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddEventModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    duration: '',
    content: '',
    contentHidden: false,
    location: '',
    isOnline: false,
    participants: [],
    tasks: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleParticipantsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      participants: selectedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Новое событие:', formData);
    onHide(); // Закрываем модальное окно после отправки
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Додати подію</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Назва */}
          <Form.Group className="mb-3" controlId="eventName">
            <Form.Label>Назва</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введіть назву події"
              required
            />
          </Form.Group>

          {/* Дата початку */}
          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Дата початку</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Тривалість */}
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Тривалість (у хвилинах)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Введіть тривалість"
              required
            />
          </Form.Group>

          {/* Контент */}
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Контент</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Введіть контент події"
            />
          </Form.Group>

          {/* Приховати контент */}
          <Form.Group className="mb-3" controlId="contentHidden">
            <Form.Check
              type="checkbox"
              label="Приховати контент до початку події"
              name="contentHidden"
              checked={formData.contentHidden}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Місце проведення або посилання */}
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Місце проведення або посилання</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={
                formData.isOnline
                  ? 'Введіть посилання для онлайн-події'
                  : 'Введіть місце проведення'
              }
              required
            />
          </Form.Group>

          {/* Онлайн-подія */}
          <Form.Group className="mb-3" controlId="isOnline">
            <Form.Check
              type="checkbox"
              label="Онлайн-подія"
              name="isOnline"
              checked={formData.isOnline}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Учасники */}
          <Form.Group className="mb-3" controlId="participants">
            <Form.Label>Учасники</Form.Label>
            <Form.Select
              multiple
              name="participants"
              value={formData.participants}
              onChange={handleParticipantsChange}
            >
              <option value="user1">Користувач 1</option>
              <option value="user2">Користувач 2</option>
              <option value="group1">Група 1</option>
              <option value="group2">Група 2</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Утримуйте Ctrl (Cmd на Mac), щоб обрати кількох учасників.
            </Form.Text>
          </Form.Group>

          {/* Завдання (опціонально) */}
          <Form.Group className="mb-3" controlId="tasks">
            <Form.Label>Завдання (опціонально)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="tasks"
              value={formData.tasks}
              onChange={handleChange}
              placeholder="Введіть завдання, пов’язані з подією"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Додати подію
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEventModal;