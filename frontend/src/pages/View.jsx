import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react'; // Example spinner component

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch event details and attendees
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEvent(response.data);
      } catch (err) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDeleteAttendee = async (email) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/events/${eventId}/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Remove the deleted attendee from the state
      setEvent(prevEvent => ({
        ...prevEvent,
        attendees: prevEvent.attendees.filter(att => att.email !== email)
      }));
    } catch (err) {
      setError('Error deleting attendee');
    }
  };

  const handleAddAttendee = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3000/api/events/${eventId}/add-attendee`, newAttendee, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Add the new attendee to the state
      setEvent(prevEvent => ({
        ...prevEvent,
        attendees: [...prevEvent.attendees, { ...newAttendee, rsvpStatus: 'pending' }]
      }));
      setNewAttendee({ name: '', email: '' }); // Clear the form
    } catch (err) {
      setError('Error adding attendee');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAttendee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <div className="container mx-auto">
        {event ? (
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
            <p className="text-white mb-4">{event.description}</p>
            <p className="text-white mb-4">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-white mb-4">Venue: {event.venue}</p>

            <h2 className="text-3xl font-semibold text-white mb-4">Attendees</h2>
            {event.attendees.length > 0 ? (
              <div>
                {event.attendees.map(attendee => (
                  <div key={attendee.email} className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-md">
                    <div>
                      <p className="text-lg font-semibold">{attendee.name}</p>
                      <p className="text-gray-500">{attendee.email}</p>
                      <p className="text-gray-500">Status: {attendee.rsvpStatus}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAttendee(attendee.email)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">No attendees for this event.</p>
            )}

            <h2 className="text-3xl font-semibold text-white mt-6 mb-4">Add Attendee</h2>
            <form onSubmit={handleAddAttendee} className="bg-white p-4 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAttendee.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newAttendee.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Add Attendee</button>
            </form>
          </div>
        ) : (
          <p className="text-white">Event not found.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
