import Link from "next/link";
import RaqisCard from "@/components/cards/RaqisCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import Grid from "@/components/ui/layout/Grid"; 

function Forth(props) {
    const { sampledata } = props;
    const slice = sampledata.slice(0,4)

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

      <Grid>
        {sampledata && slice.map((data) => (
          <RaqisCard key={data.id} raqi={data} />
        ))}
      </Grid>
    </div>
  );
}

export default Forth;
