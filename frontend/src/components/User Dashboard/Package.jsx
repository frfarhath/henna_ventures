import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import the icon

const Package = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const packages = [
    {
      title: 'Silver Package',
      price: 'Rs.5000',
      details: [
        'Minimum 5 people',
        'Arabic, Indian designs',
        'Upgradable to include additional guests or premium designs at an extra cost'
      ],
      color: 'bg-[#74512D]',
      tabColor: 'bg-[#543310]',
      buttonColor: 'bg-[#AF8F6F]',
      hoverColor: 'hover:bg-[#543310]'
    },
    {
      title: 'Gold Package',
      price: 'Rs.10000',
      details: [
        'Minimum 10 people',
        'Arabic, Indian, Pakistani, Western, African designs',
        'Options for additional services like glitter, stones, or color infusions'
      ],
      color: 'bg-[#74512D]',
      tabColor: 'bg-[#543310]',
      buttonColor: 'bg-[#AF8F6F]',
      hoverColor: 'hover:bg-[#543310]'
    },
    {
      title: 'Diamond Package',
      price: 'Rs.15000',
      details: [
        'Minimum 20 people',
        'All designs included',
        'Bridal accessories and personalized henna design consultations'
      ],
      color: 'bg-[#74512D]',
      tabColor: 'bg-[#543310]',
      buttonColor: 'bg-[#AF8F6F]',
      hoverColor: 'hover:bg-[#543310]'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0eb] p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        {packages.map((pkg, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative bg-white rounded-3xl shadow-lg m-4 p-6 w-full md:w-96 transform transition duration-300 ${
              hoveredCard === index
                ? 'scale-110 shadow-2xl'
                : 'bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg'
            }`}
            style={{ zIndex: hoveredCard === index ? 10 : 1 }}
          >
            <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-full px-6 py-3 text-white ${pkg.tabColor}`}>
              <div className="text-xl font-bold">{pkg.title}</div>
            </div>
            <div className="mt-8 text-2xl text-gray-800 mb-4 text-center">{pkg.price}</div>
            <ul className="mb-4 text-left">
              {pkg.details.map((detail, idx) => (
                <li key={idx} className="mb-2 flex items-center">
                  <FaCheckCircle className="mr-2 text-green-500 text-xl" /> {/* Icon for correction mark with fixed size */}
                  {detail}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 px-4 text-white rounded-md ${pkg.buttonColor} ${pkg.hoverColor}`}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
