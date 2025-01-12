import React from 'react';

const MyBookingCard = ({ booking }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{booking.name}</h3>
                <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded">
                    Confirmed
                </span>
            </div>
            
            <div className="mt-4">
                <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {booking.bookedDate}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Time:</span> {booking.bookedTime}
                </p>
            </div>

            <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default MyBookingCard;