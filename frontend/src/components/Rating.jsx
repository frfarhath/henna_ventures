// import React from 'react';

// const RatingReview = () => {
//   const reviews = [
//     {
//       name: 'Pytavi Umachandran',
//       rating: 5,
//       review: 'The bridal henna service was outstanding! The artist was incredibly talented and professional. The intricate designs were stunning and lasted for weeks. Highly recommend!',
//       avatar: 'https://via.placeholder.com/150',
//       date: '1 month ago',
//     },
//     {
//       name: 'Sarah Ghalib',
//       rating: 4,
//       review: 'Amazing service! The artist truly loves what they do and makes every client feel special. The attention to detail in the mehendi designs was impressive and beautifully done.',
//       avatar: 'https://via.placeholder.com/150',
//       date: '2 month ago',
//     },
//     {
//       name: 'Jasmine Nijjar',
//       rating: 5,
//       review: 'Exceptional experience! The mehendi artist was skilled and incorporated all of my ideas into a unique and beautiful design. The quality of the henna used was top-notch.',
//       avatar: 'https://via.placeholder.com/150',
//       date: '1 month ago',
//     },
//     {
//       name: 'Jaspreet Kalhar',
//       rating: 4,
//       review: 'Highly recommend this mehendi service! The artist was kind and professional, and the designs were incredibly intricate and beautiful. My bridal mehendi turned out perfect.',
//       avatar: 'https://via.placeholder.com/150',
//       date: '3  month ago',
//     },
//   ];


//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
//       <div className="text-center mb-8">
//         <img src="https://via.placeholder.com/150" alt="Henna by Divya" className="w-16 h-16 rounded-full mx-auto mb-2" />
//         <h3 className="text-xl font-semibold">Henna ventures</h3>
//         <span className="text-yellow-500 text-2xl">★★★★★</span>
//         <p className="text-gray-600">5.0 (based on 100 reviews)</p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//           >
//             <div className="flex flex-col items-center mb-4">
//               <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mb-2" />
//               <h4 className="text-blue-700 text-lg font-semibold">{review.name}</h4>
//               <span className="text-gray-500 text-sm">{review.date}</span>
//               <div className="text-yellow-500 text-lg mt-1">
//                 {Array(review.rating).fill('★').join('')}
//               </div>
//             </div>
//             <p className="text-gray-700 mb-2">{review.review}...</p>
//             <a href="#" className="text-blue-500 hover:underline">Read More</a>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-8">
//         <button className="bg-black text-white px-2 py-2 rounded-lg">See All Reviews</button>
//       </div>
//     </div>
//   );
// };

// export default RatingReview;
import React, { useEffect, useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
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
        <img src="https://via.placeholder.com/150" alt="Henna by Divya" className="w-16 h-16 rounded-full mx-auto mb-2" />
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
            <a href="#" className="text-blue-500 hover:underline">Read More</a>
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
