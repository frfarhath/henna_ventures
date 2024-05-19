import React from 'react';

const RatingReview = () => {
  const reviews = [
    {
      name: 'Pytavi Umachandran',
      rating: 5,
      review: 'Divya was my bridal henna artist and she was amazing!! She is incredibly talented (her work speaks for itself!) and so',
      avatar: 'https://via.placeholder.com/150',
      date: '5 years ago',
    },
    {
      name: 'Sarah Ghalib',
      rating: 5,
      review: 'Divya is an extremely talented individual who truly loves what she does! She makes every bride feel special and gives',
      avatar: 'https://via.placeholder.com/150',
      date: '5 years ago',
    },
    {
      name: 'Jasmine Nijjar',
      rating: 5,
      review: 'Divya is incredibly talented, smart, sweet and professional. She incorporated all of my ideas into a unique design that',
      avatar: 'https://via.placeholder.com/150',
      date: '5 years ago',
    },
    {
      name: 'Jaspreet Kalhar',
      rating: 5,
      review: 'I wish I could give Divya more than 5 stars! Divya is the kindest and sweetest vendor, not to mention her incredible',
      avatar: 'https://via.placeholder.com/150',
      date: '5 years ago',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
      <div className="text-center mb-8">
        <img src="https://via.placeholder.com/150" alt="Henna by Divya" className="w-16 h-16 rounded-full mx-auto mb-2" />
        <h3 className="text-xl font-semibold">Henna ventures</h3>
        <span className="text-yellow-500 text-2xl">★★★★★</span>
        <p className="text-gray-600">5.0 (based on 100 reviews)</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center mb-4">
              <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mb-2" />
              <h3 className="text-blue-700 text-lg font-semibold">{review.name}</h3>
              <span className="text-gray-500 text-sm">{review.date}</span>
              <div className="text-yellow-500 text-lg mt-1">
                {Array(review.rating).fill('★').join('')}
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
