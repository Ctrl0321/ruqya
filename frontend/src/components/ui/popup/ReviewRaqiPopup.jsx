"use client";
import { useState } from "react";
import RaqiCard from "@/components/cards/CompletedMyBookingCard";
import RatingInput from "@/components/ui/input/rating";
import { addReviews } from "@/lib/api";
import { ErrorMessage } from "@/components/shared/common/ErrorMessage";

function ReviewRaqiPopup(props) {
  const { raqiData = [], title, onClose } = props;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [existingReview, setExistingReview] = useState(null);

  const handleClosePopup = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    try {
      await addReviews(raqiData.rakiId, raqiData.meetingId, rating, comment);
      handleClosePopup();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
        setExistingReview(error.response.data.existingReview);
      } else {
        setError(error.response.data.message);
      }
    }
  };

  if (!raqiData) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg relative w-full max-w-3xl mx-4 md:mx-0 shadow-lg">
        <div className="bg-gray-200 p-4 flex justify-between rounded-t-lg items-center">
          <span className="text-gray-600 text-xl font-bold ">Add Review</span>
          <div className="w-7 h-7 bg-red-600 rounded-sm flex items-center justify-center">
            <button onClick={handleClosePopup} className="text-white text-lg font-bold">
              &times;
            </button>
          </div>
        </div>
        <div className="px-3">
          {error && <ErrorMessage message={error} />}
          {existingReview && (
            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold">Existing Review</h3>
              <p><strong>Rating:</strong> {existingReview.points}</p>
              <p><strong>Comment:</strong> {existingReview.comment}</p>
            </div>
          )}
          <div className="flex flex-col md:flex-row ">
            <div className="md:w-2/3">
              <h3 className="text-md md:text-2xl my-2 ml-1 font-bold w-full">Add a review on your session </h3>
              <RaqiCard className=" border border-black h-auto" booking={raqiData} />
            </div>
            <div className="flex items-center justify-center md:w-1/2">
              <div className="flex flex-col items-center mb-5 font-extrabold gap-5">
                <h3 className="font-bold md:text-2xl text-lg">Add your Rating</h3>
                <RatingInput rating={rating} className="w-8 md:w-12 h-12 text-yellow-200" setRating={setRating} />
              </div>
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-md md:text-2xl mb-2 ml-1 font-bold">Add a Comment</h3>
            <textarea className="w-full h-32 border border-gray-300 rounded-lg p-4" placeholder="Write your review here" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </div>
          <div className="p-4 flex justify-end">
            <button onClick={handleClosePopup} className="bg-red-600 text-white px-4 py-2 rounded-lg">
              Close
            </button>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg ml-4">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewRaqiPopup;
