import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/email_verification/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(errorText);
        console.log('Response not OK:', errorText); // Debug statement
        return;
      }

      const data = await response.json();
      setMessage(data.message || 'OTP verified successfully.'); // Handle case where message might not be present
      console.log('Verification response:', data); // Debug statement

      if (data.verified) {
        console.log('OTP verified successfully, navigating to signin'); // Debug statement
        navigate('/signin');
      } else {
        console.log('Verification failed:', data.message); // Debug statement
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred while verifying OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl mb-4">Email and OTP Verification</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleVerifyOtp}
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md"
        >
          Verify OTP
        </button>
        <p className="mt-4">{message}</p>
      </div>
    </div>
  );
};

export default EmailVerification;
