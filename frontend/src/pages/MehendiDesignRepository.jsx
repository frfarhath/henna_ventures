import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import NewNav from '../components/NewNav';
import Footer from "../components/Footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MehendiGallery = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [adminCollections, setAdminCollections] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

    const filteredDesigns = adminCollections.filter((design) =>
        (design.name.toLowerCase().includes(search.toLowerCase()) ||
            design.category.toLowerCase().includes(search.toLowerCase())) &&
        (category ? design.category === category : true)
    );

    const addToCollection = async (design) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Retrieved token:', token);

            if (!token) {
                alert('Please log in to add designs to your collection.');
                navigate('/signin');
                return;
            }

            console.log('Sending request with design ID:', design._id);
            const response = await axios.post('http://localhost:8000/api/v1/individual/addToCollection', 
                { designId: design._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Server response:', response.data);
            if (response.status === 200) {
                alert('Design added to your collection successfully!');
            }
        } catch (error) {
            console.error('Error adding design to collection:', error.response?.data || error.message);
            if (error.response && error.response.status === 401) {
                alert('Your session has expired. Please log in again.');
                navigate('/signin');
            } else {
                alert('Failed to add design to collection.');
            }
        }
    };

    const renderImage = (imagePath) => {
        if (!imagePath) {
            console.log('No image path for item');
            return '/path/to/default/image.jpg'; // Replace with the path to your default image
        }
        return `http://localhost:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    return (
        <div className="repo-page" style={{ backgroundColor: 'white' }}>
            <NewNav />
            <div className="services-page">
                <header className="service-header">
                    <div className="service-overlay">
                        <h1 className="text-4xl font-bold">Our Designs</h1>
                        <h4 className="text-xl mt-2">Embrace Moments with Henna Ventures, Ultimate Mehendi Destination!</h4>
                    </div>
                </header>
                <div className="container mx-auto px-4 py-8">
                    {/* Search and Filter Options */}
                    <div className="flex items-center mb-6 space-x-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search designs..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                            />
                            <FaSearch className="absolute top-2 right-4 text-gray-400" />
                        </div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        >
                            <option value="">All Categories</option>
                            <option value="Pakistani">Pakistani</option>
                            <option value="African">African</option>
                            <option value="Indo-Arabic">Indo-Arabic</option>
                            <option value="Moroccan">Moroccan</option>
                            <option value="Indian">Indian</option>
                            <option value="Western">Western</option>
                            <option value="Arabic">Arabic</option>
                            {/* Add more categories as needed */}
                        </select>
                    </div>

                    {/* Gallery Display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredDesigns.map((design) => (
                            <motion.div
                                key={design._id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-200 flex flex-col items-center"
                            >
                                <img
                                    src={renderImage(design.image)}
                                    alt={design.name}
                                    className="w-full h-72 object-cover"
                                    onError={(e) => {
                                        console.error('Image failed to load:', design.image);
                                        e.target.src = '/path/to/fallback/image.jpg';
                                    }}
                                />
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
            <Footer />
        </div>
    );
};

export default MehendiGallery;
