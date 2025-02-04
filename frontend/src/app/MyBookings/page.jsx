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

  const upcomingBookings = bookings.filter((booking) => parseBookingDate(booking.date) >= currentDate);
  const completedBookings = bookings.filter((booking) => parseBookingDate(booking.date) < currentDate);

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
      <Grid>
        {showUpcoming
          ? upcomingBookings.map((booking, index) => <MyBookingCard key={index} booking={booking} />)
          : completedBookings.map((booking, index) => (
              <CompletedMyBookingCard
                className="border drop-shadow-xl shadow-lg"
                key={index}
                booking={booking}
                show={true}
                onValueChange={handleValueChange}
              />
            ))}
      </Grid>
      {selectedBooking && <ReviewRaqiPopup raqiData={selectedBooking} onClose={handleClosePopup} />}
    </div>
  );
}

export default MyBookings;
