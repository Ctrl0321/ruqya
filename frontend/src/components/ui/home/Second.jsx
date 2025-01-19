import Image from "next/image";
import flower from "@/assets/svg/green-flower.svg";

function Second() {
  return (
    <div id="second" className="min-h-[20vh] mb-28 mt-28 m-5">
      <h1 className="text-3xl md:text-5xl font-bold text-RuqyaGray text-center leading-tight">
        Ruqyah is a <span className="text-RuqyaGreen"> spiritual healing</span> practice
        <br />
        involving sacred recitations.
      </h1>
      <p className="mt-5 text-sm md:text-base text-center font-fullsans leading-relaxed">
        <Image src={flower} alt="flower" className="w-6 mb-3 inline" />
        Our platform offers access to expert Raqis and self-guided resources
        <Image src={flower} alt="flower" className="w-6 mb-3 inline" />
      </p>
      <h1 className="mt-5 text-2xl md:text-3xl font-bold text-RuqyaGray text-center leading-relaxed">
        <span className="text-5xl"> $14.00/</span> booking
      </h1>
    </div>
  );
}

export default Second;
