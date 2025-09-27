import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const [animate, setAnimate] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setAnimate(true);
  }, [animate]);

  const handleClick = () => {
    localStorage.setItem("name", name ? name : "Anonymous");
    localStorage.setItem("isVisible", true);
    location.reload();
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="fixed h-screen w-screen flex justify-center items-center z-50 p-4">
      <div
        className={`transition-all ease-in
           ${
             animate ? "opacity-100 scale-100" : "opacity-0 scale-0"
           } bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-sm sm:w-80 text-center text-black shadow-neutral-400`}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">Enter Your Name</h2>
        <input
          type="text"
          className="w-full px-3 sm:px-4 py-2 bg-[#DBE2EF] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DB2BF] placeholder-[black] text-sm sm:text-base"
          placeholder="Your Name..."
          value={name}
          onChange={handleChange}
        />
        <button
          onClick={handleClick}
          className="mt-3 sm:mt-4 bg-[#5C9967] text-white px-4 py-2 rounded-lg transition hover:bg-[#4A7D54] cursor-pointer text-sm sm:text-base font-semibold w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
