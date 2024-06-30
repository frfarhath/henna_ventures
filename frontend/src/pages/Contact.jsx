import React from 'react';
import { Textarea } from 'flowbite-react';
import logo from '../images/logo_trans.png';
import contact from '../images/contact.jpg';
import NewNav from '../components/NewNav';
import Footer from '../components/Footer';

function Contact() {
  return (
    <div className="contact-page" style={{ backgroundColor: '#ffffff' }}>
      <NewNav />
      <header className="service-header">
        <div className="service-overlay">
          <h1>Contact Us</h1>
          <h4>Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h4>
        </div>
      </header>
      <div className='hometitle'>
        Cherish Every Moment <br /> with Our Expertise
      </div>
      <div className="flex items-center justify-center min-h-screen py-12">
        <div className="flex flex-col md:flex-row bg-white  border border-gray-200 shadow-lg max-w-4xl rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 relative">
            <img src={contact} alt="Nature" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative bg-black bg-opacity-10 text-white p-10 flex flex-col justify-center h-full">
              <h2 className="text-2xl text-white font-bold mb-4">Get in touch with us to bring your Mehendi dreams to life!</h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-10 flex flex-col items-center">
            <img src={logo} alt="Logo" className="mb-6 w-32 h-auto" />
            {/* <h2 className="text-2xl font-bold mb-6">Welcome Back!</h2> */}
            <form className="w-full">
              <label htmlFor="full-name" className="block text-gray-700 mb-2">Full Name</label>
              <input type="text" id="full-name" name="full-name" placeholder="Enter Full Name" className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-lg" required />
              
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter Email" className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-lg" required />
              
              <label htmlFor="message" className="block text-gray-700 mb-2">Leave a Message</label>
              <Textarea id="message" name="message" placeholder="Your Message" className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-lg" required />
              
              <button type="submit" className="w-full p-3 bg-yellow-800 text-white rounded-lg hover:bg-yellow-700 hover:shadow-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
