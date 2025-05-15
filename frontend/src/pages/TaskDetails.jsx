import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ title: '', text: '' });
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user ID (в реальном приложении это будет из контекста авторизации)
  const currentUserId = 1;

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP! статус: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Ищем задачу по id
        const foundTask = data.tasks.find((task) => task.id === parseInt(id));
        if (foundTask) {
          setTask(foundTask);
          setIsCompleted(foundTask.status === 'виконано');
        }

        // Загружаем комментарии для этой задачи
        const taskComments = data.comments.filter((comment) => comment.task_id === parseInt(id));
        setComments(taskComments);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных задачи:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.title.trim() && newComment.text.trim()) {
      const comment = {
        id: comments.length + 1,
        task_id: parseInt(id),
        parent_id: null,
        author_id: currentUserId,
        title: newComment.title,
        text: newComment.text,
        date: new Date().toISOString().split('T')[0],
      };
      setComments([...comments, comment]);
      setNewComment({ title: '', text: '' });
    }
  };

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    if (task) {
      task.status = !isCompleted ? 'виконано' : 'виконується';
      setTask({ ...task });
    }
  };

  if (loading) {
    return <div className="p-4">Загрузка...</div>;
  }

  if (error) {
    return <div className="p-4">Ошибка: {error}</div>;
  }

  if (!task) {
    return <div className="p-4">Задача не найдена</div>;
  }

  return (
    <div>
    <Navbar />
    <div className="container p-4">
      <h2>{task.title}</h2>
      <div className="card mb-4">
        <div className="card-body">
          <p><strong>Описание:</strong> {task.content}</p>
          <p><strong>Предмет:</strong> {task.subject}</p>
          <p><strong>Дата выполнения:</strong> {task.due_date}</p>
          <p><strong>Создано:</strong> {task.created_at}</p>
          <p><strong>Приоритет:</strong> {task.priority}</p>
          <p><strong>Статус:</strong> {task.status}</p>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isCompleted}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Выполнено</label>
          </div>
        </div>
      </div>

      <h3>Комментарии</h3>
      <div className="mb-4">
        {comments.length === 0 ? (
          <p>Комментариев пока нет</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{comment.title}</h5>
                <p className="card-text">{comment.text}</p>
                <p className="text-muted">
                  Автор: Пользователь {comment.author_id}, {comment.date}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <h4>Добавить комментарий</h4>
      <form onSubmit={handleCommentSubmit}>
        <div className="mb-3">
          <label htmlFor="commentTitle" className="form-label">Заголовок</label>
          <input
            type="text"
            className="form-control"
            id="commentTitle"
            value={newComment.title}
            onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="commentText" className="form-label">Текст комментария</label>
          <textarea
            className="form-control"
            id="commentText"
            rows="4"
            value={newComment.text}
            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Добавить комментарий</button>
      </form>
    </div>
    <SiteFooter />
    </div>
  );
};

export default TaskDetails;