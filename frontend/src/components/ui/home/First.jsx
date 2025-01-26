import Button from "@/components/ui/buttons/DefaultButton";import Image from "next/image";


function First() {
  return (
    <>
      <div id="first" className="flex flex-col items-center justify-center bg-gradient-to-l from-[rgba(230,230,250,0.2)] to-RuqyaLightPurple bg-white min-h-60vh md:min-h-80vh">
        <div className="flex flex-col items-center justify-center md:flex-row  md:space-x-10 mx-5 w-full md:mx-40">
          <div className="flex items-center justify-center rounded-lg m-5 order-1 md:order-2 md:w-full">
            <img src={"https://miro.medium.com/v2/resize:fit:1200/1*dYuIVOkIcDKIarat5ynsIw.jpeg"} width={700} height={600} alt="men-meditation" className="rounded-lg w-[700px]  md:h-[600px] object-cover object-center relative z-0" />
          </div>
          <div className="flex flex-col justify-center order-2 min-w-[40vw] md:order-1 w-full">
            <h1 className="text-4xl md:text-6xl lg:text-7xl 3xl:text-8xl md:ml-10 font-bold text-RuqyaGray leading-tight">
              <span className="text-RuqyaGreen ">
                Empower Your
                <br />
                Spirit
              </span>{" "}
              with Ruqyah
            </h1>
            <p className="text-sm mt-5 md:text-base md:ml-10 mx-5">Connect with expert Raqis for personalized spiritual healing and guidance.</p>
            <br />
            <div className="flex flex-row justify-center md:justify-start mb-10 space-x-4 md:ml-10">
              <Button text="Book a Session" color="RuqyaGreen" bg={true} className="px-8 py-3" />
              <Button text="Learn Ruqyah" className="px-8 py-3 font-bold border-[#36454F] text-[#596571]"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default First;
