import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

// import siteLogo from './assets/images/logo.png';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Events from './pages/Events';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="main-content p-4 pt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
