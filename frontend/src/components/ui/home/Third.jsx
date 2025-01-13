import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import MyBookingCard from "@/components/cards/MyBookingCard";

function Third (props){
    const {sampledata} = props;
    const latestBookings = sampledata.slice(0, 3);
    
    return(
        <div id="third" className="grid grid-cols-1 mt-10 m-5 bg-[#E6E6FA] p-5 rounded-lg ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-RuqyaGray">My Bookings</h1>
          {sampledata.length > 3 && (
            <div className="text-center">
              <Link href="/all-bookings" className="text-RuqyaGreen font-bold">
                See all <FaLongArrowAltRight className="inline mb-1" />
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
          {latestBookings.map((data) => (
            <MyBookingCard key={data.id} booking={data} />
          ))}
        </div>
      </div>
    );
}

export default Third;