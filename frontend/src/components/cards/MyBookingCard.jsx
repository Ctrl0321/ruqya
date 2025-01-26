import React from "react";
import { FaGlobe, FaCalendarAlt, FaClock } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import Button from "@/components/ui/buttons/DefaultButton";

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
    <div className="bg-white rounded-xl md:max-w-[450px] text-left shadow-md p-4 mb-4 ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="col-span-2 rounded-lg">
            <img src={booking.image ? booking.image : "https://as2.ftcdn.net/v2/jpg/04/75/12/25/1000_F_475122535_WQkfB8bbLLu7pTanatEAIDt4ppIYgRb8.jpg"} alt={booking.name} className="rounded-xl w-28 h-28 object-cover object-top" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-left text-sm md:text-lg text-RuqyaGray leading-tight" style={{fontWeight:"900",color:"000000"}}>
              <span className="font-extrabold text-xl">{booking.name}</span>
            </h1>
            <div className="grid grid-rows-3 mt-1">
              {booking.Country && (
                <p className="text-gray-600 flex items-center my-1">
                  {booking.CountryCode ? <ReactCountryFlag countryCode={booking.CountryCode} svg className="mr-2" /> : <FaGlobe className="mr-2 text-RuqyaGreen" />}
                  {booking.Country}
                </p>
              )}
              <p className="text-gray-600 flex items-center my-1">
                <FaCalendarAlt className="mr-2 text-RuqyaGreen" /> {booking.bookedDate}
              </p>
              <p className="text-gray-600 flex items-center my-1">
                <FaClock className="mr-2 text-RuqyaGreen" /> {booking.bookedTime} - {calculateEndTime(booking.bookedTime, booking.bookedDuration)}
              </p>
            </div>
          </div>
        </div>
        <div className="text-RuqyaGray text-left mb-2 mr-5 mt-auto">
          <p>{calculateTimeUntilSession(booking.bookedDate, booking.bookedTime)}</p>
        </div>
      </div>
      <Button text="Join Now" color="RuqyaGreen" bg={true} className="rounded-xl" disabled={!isSessionWithinOneHour(booking.bookedDate, booking.bookedTime) && !isSessionActive(booking.bookedDate, booking.bookedTime)} />
    </div>
  );
};

export default MyBookingCard;
