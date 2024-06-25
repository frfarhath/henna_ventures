import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/ArtistRegister.css';
import logo from '../images/logo_trans.png';
import NewNav from '../components/NewNav';
import Footer from '../components/Footer';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    previous_work: null,
    e_certificate: null,
    location: '',
    nearest_customers: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (!formData.full_name || !formData.phone || !formData.email || !formData.previous_work || !formData.e_certificate || !formData.location) {
      setError('All fields are required.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/artist/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        navigate('/artistlogin');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <NewNav />
      <div className="signContainer flex justify-center items-center min-h-screen bg-gray-200">
        <div className="w-full max-w-xl p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg">
          <form onSubmit={submitForm}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="full_name"
                id="full_name"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="full_name"
                className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="phone"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contact Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
    <label htmlFor="previous_work" className="peer-focus:font-medium text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
      Previous Works
    </label>
    <input
      type="file"
      accept=".pdf, .doc, .docx"
      name="previous_work"
      id="previous_work"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      onChange={handleChange}
      required
    />
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <label htmlFor="e_certificate" className="peer-focus:font-medium text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0]">
      E-certificate
    </label>
    <input
      type="file"
      accept=".pdf, .doc, .docx"
      name="e_certificate"
      id="e_certificate"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      onChange={handleChange}
      required
    />
  </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="location"
                id="location"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.location}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="location"
                className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Location
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="nearest_customers"
                  className="form-checkbox"
                  checked={formData.nearest_customers}
                  onChange={handleChange}
                />
                <span className="ml-2 text-white">
                  Can go to the nearest customer's area to put henna
                </span>
              </label>
            </div>
            <div className="subButton">
              <button
                type="submit"
                className="button bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Register here
              </button>
            </div>

            <p className="text-white mt-5">
              Already have an account?{" "}
              <a
                href="/artistlogin"
                className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Sign in as an Artist?
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegistrationForm;
