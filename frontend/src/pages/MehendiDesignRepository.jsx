import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

// Import images
import img from '../images/collections/Indian1.jpg';
import img1 from '../images/collections/indian2.jpg';
import img2 from '../images/collections/indian3.jpg';
import img3 from '../images/collections/Indian4.jpg';
import img4 from '../images/collections/indian5.jpg';
import img5 from '../images/collections/indian6.jpg';
import img6 from '../images/collections/indian7.jpg';

// Mock data
const mehendiDesigns = [
  { id: 1, name: 'Elegant Swirls', category: 'Traditional', image: img },
  { id: 2, name: 'Modern Art', category: 'Modern', image: img1 },
  { id: 3, name: 'Arabic Beauty', category: 'Arabic', image: img2 },
  { id: 4, name: 'Bridal Bliss', category: 'Bridal', image: img3 },
  { id: 5, name: 'Elegant Swirls', category: 'Traditional', image: img4 },
  { id: 6, name: 'Modern Art', category: 'Modern', image: img5 },
  { id: 7, name: 'Arabic Beauty', category: 'Arabic', image: img6 },
  // Add more designs as needed
];

const MehendiGallery = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filteredDesigns = mehendiDesigns.filter((design) =>
    (design.name.toLowerCase().includes(search.toLowerCase()) ||
      design.category.toLowerCase().includes(search.toLowerCase())) &&
    (category ? design.category === category : true)
  );

  return (
    <div>
      {/* Navbar */}
      <NavigationBar />
      <div className="services-page">
        <header className="service-header">
          <div className="service-overlay">
            <h1 className="text-4xl font-bold">Our Designs</h1>
            <h2 className="text-xl mt-2">Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h2>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between mb-6">
            <div className="relative w-full mr-4">
              <input
                type="text"
                placeholder="Search designs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full pr-10"
              />
              <FaSearch className="absolute top-3 right-3 text-gray-500" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded"
            >

              <option value="">All Categories</option>
              <option value="Traditional">Indian</option>
              <option value="Modern">Pakistani</option>
              <option value="Arabic">Arabic</option>
              <option value="Bridal">Indo-Arabic</option>
              <option value="Traditional">African</option>
              <option value="Modern">Moroccan</option>
              <option value="Arabic">Western</option>
              <option value="Bridal">Indo-Western</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDesigns.map((design) => (
              <motion.div
                key={design.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-200"
              >
                <img src={design.image} alt={design.name} className="w-full h-72 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{design.name}</h3>
                  <p className="text-sm text-gray-600">{design.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MehendiGallery;
