import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/signin.css';
import logo from '../images/logo_trans.png';
import NewNav from '../components/NewNav';
import Footer from '../components/Footer';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function SignIn() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/artist/login', formData);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userType', 'artist'); // Add this line to store user type
        
        navigate('/artistdashboard');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <NewNav />
      <div className='signContainer'>
        <div className='formgrid'>
          <img className="h-auto w-52" src={logo} alt="Henna Ventures Logo" />
          <form onSubmit={submitForm}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="username"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              {/* <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2">Remember me</span>
              </label> */}
              {/* <a href="/forgot-password" className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
              </a> */}
            </div>
            <button
              className="login-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="links text-left text-gray-500 text-md">
            <p className="text-white">
              Don't have an account? <a href="/artistregister" className="text-blue-500 hover:text-blue-800">Register here</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
