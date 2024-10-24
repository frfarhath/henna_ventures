import React, { useEffect, useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import logo_png from '../images/logo_trans.png'
const RatingReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/individual/getAllRatings')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
      <div className="text-center mb-8">
        <img src={logo_png} alt="Henna by Divya" className="w-16 h-16 rounded-full mx-auto mb-2" />
        <h3 className="text-xl font-semibold">Henna Ventures</h3>
        {/* <span className="text-yellow-500 text-2xl">★★★★★</span>
        <p className="text-gray-600">5.0 (based on 100 reviews)</p> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center mb-4">
              <img src={review.profileImage} alt={review.name} className="w-12 h-12 rounded-full mb-2" />
              <h4 className="text-blue-700 text-lg font-semibold">{review.username}</h4>
              <span className="text-gray-500 text-sm">{review.date}</span>
              <h3 className="text-sm font-bold mb-2">Artist : {review.artist}</h3>
              <div className="flex items-center">
                {/* {Array(review.rate).fill('★').join('')} */}
                {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className={`${review.rate >= star ? 'text-yellow-500' : 'text-gray-400'}`} />
                    ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.review}...</p>
            {/* <a href="#" className="text-blue-500 hover:underline">Read More</a> */}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-black text-white px-2 py-2 rounded-lg">See All Reviews</button>
      </div>
    </div>
  );
};

export default RatingReview;
