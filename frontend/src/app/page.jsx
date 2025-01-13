import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/buttons/DefaultButton";
import { FaSearch, FaGlobe, FaLongArrowAltRight } from "react-icons/fa";

import MyBookingCard from "@/components/cards/MyBookingCard";
import RaqisCard from "@/components/cards/RaqisCard";

import Flower from "@/assets/svg/flower-right";
import FlowerLeft from "@/assets/svg/flower-left";

import First from "@/components/ui/home/First";
import Search from "@/components/ui/home/Search";
import Second from "@/components/ui/home/Second";
import Third from "@/components/ui/home/Third";
import Forth from "@/components/ui/home/Forth";

const sampledata = [
  {
    id: 1,
    name: "Raqi1",
    image: "https://s3-alpha-sig.figma.com/img/570b/fa64/c576670f6fc2491ee8b27ed25dfe6f6f?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FVPLxOlAZg~BigspbGx~9KX76Gpbf9I1sN2cAFowr~xo8q2eFmEUv3UB7Y15vMPXxC2BsuWJG3NrIg-O45GBz2bqQ9ornHnZ9acIBJmAdePb6aPJ7fhb5Oj9gd8yomi536AApiengbo5Wq29xs~QWYXjrbFqtM5-Rq5hafuh7FAYB2jTVv9aN2BHYjS1fA3jOh5MtP76ZKUPv0fUNNwG29hGVMuXxaXBfCdkILSlCS~zD5svOsIFjBvEpcsmaSsI2PbwiGfk3RRrq0nkF8VJMhnwBC6P8u9PhxCvRF7IbtaB-nALchVaCrIe93qkLKI0hlfVqENKeDXAjFdHkO~L3w__",
    Country: "Sri Lanka",
    CountryCode: "LK",
    bookedDate: "2025-02-12",
    Languages: ["English", "Arabic"],
    Experience: "5 years",
    bookedTime: "18:00",
    bookedDuration: 120,
    bookedPrice: "$14.00",
  },
  {
    id: 2,
    name: "Raqi2",
    image: "https://s3-alpha-sig.figma.com/img/5525/c092/e5de185ff00132edbf92293fcf654f47?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IzwyQg~Ec3mAeOznb0yL83OI0Bi5~bLxiyfKm8EUkgl4oijkqRVb0rLS9KG6yS4jgsoGrtaIQTFFPHHKVKbwnpk17Aw3fFjeBq3~ntboI800TEyyAxB2EgnckXplzzDfZ6XHrLbEEIVpvlR5o2Itl4~tc~zmkjz78eQzKw-5OUBtyE6e2fFIQdjNGOE748VBwJ1vWxd4aG7lOTMX1SuzjxC6o0R2c9aLu1hcblbrc-xjlqXqTiTEWEuYA61PhquGIHz4gZ7vWhkyF0xeDvXO~0PJ~rFAw-I2pIbsS6QS9MEuQ~kHGPoUkyJ0~unG4GXiijWWVZMsYLtrjjpat8v9dg__",
    bookedDate: "2025-01-13",
    bookedTime: "00:54",
    bookedDuration: 60,
    bookedPrice: "$14.00",
  },
  {
    id: 3,
    name: "Raqi3",
    Country: "United Kingdom",
    CountryCode: "GB",
    Languages: ["English", "Arabic"],
    Experience: "5 years",
    bookedDate: "2022-01-03",
    bookedTime: "14:00",
    bookedDuration: 30,
    bookedPrice: "$14.00",
  },
  {
    id: 4,
    name: "Raqi4",
    Country: "Country4",
    CountryCode: "C4",
    Languages: ["English", "Arabic"],
    Experience: "5 years",
    bookedDate: "2022-01-04",
    bookedTime: "15:00",
    bookedDuration: 360,
    bookedPrice: "$14.00",
  },
];

export default function Home() {
  return (
    <div className="bg-white font-fullsansbold color-header min-h-screen text-center md:text-left mb-20">
      <First />
      <div className="hidden lg:flex">
        <div className="absolute right-0 translate-y-0 translate-x-0">
          <Flower className="z-100 w-96 h-96 transition-transform duration-500 group-hover:rotate-180" />
        </div>
        <div className="absolute left-0 translate-y-0 translate-x-0">
          <FlowerLeft className="z-100 w-96 h-96 transition-transform duration-500 rotate-90" />
        </div>
      </div>
      <Search />
      <Second />
      <Third sampledata={sampledata} />
      <Forth sampledata={sampledata} />
    </div>
  );
}
