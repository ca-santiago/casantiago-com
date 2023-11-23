"use client";
import React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const MobileView = () => {
  const [open, setOpen] = React.useState(false);
  const Icon = open ? AiOutlineClose : AiOutlineMenu;
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <div className="block md:hidden select-none">
      <div className="w-full bg-white shadow top-0 z-50 fixed">
        <div className="flex flex-row justify-between items-center px-5 h-14">
          {/* Will be replace by a logo */}
          <a
            href="/"
            className="text-slate-700 font-semibold text-xl select-none cursor-pointer"
          >
            casantiago.com
          </a>
          <Icon onClick={() => setOpen((prev) => !prev)} size={24} />
        </div>
        <ul
          id="mobile-menu"
          className={`transition duration-300 ease-in flex-col gap-4 ${
            open ? "flex" : "hidden"
          } h-screen min-h-screen bg-white text-slate-700 font-semibold text-lg mt-14 gap-8`}
        >
          <li onClick={handleClick}>
            <a href="#about">About</a>
          </li>
          <li onClick={handleClick}>
            <a href="#projects">Projects</a>{" "}
          </li>
          <li onClick={handleClick}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      {/* Fill div to add vertical space */}
      <div className="h-14"></div>
    </div>
  );
};

const DesktopView = () => {
  return (
    <div className="h-16 shadow-sm rounded-b-sm bg-white w-full items-center text-lg hidden md:flex flex-row justify-between p-3 px-10 top-0 z-50 fixed">
      {/* Will be replace by a logo */}
      <a
        href="/"
        className="text-slate-700 font-semibold text-xl select-none cursor-pointer"
      >
        casantiago.com
      </a>
      <ul className="flex flex-row gap-4">
        <li>
          <a href="#about">About</a>
          <AiOutlineMenu />
        </li>
        <li>
          <a href="#projects">Projects</a>{" "}
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

const Nav = () => {
  return (
    <div>
      <MobileView />
      <DesktopView />
    </div>
  );
};

export default Nav;
