// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBoxOpen, FaSignOutAlt, FaInbox,FaStar } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { BiBarChartSquare } from 'react-icons/bi';
import { RiTeamFill } from 'react-icons/ri';
import profileImage from '../images/profile.jpg'; // Adjust the path as needed

const Sidebar = () => {
  return (
    <div className="bg-gray-50 h-screen w-64 p-6 shadow-lg font-serif flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-4 mb-8">
          <img src={profileImage} alt="Profile" className="profile-img" />
          <div>
            <h4 className="font-bold text-[#804f0e]">Fathima Samee</h4>
            <p className="text-sm text-gray-600">fathisam100@gmail.com</p>
          </div>
        </div>
        <nav className="space-y-4">
          <Link to="/profile" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaUser className="mr-3" />
            Profile
          </Link>
          <Link to="/orders" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaBoxOpen className="mr-3" />
            Orders
          </Link>
          <Link to="/ratingsss" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaStar className="mr-3" />
            My ratings & reviews
          </Link>
      
        
          {/* <Link to="/product" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaBoxOpen className="mr-3" />
            Product
          </Link> */}
      
        </nav>
      </div>
      <div>
        <Link to="/logout" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
          <FaSignOutAlt className="mr-3" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
