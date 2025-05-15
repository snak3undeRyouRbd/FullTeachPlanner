import React from 'react';

const TaskCard = ({ task }) => {
  const { title, content, subject, due_date, status, priority } = task;

  const getStatusColor = (status) => {
    if (status === 'завершено') return 'success';
    if (status === 'виконується') return 'warning';
    return 'secondary';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'високий') return 'danger';
    if (priority === 'середній') return 'warning';
    return 'info';
  };

  return (
    <div className="col-12 col-sm-6 col-xl-4 mb-4">
      <div className="card border-0 shadow">
        <div className="card-body">
          <h5 className="fw-bold">{title}</h5>
          <p className="text-muted mb-2">{content}</p>
          <p className="d-flex justify-content-evenly">
            <span title="Предмет">{subject}</span>
            <span title="Статус" className={`badge bg-${getStatusColor(status)}`}>{status}</span>
            <span title="Пріоритет" className={`badge bg-${getPriorityColor(priority)}`}>{priority}</span>
          </p>
          <span title="Виконати дот">Виконати до:</span>{due_date}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
