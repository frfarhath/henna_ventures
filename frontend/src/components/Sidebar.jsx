import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-full lg:w-1/4 bg-gray-100 p-6 lg:p-8 flex justify-center lg:justify-start">
      <ul className="space-y-6 text-lg lg:text-xl font-semibold text-left">
      <li className="w-full mb-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? 'block py-2 px-4 text-red-500 font-bold'
                : 'block py-2 px-4 text-gray-700'
            }
          >
            Profile
          </NavLink>
        </li>
        <li className="w-full mb-2">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? 'block py-2 px-4 text-red-500 font-bold'
                : 'block py-2 px-4 text-gray-700'
            }
          >
            Orders
          </NavLink>
        </li>
  
        <li className="text-gray-700 flex items-center space-x-2">
          <i className="fas fa-sign-out-alt"></i>
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
