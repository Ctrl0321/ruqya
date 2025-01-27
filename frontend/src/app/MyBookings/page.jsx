"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// import bookingsData from "@/data/bookings.json"; // Assuming you have a bookings.json file with booking data

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data (you can replace this with an API call)
    setBookings(bookingsData);
  }, []);

  if (bookings.length === 0) {
    return <p className="min-h-screen text-black">No bookings found.</p>;
  }

  return (
    <div className="min-h-screen  text-black">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{booking.title}</h2>
            <p className="text-gray-600">{booking.date}</p>
            <p className="text-gray-600">{booking.time}</p>
            <Link href={`/bookings/${booking.id}`} className="text-blue-500 mt-2 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
