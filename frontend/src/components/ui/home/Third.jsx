'use client';
import React from "react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import MyBookingCard from "@/components/cards/MyBookingCard";
import ResponsiveGrid from "@/components/ui/layout/ResponsiveGrid";
import LoadingSpinner from "@/components/shared/common/LoadingSpinner";


function Third(props) {
  const { raqiData } = props;

  if (!raqiData) {
    return null;
  }

  return (
    <div id="third" className="bg-RuqyaLightPurple p-3 md:p-6 m-5 rounded-lg">
      <div className="grid grid-cols-1 m-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-RuqyaGray">My Bookings</h1>
          {raqiData.length > 3 && (
            <div className="text-center">
              <Link href="/MyBookings" className="text-RuqyaGreen font-bold">
                See all <FaLongArrowAltRight className="inline mb-1" />
              </Link>
            </div>
          )}
        </div>
        <ResponsiveGrid data={raqiData} breakpoints={{ mobile:3, ipad: 3, 'ipad-landscape': 3, lg:3, xl: 3, '2xl': 4, '3xl': 5, '4xl': 6, '5xl': 6 }}>
          {(data) => <MyBookingCard key={data._id} booking={data} />}
        </ResponsiveGrid>
      </div>
    </div>
  );
}

export default Third;
