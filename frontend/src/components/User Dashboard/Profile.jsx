import React, { useState, useEffect } from 'react';
import profileImage from '../../images/profile.jpg';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');


  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await axios.get('http://localhost:3000/api/user/getProfile');
        const resdata = await res.data;

        setId(resdata[0]._id);
        setFullname(resdata[0].fullname)
        setEmail(resdata[0].email)
        setPhone(resdata[0].phone)
        setPassword(resdata[0].password)
        setAddress(resdata[0].address)

      } catch (error) {
        console.log('Main Error', error);
      }

    };

    fetchData();

  }, []);


  const update = async (e) => {

    e.preventDefault();

    try {

      const postdata = {
        "fullname": fullname,
        "email": email,
        "phone": phone,
        "password": password,
        "address": address
      };

      const res = await axios.put(`http://localhost:3000/api/user/updateProfile/${id}`, postdata);
      const resdat = await res.data;
      console.log(resdat);

      alert('PROFILE UPDATE SUCCESSFULLY !');
      navigate('/'); 

    } catch (error) {

      console.log('Main Error', error);
      alert('PROFILE UPDATE FAILED !')

    }

  };


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
              onChange={(e) => setFullname(e.target.value)} value={fullname} />
          </div>

          <div>
            <label className="block text-[#804f0e]">Email Address</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div>
            <label className="block text-[#804f0e]">Phone Number</label>
            <input
              type="tel"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              onChange={(e) => setPhone(e.target.value)} value={phone} />
          </div>

          <div>
            <label className="block text-[#804f0e]">Change Password</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          <div>
            <label className="block text-[#804f0e]">Address </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-[#804f0e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#804f0e] transition-shadow duration-300"
              onChange={(e) => setAddress(e.target.value)} value={address} />
          </div>

          <div className="col-span-1 lg:col-span-2 flex justify-center mt-4 lg:mt-6">
            <button className="px-4 py-2 bg-[#804f0e] text-white rounded-md hover:bg-[#663b0b] transition-colors duration-300"
              onClick={update}>Update</button>
          </div>

        </form>
      </div>
    </div>
  );

};

export default Profile;
