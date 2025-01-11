import Image from "next/image";
import Link from "next/link";
import BookSessionButton from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="bg-white shadow-md p-1 font-fullsansbold color-header min-h-screen">
      <div className="bg-gradient-to-l from-[#E6E6FA33] to-[#E6E6FA] bg-[#FFFFFF] rounded-lg m-5 grid grid-cols-2 md:grid-cols-2">
        <div className="flex flex-col justify-center m-auto ">
          <h1 className="text-left text-7xl font-bold text-RuqyaGray ">
            <span className="text-RuqyaGreen">
              Empower Your
              <br />
              Spirit {" "}
            </span>
            with Ruqyah
          </h1>
          <p>Connect with expert Raqis for personalized spiritual healing and guidance.</p>
          <br />
          <div className="flex flex-row space-between justify-center m-auto">
            <BookSessionButton text="Book a Session" color="RuqyaGreen" arrow="true" />
          </div>
        </div>

        <div className="flex items-center justify-center rounded-lg m-5 h-fit">
          <img src="https://s3-alpha-sig.figma.com/img/387f/dc11/38d81891e925edf4b886347da7948784?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bKkHA5QwyfNxwKqY5G5Fp5tl40iGF3BLpFBSZ6gDoJJ~WG9BYncbDyu1FotaV0g4qgbvkas8mwdrLbZk~gsAY5nTDFwTyuz6Al-L5hWHA-JjoUO9TFKY2QwOSsQQ69aVxtBbWGTMOG3EotM55nMsxNLTDDdIJAu0o2YSq1B4LIX17yM7TBqSFJlNuNRV-XJs1rOMorssbmO8DAiGG7hizJr12eQWd-4ncQU0CWYc5GJ4Atel-x9x5czLndbwB37Ka9xlPrIrmukUwcN-93f1~ZwC74h5a7povF7MfDSZf1MRKxfA0QNmL~cYKKCFyQkN1cyW~-ML8~CBtgas4yS4nA__" alt="woman-meditation" className="rounded-lg h-fit max-w-full max-h-full" />
        </div>
      </div>
    </div>
  );
}
