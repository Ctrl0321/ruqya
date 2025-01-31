"use client";
import { useState } from "react";
import RaqiCard from "@/components/cards/CompletedMyBookingCard";
import RatingInput from "@/components/ui/input/rating";

function ReviewRaqiPopup(props) {
  const { raqiData = [], title } = props;
  const [rating, setRating] = useState(0);


  if (!raqiData) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg relative w-full max-w-3xl mx-4 md:mx-0 shadow-lg">
        <div className="bg-gray-200 p-4 flex justify-between rounded-t-lg items-center">
          <span className="text-gray-600 text-lg">Add Review</span>
          <div className="w-7 h-7 bg-red-600 rounded-sm flex items-center justify-center">
            <button onClick={handleClosePopup} className="text-white -mt-1 text-lg font-bold">
              &times;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <h3>Add a review on your session </h3>
                <RaqiCard raqiData={raqiData} />
            </div>
            <div><RatingInput rating={rating} setRating={setRating} /></div>
        </div>
        <div className="p-4">
          <h3>Add a Comment</h3>
          <textarea
            className="w-full h-32 border border-gray-300 rounded-lg p-4"
            placeholder="Write your review here"
          ></textarea>
        </div>
        <div className="p-4 flex justify-end">
          <button
            onClick={handleClosePopup}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleClosePopup}
            className="bg-green-600 text-white px-4 py-2 rounded-lg ml-4"
          >
            Submit
          </button>
          </div>

      </div>
    </div>
  );
}

export default ReviewRaqiPopup;
