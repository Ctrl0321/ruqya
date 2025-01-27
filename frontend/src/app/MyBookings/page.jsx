"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import bookingsData from "@/data/sampledata.json";
import Grid from "@/components/ui/layout/Grid";
import Raqis from "@/components/cards/RaqisCard";

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
    <div className="min-h-screen text-black  mx-5 md:mx-10 mt-10 ">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <Grid>
        {bookings.map((booking, index) => (
          <Raqis key={index} raqi={booking} />
        ))}
      </Grid>
    </div>
  );
}

export default MyBookings;
