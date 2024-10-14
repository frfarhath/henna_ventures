import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loading from '../../components/User Dashboard/Loading';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react'; // Import the trash icon

const Card = ({ image, title, category, onRemove }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-200 flex flex-col items-center relative"
        >
            {!imageError ? (
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-72 object-cover"
                    onError={(e) => {
                        console.error('Image failed to load:', image);
                        setImageError(true);
                    }}
                />
            ) : (
                <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Image not available</p>
                </div>
            )}
            <div className="p-3 flex-grow flex flex-col justify-between items-center w-full">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{category}</p>
                </div>
                <button 
                    onClick={onRemove}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                    aria-label="Remove from collection"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </motion.div>
    );
};

const MyCollection = () => {
    const [fetchArray, setFetchArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8000/api/v1/individual/getCollection', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'json',
            });
            console.log('Fetched Data:', res.data);
            if (Array.isArray(res.data)) {
                setFetchArray(res.data);
            } else {
                console.error('Unexpected data format:', res.data);
                setError('Received unexpected data format from server');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching collection:', error.response || error);
            setError('Failed to load data. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderImage = (imagePath) => {
        if (!imagePath || imagePath.trim() === '') {
            console.log('No image path for item');
            return '/path/to/default/image.jpg'; // Replace with the path to your default image
        }
        return `http://localhost:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    const handleRemove = async (designId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8000/api/v1/individual/removeFromCollection/${designId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.status === 200) {
                console.log('Item removed successfully');
                fetchData(); // Refresh the collection
            } else {
                throw new Error('Failed to remove item');
            }
        } catch (error) {
            console.error('Error removing item from collection:', error);
            setError(error.response?.data?.message || 'Failed to remove item. Please try again.');
        }
  
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-[#804f0e] text-3xl font-bold mb-8">My Collection</h1>

            {loading && <Loading />}

            {!loading && error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && !error && fetchArray.length === 0 && (
                <p className="text-center text-gray-500">Your collection is empty.</p>
            )}

            {!loading && !error && fetchArray.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {fetchArray.map((design) => (
                        <Card 
                            key={design._id}
                            image={renderImage(design.image)} 
                            title={design.name || 'Untitled'}
                            category={design.category || 'Uncategorized'}
                            onRemove={() => handleRemove(design._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCollection;