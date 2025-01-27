import React from "react";
import { FaGlobe, FaCalendarAlt, FaClock } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import Button from "@/components/ui/buttons/DefaultButton";

const BookingCard = ({ Booking }) => {
  if (!Booking) {
    return <p>No booking data available.</p>;
  }

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
    return currentDate >= sessionDate && currentDate <= new Date(sessionDate.getTime() + Booking.bookedDuration * 60000);
  };

  const calculateTimeUntilSession = (bookedDate, bookedTime) => {
    const currentDate = new Date();
    const sessionDate = new Date(`${bookedDate}T${bookedTime}`);
    const timeDifference = sessionDate - currentDate;

    if (isSessionActive(bookedDate, bookedTime)) {
      return "Ongoing";
    }

    if (timeDifference <= 0) {
      const completedDate = new Date(sessionDate.getTime() + Booking.bookedDuration * 60000);
      const daysSinceCompletion = Math.floor((currentDate - completedDate) / (1000 * 60 * 60 * 24));

      if (daysSinceCompletion < 7) {
        const dayOfWeek = completedDate.toLocaleDateString('en-US', { weekday: 'long' });
        return `Completed on Last ${dayOfWeek}`;
      } else {
        return `Completed on ${completedDate.toLocaleDateString()}`;
      }
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
    <div className="bg-white rounded-xl md:max-w-[450px] text-left">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 mb-2">
          <div className="col-span-3 rounded-lg">
            <img src={Booking.image ? Booking.image : "https://as2.ftcdn.net/v2/jpg/04/75/12/25/1000_F_475122535_WQkfB8bbLLu7pTanatEAIDt4ppIYgRb8.jpg"} alt={Booking.name} className="rounded-xl w-36 h-36 object-cover object-top" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-left text-sm md:text-lg text-RuqyaGray leading-tight" style={{ fontWeight: "900", color: "000000" }}>
              <span className="font-extrabold text-xl">{Booking.name}</span>
            </h1>
            <div className="flex flex-col mt-1">
              {Booking.Country && (
                <p className="text-gray-600 flex items-center my-0.5">
                  {Booking.CountryCode ? <ReactCountryFlag countryCode={Booking.CountryCode} svg className="mr-2" /> : <FaGlobe className="mr-2 text-RuqyaGreen" />}
                  {Booking.Country}
                </p>
              )}
              <p className="text-gray-600 flex items-center my-1 text-xs rounded-md">
                {Booking.Languages ? (
                  Booking.Languages.map((lang, index) => (
                    <span key={index} className="px-2 py-1 mr-1 bg-[#F4D6AA99] rounded-md">
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="px-4 py-1 bg-[#F4D6AA99] rounded-md">English</span>
                )}
              </p>
              <p className="text-gray-600 flex items-center my-1">
                <FaCalendarAlt className="mr-2 text-RuqyaGreen" /> {calculateTimeUntilSession(Booking.bookedDate, Booking.bookedTime)}
              </p>
              <p className="text-gray-600 flex items-center my-1">
                <FaClock className="mr-2 text-RuqyaGreen" /> {Booking.bookedTime}-{calculateEndTime(Booking.bookedTime, Booking.bookedDuration)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button text="Book a Session" color="RuqyaGreen" bg={true} className="rounded-xl" disabled={isSessionWithinOneHour(Booking.bookedDate, Booking.bookedTime) && isSessionActive(Booking.bookedDate, Booking.bookedTime)} />
    </div>
  );
};

export default BookingCard;
