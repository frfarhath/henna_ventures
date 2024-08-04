import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBoxOpen, FaSignOutAlt, FaStar, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import UserContext from '../../components/UserContext';

const Sidebar = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f5f0eb' }} className="w-64 p-6 shadow-lg font-serif flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-4 mb-8">
          <img src={user.profileImage} alt="Profile" className="w-12 h-12 rounded-full border-2 border-[#804f0e]" />
          <div>
            <h4 className="font-bold text-[#804f0e]">{user.fullname}</h4>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <nav className="space-y-4">
          <Link to="/collection" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaClipboardList className="mr-3" />
            Collection
          </Link>
          <Link to="/orders" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaBoxOpen className="mr-3" />
            Orders
          </Link>
          <Link to="/appointment" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaCalendarAlt className="mr-3" />
            Appointment
          </Link>
          <Link to="/profile" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaUser className="mr-3" />
            Profile
          </Link>
          <Link to="/ratings" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
            <FaStar className="mr-3" />
            My Ratings & Reviews
          </Link>

          <div>
            <Link to="/" className="flex items-center text-[#804f0e] hover:text-white hover:bg-[#804f0e] p-2 rounded-lg transition duration-300">
              <FaSignOutAlt className="mr-3" />
              Logout
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
