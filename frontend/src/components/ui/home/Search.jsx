import { FaSearch, FaGlobe, FaLongArrowAltRight } from "react-icons/fa";
import Button from "@/components/ui/buttons/HomeButton";

function Search() {
  return (
    <div id="search" className="relative z-20 flex flex-col md:flex-row p-3 -mt-5 md:-mt-8 w-auto mx-5 md:mx-auto md:w-2/3 m-auto font-sans bg-white rounded-lg shadow-lg space-y-3 md:space-y-0 md:space-x-3">
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
  );
}

export default Search;
