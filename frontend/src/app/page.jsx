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

import sampledata from "@/data/sampledata";

export default function Home() {
  return (
    <div className="bg-white font-fullsansbold color-header min-h-screen text-center md:text-left mb-56">
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
