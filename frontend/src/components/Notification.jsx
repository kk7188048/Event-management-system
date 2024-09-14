// src/context/NotificationContext.jsx
import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications([...notifications, message]);
    setTimeout(() => setNotifications(notifications.slice(1)), 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2">
        {notifications.map((notification, index) => (
          <div key={index} className="bg-blue-500 text-white p-2 rounded">{notification}</div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
