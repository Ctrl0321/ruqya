"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/ui/buttons/DefaultButton";
import SampleData from "@/data/sampledata.json";
import BookingCard from "@/components/cards/BookingCard";
import { ErrorMessage } from "@/components/shared/common/ErrorMessage";

const BookSessionPage = () => {
  const router = useRouter();
  const params = useParams();
  const Id = params.Id;
  const [selectedDate, setSelectedDate] = useState(null); // Changed from new Date() to null
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState(null);
  // const [sessionType, setSessionType] = useState("Standard");
  const [errors, setErrors] = useState({});
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const bookingRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (Id) {
      console.log("ID:", Id);
      const matchedData = SampleData.find((data) => data.id === Id);
      console.log("Matched Data:", matchedData);
      setBookingData(matchedData);
    }
  }, [Id]);

  useEffect(() => {
    // Clear error message after 3 seconds
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  // const handleSessionTypeChange = (event) => {
  //   setSessionType(event.target.value);
  // };

  const scrollToRef = (ref) => {
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const yOffset = -100; // Adjust this value to control the scroll position
        const element = ref.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedDate) {
      newErrors.date = "Date is required";
      setErrorMessage("Please select a date");
      setShowError(true);
      scrollToRef(dateRef);
      return false;
    }
    if (!selectedTime) {
      newErrors.time = "Time is required";
      setErrorMessage("Please select a time");
      setShowError(true);
      scrollToRef(timeRef);
      return false;
    }
    setErrors(newErrors);
    setShowError(false);
    return true;
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      // Handle booking logic here
      alert(`Booking session with Raqi ID: ${Id}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}`);
      setTimeout(() => scrollToRef(bookingRef), 100);
      console.log("Booking session with Raqi ID:", Id);
      console.log("Date:", selectedDate);
      console.log("Time:", selectedTime);
    }
  };

  const getUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
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
    <div className="mx-auto p-4 min-h-screen flex flex-col md:flex-row gap-5 relative">
      {showError && <div className="fixed top-0 left-0 right-0 z-50">
        <ErrorMessage message={errorMessage} />
      </div>}
      <div className="w-full border border-gray-300 rounded-lg shadow-lg p-4 order-2 md:order-1">
        <div className="mb-4 border-b pb-4">
          <h1 className="text-2xl font-bold ">Book Your Ruqyah Session</h1>
          <p>Choose your preferred date & time.</p>
        </div>
        <form className="space-y-4">
          {/* <div>
            <label className="block text-gray-700">Session Type</label>
            <select value={sessionType} onChange={handleSessionTypeChange} className="mt-3 p-3 block w-full bg-LightGray border border-gray-300 rounded-md shadow-sm focus:ring-RuqyaGreen focus:border-RuqyaGreen text-sm md:text-md appearance-none">
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div> */}
          <div ref={dateRef}>
            <label className="block text-gray-700">Select Date:</label>
            <div className="mt-1 flex gap-2 overflow-x-auto w-full">
              {getUpcomingDates().map((date, index) => (
                <div key={index} className={`p-3 border rounded-md cursor-pointer flex-1 text-center ${selectedDate && selectedDate.toDateString() === date.toDateString() ? "bg-RuqyaGreen text-white" : "bg-LightGray"}`} onClick={() => handleDateChange(date)}>
                  {date.getDate()} {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              ))}
            </div>
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>
          <div ref={timeRef}>
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
      <div className="w-full md:w-1/2 md:mx-5 order-1 md:order-2" ref={bookingRef}>
        <div className="border border-gray-300 rounded-lg shadow-lg p-4">
          <h3 className="border-b mb-3 pb-5 text-2xl">Summary</h3>
          {bookingData ? (
            <>
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
