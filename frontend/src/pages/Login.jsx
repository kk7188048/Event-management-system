import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    console.log("login",token)

    try {
      await axios.post('http://localhost:3000/api/users/login', { email, password });
      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button 
            type="submit" 
            className={`btn-primary w-full p-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} 
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
          <p className="text-center mt-4">
            Don't have an account? 
            <a href="/signup" className="text-blue-600 hover:underline"> Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;