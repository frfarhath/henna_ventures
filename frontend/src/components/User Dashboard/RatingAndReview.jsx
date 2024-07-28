import React, { useState, useEffect } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import Loading from '../../components/User Dashboard/Loading';


const RatingAndReview = () => {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [artist, setArtist] = useState('');

  const [fetchArray, setFetchArray] = useState([]);
  const [artistArray, setArtistArray] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await axios.get('http://localhost:8000/api/v1/individual/getRating');
        const resdata = await res.data;
        setFetchArray(resdata);

      } catch (error) {
        console.log('Main Error', error);
      }

    };
    fetchData();

    const fetchData2 = async () => {

      try {

        const res = await axios.get('http://localhost:8000/api/v1/individual/getArtist');
        const resdata = await res.data;
        setArtistArray(resdata);
        setLoading(false)

      } catch (error) {
        console.log('Main Error', error);
      }

    };
    fetchData2();

  }, []);


  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewTitle && reviewText) {
      const newReview = {
        id: Date.now(),
        title: reviewTitle,
        text: reviewText,
        rating: rating,
        date: new Date().toLocaleDateString(),
      };
      setReviews([...reviews, newReview]);
      setRating(0);
      setReviewTitle('');
      setReviewText('');
    }
  };

  const handleReviewDelete = async (id) => {

    try {

      const res = await axios.delete(`http://localhost:8000/api/v1/individual/deleteRate/${id}`);

      const resdata = await res.data;
      console.log(resdata);
      alert('Success ! Rate Deleting')
      window.location.reload();

    } catch (error) {
      console.log('Main Error', error);
      alert('Failed ! Rate Deleting')
      window.location.reload();
    }

  };

  const send = async (e) => {

    e.preventDefault();

    const currentDate = new Date();
    const formateDate = currentDate.toLocaleDateString();


    try {

      const postdata = {
        "username": "Fathima Samee",
        "rate": rating,
        "title": reviewTitle,
        "review": reviewText,
        "date": formateDate,
        "artist": artist
      };

      const res = await axios.post('http://localhost:8000/api/v1/individual/postRate', postdata, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const resdata = await res.data;
      console.log(resdata);
      alert('Success ! Rate Adding')
      window.location.reload();

    } catch (error) {
      console.log('Main Error', error);
      alert('Failed ! Rate Adding')
      window.location.reload();
    }

  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#804f0e] mb-4">Customer Reviews</h2>

      <form className="mb-6" onSubmit={handleReviewSubmit}>

        <div className="mb-4">
          <label className="block text-[#804f0e]">How do you rate this product?</label>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#804f0e]">Review Title:</label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]"
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#804f0e]">Review:</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-[#804f0e]">Artist:</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]"
            onChange={(e) => setArtist(e.target.value)} value={artist}>
            <option value="">-- Select Artist --</option>
            {artistArray.map((item, index) => (
              <option key={index} value={item.full_name}>{item.full_name}</option>
            ))}
          </select>
        </div>

        <button
          className="bg-[#804f0e] text-white py-2 px-4 rounded hover:bg-[#6d3d0b] transition duration-300"
          type="submit" onClick={send}>
          Submit Review
        </button>

      </form>

      {!loading && (
        <div>
          {fetchArray.map((review) => (

            <div key={review._id} className="p-4 mb-4 bg-white rounded shadow-md animate-fadeIn">
              <div className="flex justify-between items-center">

                <div>
                  <h1 style={{ fontWeight: 'bold', color: 'blue' }}>{review.username}</h1>
                  <h3 className="text-lg font-bold">Artist : {review.artist}</h3>

                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className={`${review.rate >= star ? 'text-yellow-500' : 'text-gray-400'}`} />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold">{review.title}</h3>
                  <p>{review.review}</p>
                  <small className="text-gray-500">{review.date}</small>
                </div>

                <button onClick={() => handleReviewDelete(review._id)} className="text-red-600 hover:text-red-800">
                  <FaTrashAlt />
                </button>

              </div>
            </div>

          ))}
        </div>
      )}

      {loading && (
        <Loading />
      )}

    </div>
  );


};

export default RatingAndReview;
