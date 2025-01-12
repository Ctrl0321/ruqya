import Link from "next/link";
import React from "react";

const Button = (props) => {
  const link = props.link;
  const color = props.color;
  const text = props.text;
  return (
    <Link href={link ? link : "#"} className={`min-w-30 py-2 px-4 font-sans flex text-center items-center justify-center gap-0 rounded-lg cursor-pointer opacity-100 leading-none ${color ? "bg-" + color : "border border-[#36454FCC]"} ${color ? "text-white" : "text-[#36454FCC]"}`}>
      {text ? text : "Click Here"}
    </Link>
  );
};

export default Button;
