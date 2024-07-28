import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/signup.css";
import logo from '../../images/logo_trans.png';
function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Assumes phone number should be 10 digits
    return phoneRegex.test(phone);
  };

  const validateForm = (formObject) => {
    if (!formObject.fullname) return "Full Name is required.";
    if (!formObject.phone) return "Contact Number is required.";
    if (!validatePhone(formObject.phone)) return "Invalid Contact Number. It should be 10 digits.";
    if (!formObject.email) return "Email is required.";
    if (!validateEmail(formObject.email)) return "Invalid Email format.";
    if (!formObject.password) return "Password is required.";
    // Additional validation checks can be added here
    return null;
  };

  const submitForm = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
  
    // Collect form data
    const formData = new FormData(e.target);
  
    // Convert FormData to a plain object
    const formObject = Object.fromEntries(formData.entries());
  
    // Client-side validation
    const validationError = validateForm(formObject);
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      // Convert formObject to JSON and log the payload
      const payload = JSON.stringify(formObject);
      console.log('Submitting form data:', payload);
  
      // Make a POST request to your backend with the form data
      const response = await axios.post('http://localhost:8000/api/v1/user/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setSuccess(response.data.message);
      setError(null);
  
      // Redirect to OTP verification page with email
      navigate("/verify-otp", { state: { email: formObject.email } });
    } catch (error) {
      console.error("There was an error!", error.response?.data || error.message);
      setError(error.response?.data?.message || "An error occurred during registration.");
      setSuccess(null);
    }
  };

  return (
    <div className="signContainer">
      <div className="formgrid">
        <img src={logo} alt="Logo" className="mx-auto mb-6" style={{ width: '100px', height: 'auto' }} />
        <form className="max-w-md mx-auto" onSubmit={submitForm}>
          <div className="relative z-0 w-full mb-4 group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Full Name"
              required
            />
          </div>
          
          <div className="relative z-0 w-full mb-4 group">
            <label htmlFor="phone">Contact Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Contact Number"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-4 group">
            <label htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-2 group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
            />
          </div>
          {error && (
            <div className="bg-red-500 text-white px-4 py-3 rounded relative mb-2 overflow-hidden">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500 text-white px-4 py-3 rounded relative mb-4 overflow-hidden">
              {success}
            </div>
          )}
          <div className="subButton">
            <button type="submit" className="button ">
              Sign Up
            </button>
          </div>
          <p className="text-white mt-5">
            Already have an account?{" "}
            <a
              href="/signin"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Click here to Sign In
              <svg
                className="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
