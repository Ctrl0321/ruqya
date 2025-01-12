import React from "react";
import { FaGlobe, FaCalendarAlt, FaClock } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import Button from "@/components/ui/buttons/HomeButton";

const MyBookingCard = ({ booking }) => {
  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours);
    endTime.setMinutes(minutes + parseInt(duration, 10));
    const endHours = endTime.getHours().toString().padStart(2, "0");
    const endMinutes = endTime.getMinutes().toString().padStart(2, "0");
    return `${endHours}:${endMinutes}`;
  };

  const isSessionWithinOneHour = (bookedDate, bookedTime) => {
    const currentDate = new Date();
    const sessionDate = new Date(`${bookedDate}T${bookedTime}`);
    const timeDifference = sessionDate - currentDate;

    return timeDifference <= 3600000 && timeDifference > 0; // Time unlock the button 1 hour before the session
  };

  const isSessionActive = (bookedDate, bookedTime) => {
    const currentDate = new Date();
    const sessionDate = new Date(`${bookedDate}T${bookedTime}`);
    return currentDate >= sessionDate && currentDate <= new Date(sessionDate.getTime() + booking.bookedDuration * 60000);
  };

  const calculateTimeUntilSession = (bookedDate, bookedTime) => {
    const currentDate = new Date();
    const sessionDate = new Date(`${bookedDate}T${bookedTime}`);
    const timeDifference = sessionDate - currentDate;

    if (isSessionActive(bookedDate, bookedTime)) {
      return "Ongoing";
    }

    if (timeDifference <= 0) {
      return "Completed";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    let timeString = "";
    if (days > 0) timeString += `${days} Days `;
    if (hours > 0) timeString += `${hours} Hours `;
    if (minutes > 0) timeString += `${minutes} Mins `;
    timeString += "More...";

    return timeString;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 mb-4">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 rounded-lg">
          <img src={booking.image ? booking.image : "https://as2.ftcdn.net/v2/jpg/04/75/12/25/1000_F_475122535_WQkfB8bbLLu7pTanatEAIDt4ppIYgRb8.jpg"} alt={booking.name} className="rounded-lg w-36 h-24 object-cover object-top" />
        </div>

        <div className="col-span-3 flex flex-col">
          <h1 className="text-left text-sm md:text-lg font-bold text-RuqyaGray leading-tight">
            <span className="text-RuqyaGreen">{booking.name}</span>
          </h1>
          <div className="grid grid-rows-3 mt-1 font-sans">
            {booking.Country && (
              <p className="text-gray-600 flex items-center">
                {booking.CountryCode ? (
                  <ReactCountryFlag countryCode={booking.CountryCode} svg className="mr-2" />
                ) : (
                  <FaGlobe className="mr-2 text-RuqyaGreen" />
                )}
                {booking.Country}
              </p>
            )}
            <p className="text-gray-600 flex items-center">
              <FaCalendarAlt className="mr-2 text-RuqyaGreen" /> {booking.bookedDate}
            </p>
            <p className="text-gray-600 flex items-center">
              <FaClock className="mr-2 text-RuqyaGreen" /> {booking.bookedTime} - {calculateEndTime(booking.bookedTime, booking.bookedDuration)}
            </p>
          </div>
        </div>
        <div className="col-span-5 flex flex-row text-RuqyaGray mb-0 mt-auto">
          <p>{calculateTimeUntilSession(booking.bookedDate, booking.bookedTime)}</p>
        </div>
      </div>
      <Button text="Join Now" color="RuqyaGreen" bg={true} disabled={!isSessionWithinOneHour(booking.bookedDate, booking.bookedTime) && !isSessionActive(booking.bookedDate, booking.bookedTime)} />
    </div>
  );
};

export default MyBookingCard;
