import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Events from './pages/Events';
import EventPage from './pages/EventPage';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
import ProfileOverview from './pages/ProfileOverview';
import ProfileEdit from './pages/ProfileEdit';
import ProfileSettings from './pages/ProfileSettings';
import Invites from './pages/Invites';
import QA from './pages/QA';
import Login from './pages/Login';
import Register from './pages/Register';
import People from './pages/People';
import Person from './pages/Person';
import PersonAdd from './pages/PersonAdd';
import Settings from './pages/Settings';


function App() {

  // Компонент для проверки маршрута
  const Content = () => {
    const location = useLocation();
    const isAuthRoute = ['/auth/login', '/auth/register'].includes(location.pathname);

    if (isAuthRoute) {
      // Для страниц авторизации рендерим только контент
      return (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      );
    }

    // Для остальных страниц рендерим полный макет
    return (
      <div className="d-flex">
        <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler d-lg-none collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
        <Sidebar />
        <div className="flex-grow-1">
          <div className="main-content p-4 pt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventPage />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
              <Route path="/invites" element={<Invites />} />
              <Route path="/profile" element={<Profile />}>
                <Route index element={<ProfileOverview />} />
                <Route path="edit" element={<ProfileEdit />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>
              <Route path="/people" element={<People />} />
              <Route path="/people/:id" element={<Person />} />
              <Route path="/people/add" element={<PersonAdd />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/qa" element={<QA />} />
            </Routes>
          </div>
        </div>

      </div>
    );
  };

  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;