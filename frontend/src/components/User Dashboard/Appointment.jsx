import React from 'react';
import { Link } from 'react-router-dom';
import individualImage from '../images/individual.jpg'; // Adjust the path as needed
import packagesImage from '../images/packages.jpg'; // Adjust the path as needed

const Appointment = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0eb] p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#804f0e] animate-fade-in-up animate-pulse-text">Please Select Relevant Appointment</h2>
      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        <Link to="/appointment/individual" className="relative group w-64 h-64 sm:w-80 sm:h-80 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white">
          <div className="absolute inset-0 z-10"></div>
          <img src={individualImage} alt="Individual" className="w-full h-2/3 object-cover group-hover:opacity-75 transition-opacity duration-300"/>
          <div className="absolute inset-x-0 bottom-0 p-4 z-20 bg-white bg-opacity-75 group-hover:animate-fade-in-up">
            <h3 className="text-[#804f0e] text-xl font-bold text-center group-hover:animate-fade-in-up">Individual</h3>
          </div>
        </Link>
        <Link to="/appointment/packages" className="relative group w-64 h-64 sm:w-80 sm:h-80 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white">
          <div className="absolute inset-0 z-10"></div>
          <img src={packagesImage} alt="Packages" className="w-full h-2/3 object-cover group-hover:opacity-75 transition-opacity duration-300"/>
          <div className="absolute inset-x-0 bottom-0 p-4 z-20 bg-white bg-opacity-75 group-hover:animate-fade-in-up">
            <h3 className="text-[#804f0e] text-xl font-bold text-center group-hover:animate-fade-in-up">Packages</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Appointment;
