"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/ui/buttons/DefaultButton";
import SampleData from "@/data/sampledata.json";
import BookingCard from "@/components/cards/BookingCard";
import { ErrorMessage } from "@/components/shared/common/ErrorMessage";
import GridForRaqiBooking from "@/components/ui/layout/GridForRaqiBooking";

const BookSessionPage = () => {
  const router = useRouter();
  const params = useParams();
  const Id = params.Id;
  const [selectedDate, setSelectedDate] = useState(null); // Changed from new Date() to null
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [errors, setErrors] = useState({});
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const bookingRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

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

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 h-0.5 w-full bg-gray-200 -z-10"></div>
        {[...Array(totalSteps)].map((_, index) => (
          <div 
            key={index} 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step > index + 1 
                ? "bg-RuqyaGreen text-white" 
                : step === index + 1 
                ? "bg-RuqyaGreen text-white" 
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  };

  const handleNext = () => {
    if (step === 1 && !selectedDate) {
      setErrorMessage("Please select a date");
      setShowError(true);
      return;
    }
    if (step === 2 && !selectedTime) {
      setErrorMessage("Please select a time");
      setShowError(true);
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div ref={dateRef}>
            <h2 className="text-xl font-semibold mb-4">Select Date</h2>
            <GridForRaqiBooking minWidth="120px">
              {getUpcomingDates().map((date, index) => (
                <div 
                  key={index} 
                  className={`p-3 border rounded-md cursor-pointer text-center 
                    ${selectedDate && selectedDate.toDateString() === date.toDateString() 
                      ? "bg-RuqyaGreen text-white" 
                      : "bg-LightGray hover:bg-gray-200"}`} 
                  onClick={() => handleDateChange(date)}
                >
                  {date.getDate()} {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              ))}
            </GridForRaqiBooking>
          </div>
        );
      case 2:
        return (
          <div ref={timeRef}>
            <h2 className="text-xl font-semibold mb-4">Select Time</h2>
            <GridForRaqiBooking minWidth="100px">
              {getAvailableTimes().map((time, index) => (
                <div 
                  key={index} 
                  className={`p-3 border rounded-md cursor-pointer text-center 
                    ${selectedTime === time 
                      ? "bg-RuqyaGreen text-white" 
                      : "bg-LightGray hover:bg-gray-200"}`} 
                  onClick={() => handleTimeChange({ target: { value: time } })}
                >
                  {time}
                </div>
              ))}
            </GridForRaqiBooking>
          </div>
        );
      case 3:
        return (
          <div ref={bookingRef}>
            <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
            {bookingData && (
              <div className="space-y-4">
                <BookingCard Booking={bookingData} />
                <div className="border-t pt-4">
                  <p className="font-semibold">Selected Date & Time:</p>
                  <p>{selectedDate?.toDateString()} at {selectedTime}</p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-4 min-h-screen max-w-4xl">
      {showError && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      
      <div className="border border-gray-300 rounded-lg shadow-lg p-6">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">Book Your Ruqyah Session</h1>
          <p className="text-gray-600">Complete the steps below to book your session.</p>
        </div>

        {renderStepIndicator()}
        
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <button
            onClick={handleBack}
            className={`px-6 py-2 rounded-lg ${
              step === 1 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            disabled={step === 1}
          >
            Back
          </button>
          {step === totalSteps ? (
            <Button
              text="Confirm Booking"
              color="RuqyaGreen"
              bg={true}
              className="rounded-lg"
              onClick={handleButtonClick}
            />
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-RuqyaGreen text-white hover:bg-opacity-90"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSessionPage;
