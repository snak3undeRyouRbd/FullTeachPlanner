import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTaskModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'pending',
    created_at: new Date().toISOString().split('T')[0], // Сегодняшняя дата по умолчанию
    due_date: '',
    event_id: '',
    assigned_to: '',
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
    console.log('Нова задача:', formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Додати задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Назва */}
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Назва</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Введіть назву задачі"
              required
            />
          </Form.Group>

          {/* Контент */}
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Опис</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Введіть опис задачі"
              required
            />
          </Form.Group>

          {/* Статус */}
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Статус</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Очікує</option>
              <option value="in_progress">В процесі</option>
              <option value="completed">Завершено</option>
            </Form.Select>
          </Form.Group>

          {/* Дата створення */}
          <Form.Group className="mb-3" controlId="created_at">
            <Form.Label>Дата створення</Form.Label>
            <Form.Control
              type="date"
              name="created_at"
              value={formData.created_at}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Дата виконання */}
          <Form.Group className="mb-3" controlId="due_date">
            <Form.Label>Дата виконання</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* ID події */}
          <Form.Group className="mb-3" controlId="event_id">
            <Form.Label>Пов’язана подія</Form.Label>
            <Form.Control
              type="text"
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
              placeholder="Введіть назву"
            />
          </Form.Group>

          {/* Призначено користувачу */}
          <Form.Group className="mb-3" controlId="assigned_to">
            <Form.Label>Призначено користувачу</Form.Label>
            <Form.Select
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
            >
              <option value="">Оберіть користувача</option>
              <option value="user1">Користувач 1</option>
              <option value="user2">Користувач 2</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Додати задачу
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;