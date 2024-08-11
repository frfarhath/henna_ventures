import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import NewNav from '../components/NewNav';
import Footer from "../components/Footer";
import axios from 'axios';

// Mock data (still useful for initial state)
const mehendiDesigns = [
  { id: 1, name: 'Elegant Swirls', category: 'Traditional', image: 'path/to/local/image.jpg' },
  // other mock designs...
];

const MehendiGallery = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [collection, setCollection] = useState([]);
  const [adminCollections, setAdminCollections] = useState([]); // State to store admin collections

  useEffect(() => {
    // Fetch admin collections on component mount
    const fetchAdminCollections = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/getrepo');
        setAdminCollections(response.data);
      } catch (error) {
        console.error('Error fetching admin collections:', error);
      }
    };
    fetchAdminCollections();
  }, []);

  const filteredDesigns = mehendiDesigns.filter((design) =>
    (design.name.toLowerCase().includes(search.toLowerCase()) ||
      design.category.toLowerCase().includes(search.toLowerCase())) &&
    (category ? design.category === category : true)
  );

  const addToCollection = async (design) => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/repoupload', { design });
      if (response.status === 200) {
        setCollection([...collection, design]);
        alert('Design added to collection successfully!');
      }
    } catch (error) {
      console.error('Error adding design to collection:', error);
      alert('Failed to add design to collection.');
    }
  };

  return (
    <div className="repo-page" style={{ backgroundColor: 'white' }}>
      {/* Navbar */}
      <NewNav />
      <div className="services-page">
        <header className="service-header">
          <div className="service-overlay">
            <h1 className="text-4xl font-bold">Our Designs</h1>
            <h4 className="text-xl mt-2">Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h4>
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
            {filteredDesigns.concat(adminCollections).map((design) => (
              <motion.div
                key={design._id || design.id} // Use MongoDB _id for key
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-200 flex flex-col items-center"
              >
                <img src={design.image} alt={design.name} className="w-full h-72 object-cover" />
                <div className="p-3 flex-grow flex flex-col justify-between items-center">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">{design.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{design.category}</p>
                  </div>
                  <button
                    className="mt-2 bg-brown-500 text-white py-2 px-10 rounded"
                    style={{ backgroundColor: '#804f0e' }}
                    onClick={() => addToCollection(design)}
                  >
                    Add to Collection
                  </button>
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
