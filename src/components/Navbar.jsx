import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  //*State
  const [showAbout, setShowabout] = useState(false);

  //*Function
  const handleaboutClick = () => {
    setShowabout(!showAbout);
    setTimeout(() => {
      setShowabout(false);
    }, 4000);
  };

  return (
    <nav className="bg-[#ffe0a1] border-b border-[#E6A157] text-[#2D2D2D] h-12 flex justify-between items-center px-3 relative">
      <div className="font-extrabold text-2xl cursor-pointer">UTask</div>
      <ul
        className="flex gap-x-5 text-[17px] font-bold [&>li]:cursor-pointer 
        [&>li]:transition-all [&>li]:duration-200 transform [&>li]:hover:scale-105 [&>li]:select-none "
      >
        <li>
          <a href="./index.html">Home</a>
        </li>
        <li onClick={handleaboutClick}>About Us</li>
      </ul>
      {
        <div
          className={`about transition-all duration-200  h-30 w-50 rounded-2xl p-2 bg-[#ffe0a1] shadow-md shadow-black fixed right-5 top-14 ${
            showAbout
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <p className="font-bold text-center">
            This To-Do list App is Made by Muhammad Uzair Shaikh Using React
          </p>
        </div>
      }
    </nav>
  );
};

export default Navbar;
