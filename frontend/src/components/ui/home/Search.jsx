import { FaSearch, FaGlobe, FaLongArrowAltRight } from "react-icons/fa";
import Button from "@/components/ui/buttons/DefaultButton";
import Input from "@/components/ui/dump/input";
import {SearchNormal1, Translate} from "iconsax-react";

function Search() {
  return (
    <div id="search" className="relative z-20 flex justify-center items-center flex-row md:flex-row px-3 py-2 -mt-7 md:-mt-8 w-auto mx-5 md:mx-auto md:w-2/3 m-auto  bg-white rounded-xl shadow-xl  md:space-y-0 md:space-x-3">
      <div className="flex items-center justify-center w-full md:w-3/5 h-full p-1 rounded-lg bg-white">
        {/*<FaSearch size={20} className="fa-thin mr-2 text-gray-500" />*/}
          <SearchNormal1
              className="fa-thin mr-2 text-gray-500"
              size="27"
              color="#36454F"
          />
          <Input type="text" placeholder="Find Raqi" className="block w-full lg:hidden" />
          <Input type="text" placeholder="Search for Raqis, Ruqyah, or Symptoms" className="hidden w-full lg:block" />
   </div>
      <hr className="rounded-lg bg-gray-400 opacity-50 h-8 w-px rotate-95 hidden md:block" />
      <div className="md:flex items-center justify-center w-full hidden md:w-1/3 h-full p-1 rounded-lg bg-white">
        {/*<FaGlobe className="mr-2 text-gray-500" />*/}
          <Translate
              className="fa-thin mr-2 text-gray-500"
              size="27"
              color="#36454F"
          />
        <Input type="text" placeholder="Language" />
      </div>
      <div className="flex items-center justify-center -mt-13">
      <Button text="Search" color="RuqyaGreen" bg="true" className={"w-32 md:w-40 md:h-10 bg-RuqyaGreen rounded-lg md:mt-0"} />
      </div>
    </div>
  );
}

export default Search;
