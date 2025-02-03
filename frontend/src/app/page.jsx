'use client'
import { useState, useEffect } from "react";
import '@/styles/globals.css';
import {getRakis} from "@/lib/api"

import Flower from "@/assets/svg/flower-right";
import FlowerLeft from "@/assets/svg/flower-left";

import First from "@/components/ui/home/First";
import Search from "@/components/ui/home/Search";
import Second from "@/components/ui/home/Second";
import Third from "@/components/ui/home/Third";
import Forth from "@/components/ui/home/Forth";

import sampledata from "@/data/sampledata";
import LoadingSpinner from "@/components/shared/common/LoadingSpinner";


export default function Home() {
 
  const [raqiData, setRaqiData] = useState();

  useEffect(() => {
    async function fetchRakis() {
      const rakis = await getRakis();
      setRaqiData(rakis)
    }
    fetchRakis();
  }, []);

  if(!raqiData){
    <LoadingSpinner/>
  }

  if(raqiData == 0){
    return ("no data")
  }


  return (
    <div className="bg-white color-header min-h-screen text-center md:text-left">
      <First className="" />
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
      <Third raqiData={raqiData} />
      <Forth raqiData={raqiData} title="Meet Our Expert Raqis" />
    </div>
  );
}
