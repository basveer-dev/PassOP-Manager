import React from "react";
import heartIcon from "../assets/heart.svg";

const Footer = () => {
  return (
    <div className="bg-black/40 backdrop-blur-sm text-white flex flex-col justify-center items-center w-full h-15">
      <div className="logo font-bold text-2xl">
        <span className="text-black">&lt;</span>
        <span className="text-white">Pass</span>
        <span className="text-black">OP/&gt;</span>
      </div>
      <div className="flex justify-center items-center gap-1 text-md">
        Create With <img width="24" src={heartIcon} alt="heart" /> by
        CodeWithBasveer
      </div>
    </div>
  );
};

export default Footer;
