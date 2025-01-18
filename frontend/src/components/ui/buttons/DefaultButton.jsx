import Link from "next/link";
import React from "react";

function Button (props) {
  const { text, link, disabled, bg, color, className} = props;

  const setting = disabled 
    ? "border border-[#36454F] text-[#36454F] opacity-50 cursor-not-allowed" 
    : bg 
      ? `bg-RuqyaGreen text-white`   //Note: Dynamic button color changes is remove due to some reaso it not working
      : "border border-[#36454F] text-[#36454F]";

  return (
    <Link href={disabled ? "#" : link ? link : "#"} className={` py-2 px-4 font-sans flex text-center items-center justify-center gap-0 rounded-lg cursor-pointer opacity-100 leading-none min-h-10 ${setting} ${className} `}>
        {text ? text : "Click Here"}
    </Link>
  );
};

export default Button;
