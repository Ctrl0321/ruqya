import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaSearch, FaGlobe, FaLongArrowAltRight } from "react-icons/fa";

import flower from "@/assets/svg/flower.svg";

import MyBookingCard from "@/components/cards/MyBookingCard";
import RaqisCard from "@/components/cards/RaqisCard";

const sampledata = [
  {
    id: 1,
    name: "Raqi1",
    image: "https://s3-alpha-sig.figma.com/img/570b/fa64/c576670f6fc2491ee8b27ed25dfe6f6f?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FVPLxOlAZg~BigspbGx~9KX76Gpbf9I1sN2cAFowr~xo8q2eFmEUv3UB7Y15vMPXxC2BsuWJG3NrIg-O45GBz2bqQ9ornHnZ9acIBJmAdePb6aPJ7fhb5Oj9gd8yomi536AApiengbo5Wq29xs~QWYXjrbFqtM5-Rq5hafuh7FAYB2jTVv9aN2BHYjS1fA3jOh5MtP76ZKUPv0fUNNwG29hGVMuXxaXBfCdkILSlCS~zD5svOsIFjBvEpcsmaSsI2PbwiGfk3RRrq0nkF8VJMhnwBC6P8u9PhxCvRF7IbtaB-nALchVaCrIe93qkLKI0hlfVqENKeDXAjFdHkO~L3w__",
    Country: "Sri Lanka",
    CountryCode: "LK",
    bookedDate: "2025-01-12",
    bookedTime: "18:00",
    bookedDuration: 120,
    bookedPrice: "$14.00",
  },
  {
    id: 2,
    name: "Raqi2",
    image: "https://s3-alpha-sig.figma.com/img/5525/c092/e5de185ff00132edbf92293fcf654f47?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IzwyQg~Ec3mAeOznb0yL83OI0Bi5~bLxiyfKm8EUkgl4oijkqRVb0rLS9KG6yS4jgsoGrtaIQTFFPHHKVKbwnpk17Aw3fFjeBq3~ntboI800TEyyAxB2EgnckXplzzDfZ6XHrLbEEIVpvlR5o2Itl4~tc~zmkjz78eQzKw-5OUBtyE6e2fFIQdjNGOE748VBwJ1vWxd4aG7lOTMX1SuzjxC6o0R2c9aLu1hcblbrc-xjlqXqTiTEWEuYA61PhquGIHz4gZ7vWhkyF0xeDvXO~0PJ~rFAw-I2pIbsS6QS9MEuQ~kHGPoUkyJ0~unG4GXiijWWVZMsYLtrjjpat8v9dg__",
    bookedDate: "2025-01-12",
    bookedTime: "19:15",
    bookedDuration: 60,
    bookedPrice: "$14.00",
  },
  {
    id: 3,
    name: "Raqi3",
    Country: "United Kingdom",
    CountryCode: "GB",
    bookedDate: "2022-01-03",
    bookedTime: "14:00",
    bookedDuration: 30,
    bookedPrice: "$14.00",
  },
  {
    id: 4,
    name: "Raqi4",
    Country: "Country4",
    bookedDate: "2022-01-04",
    bookedTime: "15:00",
    bookedDuration: 360,
    bookedPrice: "$14.00",
  },
];

export default function Home() {
  const latestBookings = sampledata.slice(0, 3);

  return (
    <div id="first" className="bg-white shadow-md p-1 font-fullsansbold color-header min-h-screen text-center md:text-left">
      <div className="bg-gradient-to-l from-[#E6E6FA33] to-[#E6E6FA] bg-[#FFFFFF] rounded-lg m-5 grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg m-5 order-1 md:order-2">
          <img src="https://s3-alpha-sig.figma.com/img/21e8/d68d/2d0409f669ab74439405dc891c9d6cc2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=goGhvxrpk5SqnO~BNDG58t8PFwztyQWXrH3fO7uudIStKQfiG4Wk-wv7qCh5CyqwPycZbTCM~Du5uoxBzs66E3lEY~ryDYuihqtfbagfiIh0g~xApdwOmp7jP1Z73rO~DHyEL9a8iH~~0~WVyEMburYg~I6xrrWoj0TapdkTF1OWiAFNfJhjc0ga~MZTrzgukvj3FW-V~iFJwTBQSm1sxpIktp-JC0WctX74UaEI2rpw6~zWhqvliPQ5-xCl8tSbg32h5U4-WbCk9Av8q~q2jBUDTEs1P3zh1V59S7Dh5so-HUOKkOFQw1BEqLnLNG2U8J3wgLurQGN2QACNXR3rpg__" alt="woman-meditation" className="rounded-lg  w-auto" />
        </div>
        <div className="flex flex-col justify-center m-auto order-2 md:order-1">
          <h1 className="text-4xl md:text-7xl font-bold text-RuqyaGray leading-tight">
            <span className="text-RuqyaGreen">
              Empower Your
              <br />
              Spirit
            </span>{" "}
            with Ruqyah
          </h1>
          <p className="text-sm m-3 md:text-base">Connect with expert Raqis for personalized spiritual healing and guidance.</p>
          <br />
          <div className="flex flex-row justify-center md:justify-start mb-10 space-x-4">
            <Button text="Book a Session" color="RuqyaGreen" bg={true} />
            <Button text="Learn Ruqah" />
          </div>
        </div>
      </div>

      <div id="search" className="flex flex-col md:flex-row p-3 md:-mt-9 w-auto mx-5 md:mx-auto md:w-2/3 m-auto font-sans bg-white rounded-lg shadow-lg space-y-3 md:space-y-0 md:space-x-3">
        <div className="flex items-center w-full md:w-3/5 h-full p-1 rounded-lg bg-white">
          <FaSearch className="fa-thin mr-2 text-gray-500" />
          <input type="text" placeholder="Search for Raqis, Ruqyah, or Symptoms" className="w-full focus:outline-none" />
        </div>
        <hr className="rounded-lg bg-gray-400 opacity-50 h-8 w-px rotate-95 hidden md:block" />
        <div className="flex items-center w-full md:w-2/5 h-full p-1 rounded-lg bg-white">
          <FaGlobe className="mr-2 text-gray-500" />
          <input type="text" placeholder="Language" className="w-full focus:outline-none" />
        </div>
        <Button text="Search" color="RuqyaGreen" bg="true" />
      </div>

      <div id="second" className="mt-10">
        <h1 className="text-3xl md:text-5xl font-bold text-RuqyaGray text-center leading-tight">
          Ruqyah is a <span className="text-RuqyaGreen"> spiritual healing</span> practice
          <br />
          involving sacred recitations.
        </h1>
        <p className="mt-5 text-sm md:text-base text-center leading-relaxed">
          <Image src={flower} alt="flower" className="w-4 mb-3 inline" />
          Our platform offers access to expert Raqis and self-guided resources
          <Image src={flower} alt="flower" className="w-4 mb-3 inline" />
        </p>
        <h1 className="mt-5 text-2xl md:text-3xl font-bold text-RuqyaGray text-center leading-relaxed">
          <span className="text-4xl"> $14.00</span> /booking
        </h1>
      </div>
      <div id="third" className="grid grid-cols-1 mt-10 m-5 bg-[#E6E6FA] p-5 rounded-lg ">
        <div className="flex justify-between items-center mx-5">
          <h1 className="text-2xl font-bold text-RuqyaGray">My Bookings</h1>
          {sampledata.length > 3 && (
            <div className="text-center">
              <Link href="/all-bookings" className="text-RuqyaGreen font-bold">
                See all <FaLongArrowAltRight className="inline mb-1" />
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {latestBookings.map((data) => (
            <MyBookingCard key={data.id} booking={data} />
          ))}
        </div>
      </div>

      <div id="third" className="grid grid-cols-1 mt-10 m-5 bg-[#E6E6FA] p-5 rounded-lg ">
        <div className="flex justify-between items-center mx-5">
          <h1 className="text-2xl font-bold text-RuqyaGray">My Bookings</h1>
          {sampledata.length > 3 && (
            <div className="text-center">
              <Link href="/all-bookings" className="text-RuqyaGreen font-bold">
                See all <FaLongArrowAltRight className="inline mb-1" />
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <RaqisCard data={sampledata[1].image} />
          <RaqisCard data={sampledata[1].image} />
        </div>
      </div>
    </div>
  );
}
