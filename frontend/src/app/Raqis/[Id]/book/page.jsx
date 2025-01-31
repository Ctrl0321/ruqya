"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/ui/buttons/DefaultButton";
import SampleData from "@/data/sampledata.json";
import BookingCard from "@/components/cards/BookingCard";

const BookSessionPage = () => {
  const router = useRouter();
  const params = useParams();
  const Id = params.Id;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [sessionType, setSessionType] = useState("Standard");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Id) {
      console.log("ID:", Id);
      const matchedData = SampleData.find((data) => data.id === Id);
      console.log("Matched Data:", matchedData);
      setBookingData(matchedData);
    }
  }, [Id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSessionTypeChange = (event) => {
    setSessionType(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedDate) newErrors.date = "Date is required";
    if (!selectedTime) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      // Handle booking logic here
      alert(`Booking session with Raqi ID: ${Id}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}`);
      console.log("Booking session with Raqi ID:", Id);
      console.log("Date:", selectedDate);
      console.log("Time:", selectedTime);
    } else {
      if (errors.date) alert(errors.date);
      if (errors.time) alert(errors.time);
    }
  };

  const getUpcomingDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getAvailableTimes = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i < 12 ? "AM" : "PM";
      const time = `${hour.toString().padStart(2, "0")}:00 ${period}`;
      times.push(time);
    }
    return times;
  };

  return (
    <div className="mx-auto p-4 min-h-screen flex">
      <div className="w-full border border-gray-300 rounded-lg shadow-lg p-4">
        <div className="mb-4 border-b pb-4">
          <h1 className="text-2xl font-bold ">Book Your Ruqyah Session</h1>
          <p>Choose your session type and preferred date & time.</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Session Type</label>
            <select value={sessionType} onChange={handleSessionTypeChange} className="mt-3 p-3 block w-full bg-LightGray border border-gray-300 rounded-md shadow-sm focus:ring-RuqyaGreen focus:border-RuqyaGreen sm:text-sm appearance-none">
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Select Date:</label>
            <div className="mt-1 flex gap-2 overflow-x-auto w-full">
              {getUpcomingDates().map((date, index) => (
                <div key={index} className={`p-3 border rounded-md cursor-pointer flex-1 text-center ${selectedDate.toDateString() === date.toDateString() ? "bg-RuqyaGreen text-white" : "bg-LightGray"}`} onClick={() => handleDateChange(date)}>
                  {date.getDate()} {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              ))}
            </div>
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Select Time:</label>
            <div className="mt-1 grid grid-cols-4 gap-2">
              {getAvailableTimes().map((time, index) => (
                <div key={index} className={`p-3 border rounded-md cursor-pointer text-center ${selectedTime === time ? "bg-RuqyaGreen text-white" : "bg-LightGray"}`} onClick={() => handleTimeChange({ target: { value: time } })}>
                  {time}
                </div>
              ))}
            </div>
            {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
          </div>
        </form>
      </div>
      <div className="w-1/2 mx-5">
        <div className="border border-gray-300 rounded-lg shadow-lg p-4">
          <h3 className="border-b mb-3 pb-5 text-2xl">Summary</h3>
          {bookingData ? (
            <>
              {" "}
              <BookingCard Booking={bookingData} />
              <Button text="Book a Session" color="RuqyaGreen" bg={true} className="rounded-xl mt-4" onClick={handleButtonClick} />
            </>
          ) : (
            <p>No booking data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSessionPage;
