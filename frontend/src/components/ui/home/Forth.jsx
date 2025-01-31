'use client'
import Link from "next/link";
import RaqisCard from "@/components/cards/RaqisCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import Grid from "@/components/ui/layout/Grid"; 
import ResponsiveGrid from "@/components/ui/layout/ResponsiveGrid";
import {isArray} from "node:util";

function Forth(props) {
    const { raqiData = [], title } = props;
    // const slice = raqiData?.slice(0, 4) || [];

  if (!raqiData) {
    return null;
  }

  return (
    <div id="Forth" className={`flex flex-col mx-7 md:mx-12 lg:mx-14 mt-20 m-5 rounded-lg ${[props.className]} `}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-RuqyaGray">{title}</h1>
        {raqiData.length > 3 && (
          <div className="text-center">
            <Link href="/BookRaqis" className="text-RuqyaGreen font-bold">
              See all <FaLongArrowAltRight className="inline mb-1" />
            </Link>
          </div>
        )}
      </div>

      {/* <Grid>
        {raqiData && slice.map((data) => (
          <RaqisCard key={data.id} raqi={data} />
        ))}
        </Grid> */}

      <ResponsiveGrid data={raqiData} breakpoints={{mobile:4, ipad: 3, 'ipad-landscape': 3, lg:3, xl: 4, '2xl': 4, '3xl': 5, '4xl': 6, '5xl': 6 }}>
          {(data) => <RaqisCard key={data.id} raqi={data} />}
        </ResponsiveGrid>
    </div>
  );
}

export default Forth;
