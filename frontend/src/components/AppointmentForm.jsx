import React from 'react';

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
  "Mannar", "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
  "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const AppointmentForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
            <label className="block mb-2 text-[#804f0e]">Country</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div>
            <label className="block mb-2 text-[#804f0e]">Zipcode/Postalcode</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 text-[#804f0e]">Date of Wedding:</label>
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" type="text" placeholder="DD/MM/YYYY" />
          </div>
        
        </div>
        <p className="text-red-600 mt-4">
          Please make sure you have entered the date of your wedding, not the date you want your henna done.
        </p>
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

