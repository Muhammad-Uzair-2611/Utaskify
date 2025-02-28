import React, { useEffect, useRef, useState } from "react";

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
    <div className="fixed  h-screen w-screen flex justify-center items-center z-50">
      <div
        className={`transition-all  ease-in
           ${
             animate ? "opacity-100 scale-100" : "opacity-0 scale-0"
           } bg-[#1B2430] p-6 rounded-2xl shadow-xl w-80 text-center  text-white border border-[#526D82]`}
      >
        <h2 className="text-xl font-semibold mb-4 text-[#DDE6ED]">
          Enter Your Name
        </h2>
        <input
          type="text"
          className="w-full px-4 py-2 border border-[#526D82] bg-[#27374D] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DB2BF] placeholder-[#9DB2BF]"
          placeholder="Your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="mt-4 bg-[#526D82] text-white px-4 py-2 rounded-lg hover:bg-[#9DB2BF] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
