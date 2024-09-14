// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ScheduleEvent from './pages/ScheduleEvent';
import { NotificationProvider } from './components/Notification';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/schedule-event" element={<ScheduleEvent />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
