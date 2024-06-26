import React from 'react';

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
  "Mannar", "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
  "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const AppointmentForm = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-[#804f0e] mb-6 animate-bounce">Individual Clients</h1>
      <form className="bg-white p-8 shadow-md rounded-lg max-w-4xl w-full animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[#804f0e]">First Name</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Last Name</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Email</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="email" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Phone</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Address 1</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Address 2</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">City</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">District</label>
            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]">
              <option value="">-- Select Your District --</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Time</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Date of Wedding:</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" placeholder="DD/MM/YYYY" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Type of Mehendi:</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>-- Select Mehendi type --</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Design Coverage:</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>-- Select Design Coverage --</option>
              <option value="Wrist">Until Wrist</option>
              <option value="HalfHand">Half Hand</option>
              <option value="Elbow">Up to the Elbow</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Mehendi on:</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>-- Select Mehendi Side --</option>
              <option value="OneSide">One Side (Palm or Back)</option>
              <option value="BothSides">Both Sides (Palm and Back)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Mehendi for:</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>-- Select Mehendi Hands --</option>
              <option value="OneHand">One Hand</option>
              <option value="BothHands">Both Hands</option>
            </select>
          </div>
        </div>
        {/* <p className="text-red-600 mt-4">
          Please make sure you have entered the date of your wedding, not the date you want your henna done.
        </p> */}
        <div className="flex justify-center mt-6">
          <button className="bg-[#804f0e] text-white py-2 px-4 rounded hover:bg-[#6d3d0b] transition duration-300">
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
