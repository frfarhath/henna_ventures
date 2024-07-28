import React, { useState } from "react";
import axios from 'axios';

const PackageForm = () => {

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
    "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
    "Mannar", "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
    "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [time, setTime] = useState('');
  const [wedding, setWedding] = useState('');
  const [design, setDesign] = useState('');
  const [pack, setPack] = useState('');



  const send = async (e) => {

    e.preventDefault();

    try {

      const postdata = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phone": phone,
        "address": address,
        "city": city,
        "district": district,
        "time": time,
        "wedding": wedding,
        "design": design,
        "package_type": pack
      };

      const res = await axios.post('http://localhost:8000/api/v1/individual/postPackage', postdata, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const resdata = await res.data;
      console.log(resdata);
      alert('Success ! Package Adding')
      window.location.reload();

    } catch (error) {

      console.log('Main Error', error);
      alert('Failed ! Package Adding')
      window.location.reload();

    }

  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-8 shadow-md rounded-lg max-w-4xl w-full animate-fadeIn">
        <h1 className="text-3xl font-bold text-[#804f0e] text-center mb-6 animate-slideIn">Package</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-[#804f0e]">First Name</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setFirstname(e.target.value)} value={firstname} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Last Name</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setLastname(e.target.value)} value={lastname} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Email</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="email"
              onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Phone</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setPhone(e.target.value)} value={phone} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Address</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setAddress(e.target.value)} value={address} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">City</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setCity(e.target.value)} value={city} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">District</label>
            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]"
              onChange={(e) => setDistrict(e.target.value)} value={district}>
              <option value="">-- Select Your District --</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Time</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="time"
              onChange={(e) => setTime(e.target.value)} value={time} />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 text-[#804f0e]">Date of Wedding:</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="date"
              onChange={(e) => setWedding(e.target.value)} value={wedding} />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-[#804f0e]">Henna Design Coverage:</label>
            <select className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setDesign(e.target.value)} value={design}>
              <option value="">-- Select Coverage --</option>
              <option value="Until wrist">Until wrist</option>
              <option value="Half hand">Half hand</option>
              <option value="Up to the elbow">Up to the elbow</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-[#804f0e]">Package:</label>
            <select className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setPack(e.target.value)} value={pack}>
              <option value="">-- Select Package --</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Diamond">Diamond</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-[#804f0e] text-white py-2 px-4 rounded hover:bg-[#6d3d0b] transition duration-300"
            onClick={send}>
            SEND
          </button>
        </div>

      </form>
    </div>
  );
};

export default PackageForm;
