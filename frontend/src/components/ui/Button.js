import Link from "next/link";
import React from "react";

const Button = (props) => {
  return (
    <Link href={props.href ? props.href : "#"} className={`min-w-40 py-2 px-4 font-sans flex text-center items-center justify-center gap-0 rounded-lg cursor-pointer opacity-100 leading-none ${props.color ? "bg-" + props.color : "border border-[#36454FCC]"} ${props.color ? "text-white" : "text-[#36454FCC]"}`}>
      {props.text ? props.text : "Click Here"}
    </Link>
  );
};

export default Button;
