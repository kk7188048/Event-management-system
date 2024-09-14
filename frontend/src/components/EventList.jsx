// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Expected an array of events but got:', data);
        }
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 gap-4">
        {Array.isArray(events) && events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500">Venue: {event.venue}</p>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
