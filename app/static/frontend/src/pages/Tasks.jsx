import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import SiteFooter from '../components/SiteFooter';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tasks = () => {
  const { currentUser } = useAuth();
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]); // Для хранения всех задач
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  // const [dueDateFilter, setDueDateFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const handleAddEvent = () => setShowEventModal(true);
  const handleAddTask = () => setShowTaskModal(true);
  const handleAddInvite = () => setShowInviteModal(true);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP! статус: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Сохраняем все задачи для формирования списка предметов
        setAllTasks(data.tasks);
        // Фильтруем задачи по currentUser.id, если пользователь авторизован
        const userTasks = currentUser
          ? data.tasks.filter((task) => task.assigned_to === currentUser.id)
          : data.tasks;
        setTasks(userTasks);
        setFilteredTasks(userTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных задач:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [currentUser]);

  // Получаем уникальные значения для фильтров из всех задач
  const uniqueSubjects = [...new Set(allTasks.map((task) => task.subject))];
  const uniqueStatuses = [...new Set(allTasks.map((task) => task.status))];
  const uniquePriorities = [...new Set(allTasks.map((task) => task.priority))];

  useEffect(() => {
    let result = [...tasks];

    // Фильтрация по предмету
    if (subjectFilter) {
      result = result.filter((task) => task.subject === subjectFilter);
    }

    // Фильтрация по статусу
    if (statusFilter) {
      result = result.filter((task) => task.status === statusFilter);
    }

    // Фильтрация по дате выполнения
    // if (dueDateFilter) {
    //   result = result.filter((task) => task.due_date === dueDateFilter);
    // }

    // Фильтрация по приоритету
    if (priorityFilter) {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    setFilteredTasks(result);
  }, [subjectFilter, statusFilter,  priorityFilter, tasks]);

  const handleSubjectChange = (e) => {
    setSubjectFilter(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // const handleDueDateChange = (e) => {
  //   setDueDateFilter(e.target.value);
  // };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          userRole={currentUser?.role || 'учень'}
          onAddEvent={handleAddEvent}
          onAddTask={handleAddTask}
          onAddInvite={handleAddInvite}
        />
        <main className="flex-grow-1">
          <div className="py-4">
            <div className="container">
              <h1>Завдання</h1>
              <p>Загрузка...</p>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          userRole={currentUser?.role || 'учень'}
          onAddEvent={handleAddEvent}
          onAddTask={handleAddTask}
          onAddInvite={handleAddInvite}
        />
        <main className="flex-grow-1">
          <div className="py-4">
            <div className="container">
              <h1>Завдання</h1>
              <p>Ошибка: {error}</p>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        userRole={currentUser?.role || 'учень'}
        onAddEvent={handleAddEvent}
        onAddTask={handleAddTask}
        onAddInvite={handleAddInvite}
      />
      <main className="flex-grow-1">
        <div className="py-4">
          <div className="container">
            <h1>Завдання</h1>
            <p>Список ваших завдань</p>

            {/* Фильтры */}
            <div className="mb-4">
              <div className="row g-3">
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={subjectFilter}
                    onChange={handleSubjectChange}
                  >
                    <option value="">Все предметы</option>
                    {uniqueSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="">Все статусы</option>
                    {uniqueStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    value={dueDateFilter}
                    onChange={handleDueDateChange}
                  />
                </div> */}
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={priorityFilter}
                    onChange={handlePriorityChange}
                  >
                    <option value="">Все приоритеты</option>
                    {uniquePriorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Список задач */}
            {filteredTasks.length === 0 ? (
              <p>Задач пока нет</p>
            ) : (
              filteredTasks.map((task) => (
                <Link key={task.id} to={`/tasks/${task.id}`} className="text-decoration-none">
                  <TaskCard task={task} />
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
      <AddTaskModal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
      />
    </div>
  );
};

export default Tasks;