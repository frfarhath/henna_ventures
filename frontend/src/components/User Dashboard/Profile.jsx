import React, { useState, useEffect, useContext } from 'react';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const Profile = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const res = await axios.get('http://localhost:8000/api/v1/user/profile', config);
        const userData = res.data;

        setFullname(userData.fullname);
        setEmail(userData.email);
        setPhone(userData.phone);
        setAddress(userData.address || '');
        // Construct the full URL for profileImage
        setProfileImage(userData.profileImage);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [setUser]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('address', address);
      if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
      }

      const res = await axios.put('http://localhost:8000/api/v1/user/profile', formData, config);
      console.log('Profile update response:', res.data);

      // Assuming res.data.user.profileImage is the relative path returned from the backend
      setProfileImage(`http://localhost:8000/uploads/${res.data.user.profileImage}`);

      alert('PROFILE UPDATED SUCCESSFULLY!');
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('PROFILE UPDATE FAILED!');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setProfileImage(URL.createObjectURL(file));
    e.target.value = null;
  };

  return (
    <div className="flex-grow p-4 lg:p-10 font-serif">
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={profileImage || '/images/default_avatar.png'} // Fallback image
            className="rounded-full border-4 border-[#804f0e] w-24 h-24 lg:w-40 lg:h-40 object-cover transition-transform duration-300 transform hover:scale-105"
            alt="Profile"
          />

          <label htmlFor="profileImageInput" className="absolute bottom-2 right-2 bg-gray-300 rounded-full p-1 lg:p-2 hover:bg-gray-400 transition-colors duration-300 cursor-pointer">
            <FaCamera className="text-[#804f0e]" />
          </label>
          <input id="profileImageInput" type="file" className="hidden" onChange={handleProfileImageChange} />
        </div>
      </div>

      <div className="mt-6 lg:mt-10">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" onSubmit={updateProfile}>
          <div>
            <label className="block text-[#804f0e]">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#804f0e]">Email Address</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#804f0e]">Phone Number</label>
            <input
              type="tel"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#804f0e]">Change Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#804f0e]">Address</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="col-span-1 lg:col-span-2 flex justify-center mt-4 lg:mt-6">
            <button
              className="px-4 py-2 bg-[#804f0e] text-white rounded-md hover:bg-[#663b0b] transition-colors duration-300"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
