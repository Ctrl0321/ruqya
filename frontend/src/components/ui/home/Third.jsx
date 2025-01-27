'use client';
import React from "react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import MyBookingCard from "@/components/cards/MyBookingCard";
import ResponsiveGrid from "@/components/ui/layout/ResponsiveGrid";

function Third(props) {
  const { sampledata } = props;

  return (
    <div id="third" className="bg-RuqyaLightPurple p-3 md:p-6 m-5 rounded-lg">
      <div className="grid grid-cols-1 m-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-RuqyaGray">My Bookings</h1>
          {sampledata.length > 3 && (
            <div className="text-center">
              <Link href="/MyBookings" className="text-RuqyaGreen font-bold">
                See all <FaLongArrowAltRight className="inline mb-1" />
              </Link>
            </div>
          )}
        </div>
        <ResponsiveGrid data={sampledata} breakpoints={{ ipad: 3, 'ipad-landscape': 3, xl: 3, '2xl': 4, '3xl': 5, '4xl': 6, '5xl': 6 }}>
          {(data) => <MyBookingCard key={data.id} booking={data} />}
        </ResponsiveGrid>
      </div>
    </div>
  );
}

export default Third;
