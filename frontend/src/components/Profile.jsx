import React from 'react';
import profileImage from '../images/profile.jpg'; // Adjust the path as needed

const Profile = () => {
  return (
    <div className="flex-grow p-4 lg:p-10">
      <div className="flex justify-center">
        <div className="relative">
          <img src={profileImage} alt="Profile" className="rounded-full border-4 border-green-500 w-24 h-24 lg:w-40 lg:h-40 object-cover" />
          <button className="absolute bottom-2 right-2 bg-gray-300 rounded-full p-1 lg:p-2">
            <i className="fas fa-camera"></i>
          </button>
        </div>
      </div>
      <div className="mt-6 lg:mt-10">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input type="email" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="tel" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700">Zip Code</label>
            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700">Address 1</label>
            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700">Address 2</label>
            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="col-span-1 lg:col-span-2 flex justify-center mt-4 lg:mt-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
