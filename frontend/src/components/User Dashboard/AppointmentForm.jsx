import React, { useState } from "react";
import axios from 'axios';


const AppointmentForm = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [time, setTime] = useState('');
  const [wedding, setWedding] = useState('');
  const [type, setType] = useState('');
  const [design, setDesign] = useState('');
  const [onmehendi, setOnmehendi] = useState('');
  const [formehendi, setFormehendi] = useState('');


  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
    "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
    "Mannar", "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
    "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  const types = [
    "Indian", "Pakistani", "Arabic", "Indo-Arabic", "African", "Moroccan", "Western", "Indo-Western"
  ];


  const send = async (e) => {

    e.preventDefault();


    try {

      const postdata = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phone": phone,
        "address1": address1,
        "address2": address2,
        "city": city,
        "district": district,
        "time": time,
        "wedding": wedding,
        "type_mehendi": type,
        "design": design,
        "mehendi_on": onmehendi,
        "mehendi_for": formehendi
      };

      const res = await axios.post('http://localhost:8000/api/v1/individual', postdata, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const resdat = await res.data;
      console.log(resdat);
      alert('Success ! Appoinment Adding')
      window.location.reload();

    } catch (error) {

      console.log('Main Error', error);
      alert('Failed ! Appoinment Adding')
      window.location.reload();

    }

  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-[#804f0e] mb-6 animate-bounce">Individual Clients</h1>
      <form className="bg-white p-8 shadow-md rounded-lg max-w-4xl w-full animate-fadeIn">

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
            <label className="block mb-2 text-[#804f0e]">Address 1</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setAddress1(e.target.value)} value={address1} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Address 2</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setAddress2(e.target.value)} value={address2} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">City</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text"
              onChange={(e) => setCity(e.target.value)} value={city} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">District</label>
            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]"
              onChange={(e) => setDistrict(e.target.value)} value={district} >
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

          <div>
            <label className="block mb-2 text-[#804f0e]">Appointment Date</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="date"
              placeholder="DD/MM/YYYY" onChange={(e) => setWedding(e.target.value)} value={wedding} />
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Type of Mehendi:</label>
            <select className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setType(e.target.value)} value={type}>
              <option>-- Select Mehendi type --</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Design Coverage:</label>
            <select className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setDesign(e.target.value)} value={design}>
              <option>-- Select Design Coverage --</option>
              <option value="Wrist">Until Wrist</option>
              <option value="HalfHand">Half Hand</option>
              <option value="Elbow">Up to the Elbow</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Mehendi on:</label>
            <select className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setOnmehendi(e.target.value)} value={onmehendi}>
              <option>-- Select Mehendi Side --</option>
              <option value="OneSide">One Side (Palm or Back)</option>
              <option value="BothSides">Both Sides (Palm and Back)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-[#804f0e]">Mehendi for:</label>
            <select className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setFormehendi(e.target.value)} value={formehendi}>
              <option>-- Select Mehendi Hands --</option>
              <option value="OneHand">One Hand</option>
              <option value="BothHands">Both Hands</option>
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

export default AppointmentForm;
