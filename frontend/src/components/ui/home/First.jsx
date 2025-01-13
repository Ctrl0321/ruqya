import Button from "@/components/ui/buttons/DefaultButton";
function First() {
  return (
    <>
        <div id="first" className="bg-gradient-to-l from-[#E6E6FA33] to-RuqyaLightPurple bg-white grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center rounded-lg m-5 order-1 md:order-2">
            <img src="https://s3-alpha-sig.figma.com/img/21e8/d68d/2d0409f669ab74439405dc891c9d6cc2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=goGhvxrpk5SqnO~BNDG58t8PFwztyQWXrH3fO7uudIStKQfiG4Wk-wv7qCh5CyqwPycZbTCM~Du5uoxBzs66E3lEY~ryDYuihqtfbagfiIh0g~xApdwOmp7jP1Z73rO~DHyEL9a8iH~~0~WVyEMburYg~I6xrrWoj0TapdkTF1OWiAFNfJhjc0ga~MZTrzgukvj3FW-V~iFJwTBQSm1sxpIktp-JC0WctX74UaEI2rpw6~zWhqvliPQ5-xCl8tSbg32h5U4-WbCk9Av8q~q2jBUDTEs1P3zh1V59S7Dh5so-HUOKkOFQw1BEqLnLNG2U8J3wgLurQGN2QACNXR3rpg__" alt="woman-meditation" className="rounded-lg w-auto relative z-0" />
          </div>
          <div className="flex flex-col justify-center m-auto order-2 md:order-1">
            <h1 className="text-4xl md:text-7xl font-bold text-RuqyaGray leading-tight">
              <span className="text-RuqyaGreen">
                Empower Your
                <br />
                Spirit
              </span>{" "}
              with Ruqyah
            </h1>
            <p className="text-sm m-3 md:text-base">Connect with expert Raqis for personalized spiritual healing and guidance.</p>
            <br />
            <div className="flex flex-row justify-center md:justify-start mb-10 space-x-4">
              <Button text="Book a Session" color="RuqyaGreen" bg={true} />
              <Button text="Learn Ruqah" />
            </div>
          </div>
        </div>
    </>
  );
}

export default First;
