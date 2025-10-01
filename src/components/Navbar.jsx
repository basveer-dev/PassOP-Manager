import React from "react";
import gitIcon from "../assets/git.svg";

const Navbar = () => {
  return (
    <nav className="bg-black/40 backdrop-blur-sm text-white sticky top-0 z-10">
      <div className="container md:px-40 px-2 mx-auto flex justify-between h-14 py-5 items-center">
        <div className="logo font-bold md:text-2xl text-lg">
          <span className="text-black">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-black">OP/&gt;</span>
        </div>

        <ul>
          <li className="flex gap-4">
            <a
              className="hover:scale-110 duration-200 hover:font-bold"
              href="/"
            >
              Home
            </a>
            <a
              className="hover:scale-110 duration-200 hover:font-bold"
              href="#"
            >
              About
            </a>
            <a
              className="hover:scale-110 duration-200 hover:font-bold"
              href="#"
            >
              Contact
            </a>
          </li>
        </ul>
        <button className="cursor-pointer hover:scale-110 duration-200 flex md:backdrop-blur-[5000px] rounded-full px-1 py-1 gap-2 md:border-2 border-white items-center font-bold text-white">
          <img className="invert" src={gitIcon} alt="Github" />
          <span className="md:block hidden">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
