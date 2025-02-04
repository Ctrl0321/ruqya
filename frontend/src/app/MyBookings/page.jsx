"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import bookingsData from "@/data/sampledata.json";
import Grid from "@/components/ui/layout/GridForMyBooking";
import MyBookingCard from "@/components/cards/MyBookingCard";
import CompletedMyBookingCard from "@/components/cards/CompletedMyBookingCard";
import ReviewRaqiPopup from "@/components/ui/popup/ReviewRaqiPopup";
import { getMyBookings } from "@/lib/api";
import { ErrorMessage } from "@/components/shared/common/ErrorMessage";
import { parseBookingDate } from "@/lib/utils";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setError("Failed to fetch bookings. Please try again later.");
      }
    };

    fetchBookings();
  }, []);

  const handleValueChange = (bookingId, meetingId) => {
    const booking = bookings.find((b) => b._id === bookingId && b.meetingId === meetingId);
    setSelectedBooking(booking);
  };

  const handleClosePopup = () => {
    setSelectedBooking(null);
  };

  const currentDate = new Date();
  const fourHoursInMs = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  const upcomingBookings = bookings.filter((booking) => {
    const bookingDate = parseBookingDate(booking.date);
    return bookingDate && (bookingDate.getTime() + fourHoursInMs >= currentDate.getTime());
  });

  const completedBookings = bookings.filter((booking) => {
    const bookingDate = parseBookingDate(booking.date);
    return bookingDate && (bookingDate.getTime() + fourHoursInMs < currentDate.getTime());
  });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (bookings.length === 0) {
    return <p className="min-h-screen text-black">No bookings found.</p>;
  }

  return (
    <div className="min-h-screen text-black mx-5 md:mx-10 mt-10 text-xs md:text-base">
      <nav aria-label="Breadcrumb m-10" className="mb-6">
        <ol className="flex items-center space-x-2 mt-5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/MyProfile" className="hover:text-primary underline">
              My Profile
            </Link>
          </li>
          <li>/</li>
          <li>My Booking</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="flex justify-start mb-6">
        <div className="bg-gray-200 p-2 rounded-lg flex">
          <button className={`px-4 py-2 mr-2 transition-colors duration-300 rounded-lg ${showUpcoming ? "bg-white text-black" : "bg-gray-200 text-black"}`} onClick={() => setShowUpcoming(true)}>
            Upcoming Sessions
          </button>
          <button className={`px-4 py-2 transition-colors duration-300 rounded-lg ${!showUpcoming ? "bg-white text-black" : "bg-gray-200 text-black"}`} onClick={() => setShowUpcoming(false)}>
            Completed Sessions
          </button>
        </div>
      </div>
      <Grid>{showUpcoming ? upcomingBookings.length > 0 ? upcomingBookings.map((booking, index) => <MyBookingCard key={index} booking={booking} />) : <p className="flex w-screen items-center justify-center text-center text-gray-500 font-xl mt-4">No upcoming bookings found.</p> : completedBookings.length > 0 ? completedBookings.map((booking, index) => <CompletedMyBookingCard className="border drop-shadow-xl shadow-lg" key={index} booking={booking} show={true} onValueChange={handleValueChange} />) : <p className="flex w-screen items-center justify-center text-center text-gray-500 font-xl mt-4">No completed bookings found.</p>}</Grid>
      {selectedBooking && <ReviewRaqiPopup raqiData={selectedBooking} onClose={handleClosePopup} />}
    </div>
  );
}

export default MyBookings;
