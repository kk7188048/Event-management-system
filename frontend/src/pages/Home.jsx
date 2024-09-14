import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react'; // Example spinner component
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Example icons

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    setIsAuthenticated(true);

    // Fetch events with authentication token
    axios.get('http://localhost:3000/api/events/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('API response:', response.data);
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => console.error('Error fetching events:', error))
      .finally(() => setLoading(false)); // Set loading to false after fetching
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">You need to log in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Upcoming Events</h1>
          <Link to="/schedule-event" className="btn-primary">
            Schedule New Event
          </Link>
        </div>
        <h2 className="text-3xl font-semibold text-white mb-4">Upcoming Events</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner color="white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map(event => (
                <div key={event._id} className="border border-gray-200 p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="flex items-center mt-2">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <p className="text-gray-500">Venue: {event.venue}</p>
                  </div>
                  <Link to={`/current-event/${event._id}`} className="text-blue-500 hover:underline mt-4 block">View Details</Link>
                </div>
              ))
            ) : (
              <p className="text-white">No events available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
