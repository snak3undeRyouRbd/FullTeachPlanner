import React from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskList';
import SiteFooter from '../components/SiteFooter';

const Tasks = () => {
  return (
    <div>
		<Navbar />
		<h1>Мій кабінет</h1>
    <TaskCard />
    <SiteFooter />
    </div>
  );
};

export default Tasks;