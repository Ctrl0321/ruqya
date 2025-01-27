"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import bookingsData from "@/data/sampledata.json";
import Grid from "@/components/ui/layout/GridForMyBooking";
import MyBookingCard from "@/components/cards/MyBookingCard";
import CompletedMyBookingCard from "@/components/cards/CompletedMyBookingCard";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(false);

  useEffect(() => {
    // Fetch bookings data (you can replace this with an API call)
    setBookings(bookingsData);
  }, []);

  const currentDate = new Date();

  const upcomingBookings = bookings.filter(booking => new Date(booking.bookedDate) >= currentDate);
  const completedBookings = bookings.filter(booking => new Date(booking.bookedDate) < currentDate);

  if (bookings.length === 0) {
    return <p className="min-h-screen text-black">No bookings found.</p>;
  }

  return (
    <div className="min-h-screen text-black mx-5 md:mx-10 mt-10 text-xs md:text-base">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="flex justify-start mb-6">
        <div className="bg-gray-200 p-2 rounded-lg flex">
          <button
            className={`px-4 py-2 mr-2 transition-colors duration-300 rounded-lg ${showUpcoming ? "bg-white text-black" : "bg-gray-200 text-black"}`}
            onClick={() => setShowUpcoming(true)}
          >
            Upcoming Sessions
          </button>
          <button
            className={`px-4 py-2 transition-colors duration-300 rounded-lg ${!showUpcoming ? "bg-white text-black" : "bg-gray-200 text-black"}`}
            onClick={() => setShowUpcoming(false)}
          >
            Completed Sessions
          </button>
        </div>
      </div>
      <Grid>
        {showUpcoming
          ? upcomingBookings.map((booking, index) => <MyBookingCard key={index} booking={booking} />)
          : completedBookings.map((booking, index) => <CompletedMyBookingCard key={index} booking={booking} />)}
      </Grid>
    </div>
  );
}

export default MyBookings;
