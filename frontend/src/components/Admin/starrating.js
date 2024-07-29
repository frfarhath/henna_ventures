import React, { useState } from "react";

const StarRating = ({ totalStars = 5 }) => {

    const [rating, setRating] = useState(0);

    const handleClick = (index) => {
        setRating(index + 1);
    };

    return (
        <div>
            {[...Array(totalStars)].map((star, index) => (
                <Star
                key={index}
                index={index}
                rating={rating}
                handleClick={handleClick}
                />
            ))}
        </div>
    );
};

const Star = ({ index, rating, handleClick}) => {

    return (
        <span style={{cursor:'pointer', color: index < rating ? 'gold':'gray', fontSize: 40, marginRight: 5}} onClick={() => handleClick(index)}>
            &#9733;
        </span>
    );
};

export default StarRating;