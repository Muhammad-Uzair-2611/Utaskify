import React, { useEffect, useRef, useState } from "react";

const UserInfo = () => {
  const [animate, setAnimate] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setAnimate(true);
  }, [animate]);

  const handleClick = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("isVisible", true);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="fixed border h-screen w-screen flex justify-center items-center z-50">
      <div
        className={`transition-all  ease-in
           ${
             animate ? "opacity-100 scale-100" : "opacity-0 scale-0"
           }  w-2/4 h-60 bg-[#051956] rounded-2xl px-6 py-3 shadow-md shadow-white`}
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Welcome to UTaskify
        </h2>
        <div className="flex flex-col gap-y-4 items-center justify-center border ">
          <label htmlFor="name" className="text-white text-lg ">
            Please Enter Your Name
          </label>
          <input onChange={handleChange} className="" type="text" />
        </div>

        <a href="/">
          <button
            onClick={handleClick}
            className="bg-[#3550A1] text-white p-2 text-center rounded-lg"
          >
            Continue
          </button>
        </a>
      </div>
    </div>
  );
};

export default UserInfo;
