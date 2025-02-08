import Button from "@/components/ui/buttons/DefaultButton";

function First() {
  return (
    <>
      <div id="first" className="flex flex-col items-center justify-center bg-gradient-to-l from-[rgba(230,230,250,0.2)] to-RuqyaLightPurple bg-RuqyaLightPurple md:bg-white min-h-65vh md:min-h-70vh pb-10 md:pb-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col items-center justify-center md:flex-row md:space-x-8 mx-3 w-full md:mx-40 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center rounded-lg m-5 md:mx-10 order-1 md:order-2 md:w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <img src={"https://miro.medium.com/v2/resize:fit:1200/1*dYuIVOkIcDKIarat5ynsIw.jpeg"} alt="men-meditation" className="rounded-lg object-cover md:h-[600] object-center relative z-0 animate-fade-in" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="flex flex-col justify-center order-2 min-w-[40vw] md:order-1 w-full animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl 3xl:text-8xl md:ml-8 font-bold text-RuqyaGray leading-tight animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <span className="text-RuqyaGreen">
                Empower Your
                <br />
                Spirit
              </span>{" "}
              with Ruqyah
            </h1>
            <p className="text-sm mt-5 md:text-base md:ml-8 mx-5 animate-fade-in" style={{ animationDelay: '0.7s' }}>Connect with expert Raqis for personalized spiritual healing and guidance.</p>
            <br />
            <div className="flex flex-row justify-center md:justify-start space-x-4 mx-0 md:ml-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button text="Book a Session" link="/BookRaqis" color="RuqyaGreen" bg={true} className="px-8 py-3 rounded-lg animate-fade-in" style={{ animationDelay: '0.9s' }} />
              <Button text="Learn Ruqyah" link="/SelfRuqyah" className="px-8 py-3 font-bold border-[#36454F] text-[#596571] rounded-lg animate-fade-in" style={{ animationDelay: '1.0s' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default First;
