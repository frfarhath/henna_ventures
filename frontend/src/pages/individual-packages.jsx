import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Footer from "../components/Footer";
import NewNav from '../components/NewNav';

const Package = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const packages = [
    {
      title: 'Wrist',
      details: [
        '1 side Rs 500',
        '2 side Rs 1000',
        '3 side Rs 1500',
        '1 side Rs 2000',
      ],
      color: 'bg-[#74512D]',
      tabColor: 'bg-[#543310]',
      buttonColor: 'bg-[#AF8F6F]',
      hoverColor: 'hover:bg-[#543310]'
    },
    {
      title: 'Half hand',
      details: [
        '1 side Rs 1000',
        '2 side Rs 2000',
        '3 side Rs 3000',
        '1 side Rs 6000',
      ],
      color: 'bg-[#74512D]',
      tabColor: 'bg-[#543310]',
      buttonColor: 'bg-[#AF8F6F]',
      hoverColor: 'hover:bg-[#543310]'
    },
    {
      title: 'Elbow',
      details: [
        '1 side Rs 2000',
        '2 side Rs 4000',
        '3 side Rs 6000',
        '1 side Rs 8000',
      ],
      color: 'bg-[#74512D]',
      tabColor: 'bg-[#543310]',
      buttonColor: 'bg-[#AF8F6F]',
      hoverColor: 'hover:bg-[#543310]'
    }
  ];

  const handleBookNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please sign in to book a package.');
      navigate('/signin'); // Redirect to the sign-in page
    } else {
      // Proceed with booking logic
      // Example: navigate to booking page
      navigate('/appointment/individual');
    }
  };

  return (
    <div className="repo-page" style={{ backgroundColor: 'white' }}>
      <NewNav />
      <div className="services-page">
        <header className="service-header">
          <div className="service-overlay">
            <h1 className="text-4xl font-bold">Our individual Packages</h1>
            <h4 className="font-sans mb-8 text-2xl mt-2">Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h4>
          </div>
        </header>
        
        <div className="flex flex-col items-center justify-center p-2">
          <div className="flex justify-end w-full px-4">
            <Link to="/package" className="mb-9 py-2 px-6 text-white bg-[#AF8F6F] rounded-md hover:bg-[#543310]">
             View Party Packages
            </Link>
          </div>
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
                <ul className="mb-4 text-left mt-8">
                  {pkg.details.map((detail, idx) => (
                    <li key={idx} className="mb-2 flex items-center">
                      <FaCheckCircle className="mr-2 text-green-500 text-xl" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 px-4 text-white rounded-md ${pkg.buttonColor} ${pkg.hoverColor}`}
                  onClick={handleBookNow} // Attach the handler
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Package;
