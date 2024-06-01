import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/signin.css';
import logo from '../images/logo_trans.png';
import NewNav from '../components/NewNav';
import Footer from '../components/Footer';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple validation
    if (!email) {
      setError('Email is required.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    try {
      console.log('Sending request to backend with:', { email, password });
      const response = await axios.post('http://localhost:8000/api/v1/user', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response data:', response.data);

      if (response.data) {
        // Store user data and token in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);  // Assuming the token is part of the response

        // Redirect to the sidebar section
        navigate('/profile');
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);  // Log the error for debugging

      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response data:', error.response.data);  // Log the response data
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);  // Log the request
        setError('No response from the server. Please try again.');
      } else {
        // Something else caused the error
        console.error('Error message:', error.message);  // Log the error message
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <NewNav />
      <div className='signContainer'>
        <div className='formgrid'>
          <img className="h-auto w-52" src={logo} alt="Henna Ventures Logo" />
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message text-red-500 mb-4">{error}</div>}
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
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2">Remember me</span>
              </label>
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
