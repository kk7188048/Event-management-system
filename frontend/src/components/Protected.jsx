import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    // If no token is found, redirect to login page
    return <Navigate to="/login" />
  }

  // If token is found, render the child components
  return children
}

export default ProtectedRoute