import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing close icon from react-icons
import mehendiImg1 from '../images/Products/mehendi1.jpg';
import mehendiImg2 from '../images/Products/mehendi2.jpg';
import mehendiImg3 from '../images/Products/mehendi3.jpg';
import NewNav from '../components/NewNav';
import Footer from '../components/Footer';

const foodItems = [
  { id: 1, name: 'Pizza', price: '$10.99', imageUrl: mehendiImg1 },
  { id: 2, name: 'Burger', price: '$10.99', imageUrl: mehendiImg2 },
  { id: 3, name: 'Pasta', price: '$10.99', imageUrl: mehendiImg3 },
  { id: 4, name: 'Pasta', price: '$10.99', imageUrl: mehendiImg3},
  // Add more items as needed
];

const FoodCard = ({ item }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  const handleQuickView = () => {
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <img src={item.imageUrl} alt={item.name} className="w-full h-38 object-cover rounded-md mb-2" />
        <h3 className="text-lg font-bold mb-1">{item.name}</h3>
        <p className="text-sm mb-2">{item.price}</p>
        <div className="flex justify-between">
          <button className="bg-orange-500 text-white py-2 px-3 rounded-lg">Add to Cart</button>
          <button onClick={handleQuickView} className="bg-orange-500 text-white py-1 px-2 rounded-lg">Quick View</button>
        </div>
      </div>

      {showQuickView && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-md mx-auto">
            <AiOutlineClose onClick={handleCloseQuickView} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
            <h3 className="text-lg font-bold mb-1">{item.name}</h3>
            <p className="text-sm mb-2">{item.price}</p>
            <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <p className="text-sm">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const AddToCart = () => {
  return (
    <div>
      <NewNav />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl text-center text-black mb-8">Our Crazy Foods</h1>
        <p className="text-center text-black mb-12">Elevate your dining experience with this exquisite creation that marries freshness and finesse on every plate</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddToCart;
