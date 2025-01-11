import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaSearch, FaGlobe } from "react-icons/fa";

import flower from "@/assets/svg/flower.svg";

export default function Home() {
  return (
    <div id="first" className="bg-white shadow-md p-1 font-fullsansbold color-header min-h-screen">
      <div className="bg-gradient-to-l from-[#E6E6FA33] to-[#E6E6FA] bg-[#FFFFFF] rounded-lg m-5 grid grid-cols-2 md:grid-cols-2">
        <div className="flex flex-col justify-center m-auto ">
          <h1 className="text-left text-7xl font-bold text-RuqyaGray leading-tight">
            <span className="text-RuqyaGreen">
              Empower Your
              <br />
              Spirit{" "}
            </span>
            with Ruqyah
          </h1>
          <p>Connect with expert Raqis for personalized spiritual healing and guidance.</p>
          <br />
          <div className="flex flex-row space-x-4">
            <Button text="Book a Session" color="RuqyaGreen" />
            <Button text="Learn Ruqah" color="" />
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg m-5 h-fit">
          <img src="https://s3-alpha-sig.figma.com/img/21e8/d68d/2d0409f669ab74439405dc891c9d6cc2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=goGhvxrpk5SqnO~BNDG58t8PFwztyQWXrH3fO7uudIStKQfiG4Wk-wv7qCh5CyqwPycZbTCM~Du5uoxBzs66E3lEY~ryDYuihqtfbagfiIh0g~xApdwOmp7jP1Z73rO~DHyEL9a8iH~~0~WVyEMburYg~I6xrrWoj0TapdkTF1OWiAFNfJhjc0ga~MZTrzgukvj3FW-V~iFJwTBQSm1sxpIktp-JC0WctX74UaEI2rpw6~zWhqvliPQ5-xCl8tSbg32h5U4-WbCk9Av8q~q2jBUDTEs1P3zh1V59S7Dh5so-HUOKkOFQw1BEqLnLNG2U8J3wgLurQGN2QACNXR3rpg__" alt="woman-meditation" className="rounded-lg h-fit max-w-full max-h-full" />
        </div>
      </div>

      <div id="search" className="flex p-3 -mt-9 flex-row w-2/3 m-auto font-sans bg-white rounded-lg shadow-lg">
        <div className="flex items-center w-3/5 h-full rounded-lg p-2 bg-white">
          <FaSearch className="fa-thin mr-2 text-gray-500" />
          <input type="text" placeholder="Search for Raqis, Ruqyah, or Symptoms" className="w-full focus:outline-none" />
        </div>
        <hr className="rounded-lg bg-gray-400 opacity-50 h-10 w-px rotate-95" />
        <div className="flex items-center w-2/5 h-full rounded-lg p-2 bg-white">
          <FaGlobe className="mr-2 text-gray-500" />
          <input type="text" placeholder="Language" className="w-full focus:outline-none" />
        </div>
        <Button text="Search" color="RuqyaGreen" />
      </div>

      <div id="second" className="mt-10">
        <h1 className="text-5xl font-bold text-RuqyaGray text-center leading-tight">
          Ruqyah is a <span className="text-RuqyaGreen"> spiritual healing</span> practice
          <br />
          involving sacred recitations.
        </h1>
        <p className="mt-5 text-center leading-relaxed">
          <Image src={flower} alt="flower" className="w-4 mb-3 inline" />
          Our platform offers access to expert Raqis and self-guided resources
          <Image src={flower} alt="flower" className="w-4 mb-3 inline" />
        </p>
        <h1 className="mt-5 text-3xl font-bold text-RuqyaGray text-center leading-relaxed">
          <span className="text-4xl"> $14.00/</span>booking
        </h1>
      </div>
    </div>
  );
}
