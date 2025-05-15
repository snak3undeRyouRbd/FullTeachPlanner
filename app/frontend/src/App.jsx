import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { socket, connectSocket, disconnectSocket } from './context/socket';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';

import Sidebar from './components/Sidebar';
// import MobileNavbar from './components/MobileNavbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
import ProfileOverview from './pages/ProfileOverview';
import ProfileEdit from './pages/ProfileEdit';
import ProfileSettings from './pages/ProfileSettings';
import Invites from './pages/Invites';
import QA from './pages/QA';

import People from './pages/People';
import Person from './pages/Person';
import Settings from './pages/Settings';

import AddEventModal from './components/AddEventModal';

function App() {
  const [showEventModal, setShowEventModal] = useState(false);
  const handleAddEvent = () => setShowEventModal(true);
  const handleAddTask = () => setShowTaskModal(true);
  const handleAddInvite = () => setShowInviteModal(true);

  return (
    <Router>
      <div className="d-flex">
        <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
    
    <div className="d-flex align-items-center">
        <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
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
              <Route path="/settings" element={<Settings />} />
              <Route path="/qa" element={<QA />} />
            </Routes>
          </div>
        </div>

        <AddEventModal
          show={showEventModal}
          onHide={() => setShowEventModal(false)}
        />

      </div>
    </Router>
  );
}

export default App;