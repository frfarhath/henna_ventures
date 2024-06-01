// src/components/Profile.jsx
import React from 'react';
import profileImage from '../images/profile.jpg'; // Adjust the path as needed
import { FaCamera } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="flex-grow p-4 lg:p-10 font-serif">
      <div className="flex justify-center">
        <div className="relative">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="rounded-full border-4 border-[#804f0e] w-24 h-24 lg:w-40 lg:h-40 object-cover transition-transform duration-300 transform hover:scale-105" 
          />
          <button className="absolute bottom-2 right-2 bg-gray-300 rounded-full p-1 lg:p-2 hover:bg-gray-400 transition-colors duration-300">
            <FaCamera className="text-[#804f0e]" />
          </button>
        </div>
      </div>
      <div className="mt-6 lg:mt-10">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="block text-[#804f0e]">Full Name</label>
            <input 
              type="text" 
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300" 
            />
          </div>
          <div>
            <label className="block text-[#804f0e]">Email Address</label>
            <input 
              type="email" 
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300" 
            />
          </div>
          <div>
            <label className="block text-[#804f0e]">Phone Number</label>
            <input 
              type="tel" 
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300" 
            />
          </div>
          <div>
            <label className="block text-[#804f0e]">Zip Code</label>
            <input 
              type="text" 
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300" 
            />
          </div>
          <div>
            <label className="block text-[#804f0e]">Address 1</label>
            <input 
              type="text" 
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300" 
            />
          </div>
          <div>
            <label className="block text-[#804f0e]">Address 2</label>
            <input 
              type="text" 
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300" 
            />
          </div>
          <div className="col-span-1 lg:col-span-2 flex justify-center mt-4 lg:mt-6">
            <button className="px-4 py-2 bg-[#804f0e] text-white rounded-md hover:bg-[#663b0b] transition-colors duration-300">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
