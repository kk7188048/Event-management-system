// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 p-4 text-white text-center">
          <h1 className="text-2xl font-bold">Event Management System</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
