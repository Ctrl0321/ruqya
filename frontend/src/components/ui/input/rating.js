import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingInput = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  const handleRatingClick = (ratingValue) => {
    if (rating === ratingValue) {
      setRating(0); // Remove rating if the same star is clicked again
    } else {
      setRating(ratingValue);
    }
  };

  return (
    <div className="rating-input flex items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingClick(ratingValue)}
              className="hidden"
            />
            <FaStar
              size={24}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#FFFFeF"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <span className="ml-2 text-gray-600">{rating}</span>
    </div>
  );
};

export default RatingInput;
