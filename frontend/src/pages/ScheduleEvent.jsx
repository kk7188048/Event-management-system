import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScheduleEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
    

  const handleAddAttendee = () => {
    if (attendeeName && attendeeEmail) {
      setAttendees([...attendees, { name: attendeeName, email: attendeeEmail }]);
      setAttendeeName('');
      setAttendeeEmail('');
    }
  };

  const handleRemoveAttendee = (index) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve token from localStorage
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/events/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          date,
          venue,
          attendees
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      await response.json();
      navigate('/');
    } catch (error) {
      console.error('Error scheduling event:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Schedule New Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              id="title"
              type="text"
              className="form-input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              className="form-input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
            <input
              id="date"
              type="date"
              className="form-input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="venue" className="block text-gray-700 font-bold mb-2">Venue</label>
            <input
              id="venue"
              type="text"
              className="form-input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Attendees</label>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Name"
                className="form-input border border-gray-300 rounded-md p-2 w-1/2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="form-input border border-gray-300 rounded-md p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={attendeeEmail}
                onChange={(e) => setAttendeeEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddAttendee}
                className="btn-primary ml-2"
              >
                Add Attendee
              </button>
            </div>
            <ul className="list-disc ml-5">
              {attendees.map((attendee, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{attendee.name} ({attendee.email})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttendee(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="btn-primary w-full rounded-md p-2">Schedule Event</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleEvent;
