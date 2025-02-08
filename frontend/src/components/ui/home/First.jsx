import Button from "@/components/ui/buttons/DefaultButton";

function First() {
  return (
    <section id="first" className="relative w-full h-80vh md:h-70vh bg-gradient-to-l from-[rgba(230,230,250,0.2)] to-RuqyaLightPurple bg-RuqyaLightPurple md:bg-white overflow-x-clip">
      
      {/* Overlay to prevent background from affecting content */}
      <div className="absolute inset-0 bg-white opacity-50"></div>
      
      {/* SVG Background - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:block absolute right-[-5%] bottom-[-90px] pointer-events-none animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <svg className="md:w-[60vh] lg:w-[70vh] xl:w-[65vh] " xmlns="http://www.w3.org/2000/svg" viewBox="8.19 7.39 16.4 18">
          <path d="M13.794 8.89258C14.9487 6.89258 17.8355 6.89258 18.9902 8.89258L24.1863 17.8926C25.341 19.8926 23.8976 22.3926 21.5882 22.3926H11.1959C8.88654 22.3926 7.44316 19.8926 8.59786 17.8926L13.794 8.89258Z" fill="#008080" />
          <path d="M21.5885 10.3923C23.8979 10.3923 25.3413 12.8923 24.1866 14.8923L18.9904 23.8923C17.8357 25.8923 14.949 25.8923 13.7943 23.8923L8.59813 14.8923C7.44343 12.8923 8.88681 10.3923 11.1962 10.3923L21.5885 10.3923Z" fill="#008080" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative h-full flex items-center md:mx-[8%]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-4 relative z-10">
            {/* Text Content */}
            <div className="w-full h-96 md:w-1/2 space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[1000] text-RuqyaGray leading-tight">
                <span className="text-RuqyaGreen block">
                  Empower Your
                  <br />
                  Spirit with Ruqyah
                </span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg max-w-xl font-[800]">Connect with expert Raqis for personalized spiritual healing and guidance.</p>
              <div className="flex  gap-4 mt-10">
                <Button text="Book a Session" link="/BookRaqis" color="RuqyaGreen" bg={true} className="px-6 md:px-8 py-3 rounded-lg whitespace-nowrap font-bold animate-fade-in" style={{ animationDelay: "0.6s" }} />
                <Button text="Learn Ruqyah" link="/SelfRuqyah" className="px-6 md:px-8 py-3  border-[#0d766e] text-[#0d766e] bg-[rgba(0,204,204,0.1)] rounded-lg whitespace-nowrap font-[800] animate-fade-in" style={{ animationDelay: "0.8s" }} />
              </div>
            </div>

            {/* Image Container */}
            <div className="w-full md:w-3/6 sm-6 animate-fade-in mt-40 md:mt-0" style={{ animationDelay: "1s" }}>
              <div className="relative w-full aspect-[6/3] lg:rounded-[3.2rem] rounded-xl">
                <img src="https://miro.medium.com/v2/resize:fit:1200/1*dYuIVOkIcDKIarat5ynsIw.jpeg" alt="men-meditation" className="w-full h-full object-cover object-center scale-x-[-1] lg:rounded-[3.2rem] rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default First;
