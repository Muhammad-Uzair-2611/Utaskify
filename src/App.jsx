import { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Addtask from "./components/Addtask";
import { WiSnow } from "react-icons/wi";
import { PiHandArrowDown } from "react-icons/pi";

function App() {
  const [isScreenlarge, setIsscreenlarge] = useState(window.innerWidth >= 530);

  useEffect(() => {
    const handleScreensize = () => {
      setIsscreenlarge(window.innerWidth >= 530);
    };
    window.addEventListener("resize", handleScreensize);

    return () => window.removeEventListener("resize", handleScreensize);
  }, []);

  return (
    <>
      
      {<Navbar />}
      <Addtask />
    </>
  );
}

export default App;
