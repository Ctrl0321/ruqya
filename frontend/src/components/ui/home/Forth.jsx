import Link from "next/link";
import RaqisCard from "@/components/cards/RaqisCard";
import { FaLongArrowAltRight } from "react-icons/fa";

function Forth(props) {
    const { sampledata } = props;

  return (
    <div id="Forth" className="grid grid-cols-1 md:mx-24 mt-20 m-5 rounded-lg ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-RuqyaGray">Meet Our Expert Raqis</h1>
        {sampledata.length > 3 && (
          <div className="text-center">
            <Link href="/all-bookings" className="text-RuqyaGreen font-bold">
              See all <FaLongArrowAltRight className="inline mb-1" />
            </Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 mx-1">
      {sampledata && sampledata.map((data) => (
        <RaqisCard key={data.id} raqi={data} />
      ))}
      </div>
    </div>
  );
}

export default Forth;
