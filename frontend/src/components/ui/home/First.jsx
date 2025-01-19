import Button from "@/components/ui/buttons/DefaultButton";
function First() {
  return (
    <>
      <div id="first" className="flex flex-col items-center justify-center bg-gradient-to-l from-[rgba(230,230,250,0.2)] to-RuqyaLightPurple bg-white min-h-80vh">
        <div className="flex flex-col items-center justify-center md:flex-row mx-5 md:mx-20">
          <div className="flex items-center justify-center rounded-lg m-5 order-1 md:order-2">
            <img src="https://s3-alpha-sig.figma.com/img/21e8/d68d/2d0409f669ab74439405dc891c9d6cc2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=goGhvxrpk5SqnO~BNDG58t8PFwztyQWXrH3fO7uudIStKQfiG4Wk-wv7qCh5CyqwPycZbTCM~Du5uoxBzs66E3lEY~ryDYuihqtfbagfiIh0g~xApdwOmp7jP1Z73rO~DHyEL9a8iH~~0~WVyEMburYg~I6xrrWoj0TapdkTF1OWiAFNfJhjc0ga~MZTrzgukvj3FW-V~iFJwTBQSm1sxpIktp-JC0WctX74UaEI2rpw6~zWhqvliPQ5-xCl8tSbg32h5U4-WbCk9Av8q~q2jBUDTEs1P3zh1V59S7Dh5so-HUOKkOFQw1BEqLnLNG2U8J3wgLurQGN2QACNXR3rpg__" alt="woman-meditation" className="rounded-lg w-[700px]  md:h-[600px] object-cover object-center relative z-0" />
          </div>
          <div className="flex flex-col justify-center order-2 min-w-[40vw] md:order-1">
            <h1 className="text-4xl md:text-6xl font-bold text-RuqyaGray leading-tight">
              <span className="text-RuqyaGreen">
                Empower Your
                <br />
                Spirit
              </span>{" "}
              with Ruqyah
            </h1>
            <p className="text-sm mt-5 md:text-base font-fullsans">Connect with expert Raqis for personalized spiritual healing and guidance.</p>
            <br />
            <div className="flex flex-row justify-center md:justify-start mb-10 space-x-4">
              <Button text="Book a Session" color="RuqyaGreen" bg={true} className="px-8 py-3 font-bold" />
              <Button text="Learn Ruqah" className="px-8 py-3"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default First;
