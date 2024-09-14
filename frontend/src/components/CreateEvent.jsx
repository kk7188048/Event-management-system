// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [attendees, setAttendees] = useState([{ name: '', email: '' }]);

  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: '', email: '' }]);
  };

  const handleAttendeeChange = (index, field, value) => {
    const newAttendees = attendees.slice();
    newAttendees[index][field] = value;
    setAttendees(newAttendees);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/events', {
      title,
      description,
      date,
      venue,
      attendees
    })
      .then(response => alert('Event created successfully!'))
      .catch(error => console.error('Error creating event:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="mt-1 block w-full border rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Attendees</label>
          {attendees.map((attendee, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Name"
                value={attendee.name}
                onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                className="mt-1 block w-full border rounded-md shadow-sm"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={attendee.email}
                onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                className="mt-1 block w-full border rounded-md shadow-sm"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAttendee}
            className="text-blue-600 hover:underline"
          >
            Add Attendee
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
