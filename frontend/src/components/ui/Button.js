import Link from "next/link";
import React from "react";

const Button = (props) => {
  const { text, link, disabled, bg } = props;
  const color = disabled 
    ? "border border-[#36454F] text-[#36454F] opacity-50 cursor-not-allowed" 
    : bg 
      ? props.color 
        ? "bg-" + props.color + " text-white" 
        : "bg-[#36454F]" 
      : "border border-[#36454F] text-[#36454F]";

  return (
    <Link href={disabled ? "#" : link ? link : "#"}>
      <div 
        className={`min-w-30 py-2 px-4 font-sans flex text-center items-center justify-center gap-0 rounded-lg cursor-pointer opacity-100 leading-none ${color}`}
      >
        {text ? text : "Click Here"}
      </div>
    </Link>
  );
};

export default Button;
