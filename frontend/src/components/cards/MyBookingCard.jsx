import React from "react";
import { FaGlobe, FaCalendarAlt, FaClock } from 'react-icons/fa';

const MyBookingCard = ({ booking }) => {
  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours);
    endTime.setMinutes(minutes + parseInt(duration, 10));
    const endHours = endTime.getHours().toString().padStart(2, '0');
    const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
    return `${endHours}:${endMinutes}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 mb-4">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 rounded-lg">
          <img src={booking.image} alt={booking.name} className="rounded-lg w-36 h-24 object-cover object-top" />
        </div>
        <div className="col-span-3 flex flex-col">
          <h1 className="text-sm md:text-lg font-bold text-RuqyaGray leading-tight">
            <span className="text-RuqyaGreen">{booking.name}</span>
          </h1>
          <div className="mt-4 font-sans">
            {booking.Country && (
            <p className="text-gray-600 flex items-center">
              <FaGlobe className="mr-2" /> {booking.Country}
            </p>
            )}
            <p className="text-gray-600 flex items-center">
              <FaCalendarAlt className="mr-2" /> {booking.bookedDate} 
            </p>
            <p className="text-gray-600 flex items-center">
              <FaClock className="mr-2" /> {booking.bookedTime} - {calculateEndTime(booking.bookedTime, booking.bookedDuration)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
