import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo_trans.png';
import NewNav from '../components/NewNav';
import Footer from '../components/Footer';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      setError('Email and password are required.');
      setSuccess('');
      setTimeout(() => {
        setError('');
      }, 2000); // Clear error message after 2 seconds
      return;
    }
  
    try {
      let response;
      if (email === 'admin@example.com' && password === 'admin123') {
        // Hardcoded admin credentials
        response = { data: { token: 'admin-token', user: { role: 'admin' } } };
      } else {
        response = await axios.post(
          'http://localhost:8000/api/v1/user',
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
  
      const user = response.data.user || {}; // Default to an empty object if user is undefined
  
      if (response.data.token) {
        // Store token and user data in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
  
        // Set success message
        setSuccess('Login successful!');
        setError('');
  
        // Redirect based on user role
        setTimeout(() => {
          const userRole = user.role || 'guest'; // Default to 'guest' if role is undefined
          if (userRole === 'admin') {
            navigate('/admin'); // Redirect to admin page
          } else {
            navigate('/profile'); // Redirect to user profile page
          }
        }, 2000); // Redirect after 2 seconds
      } else {
        setError('Invalid credentials.');
        setSuccess('');
        setTimeout(() => {
          setError('');
        }, 2000); // Clear error message after 2 seconds
      }
    } catch (error) {
      console.error('Login error:', error);
  
      if (error.response) {
        // Server responded with an error status
        setError(error.response.data.message || 'An error occurred.');
      } else {
        // No response received
        setError('Network error. Please try again.');
      }
      setSuccess('');
      setTimeout(() => {
        setError('');
      }, 2000); // Clear error message after 2 seconds
    }
  };
  
  return (
    <div>
      <NewNav />
      <div className='signContainer'>
        <div className='formgrid'>
          <img className="h-auto w-52" src={logo} alt="Henna Ventures Logo" />
          <form onSubmit={handleSubmit}>
            <div>
              {error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded shadow">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500 text-white px-4 py-2 rounded shadow">
                  {success}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <a href="/forgot-password" className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
              </a>
            </div>
            <button className="login-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
          </form>
          <div className="links text-left text-gray-500 text-md">
            <p className="text-white">
              Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-800">Register</a>
            </p>
            <p className="text-white">
              Sign in as an Artist? <a href="/artistlogin" className="text-blue-500 hover:text-blue-800">Sign in</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
