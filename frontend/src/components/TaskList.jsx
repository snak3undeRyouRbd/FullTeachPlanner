import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.error('Помилка завантаження:', err));
  }, []);

  return (
    <div className="row">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
