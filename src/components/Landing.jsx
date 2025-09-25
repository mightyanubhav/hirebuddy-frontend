import { useEffect } from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import Body from "./Body";
import { MarqueeSection } from "./Marquee";
import { backend_url } from "../context/HardCodedValues";

const Landing = () => {
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await fetch(`${backend_url}/wakeup`); // 👈 replace with your backend URL
        console.log("🌍 Server wake-up ping sent");
      } catch (error) {
        console.error("⚠️ Error waking server:", error);
      }
    };

    wakeServer();
  }, []); // runs only once when component mounts

  return (
    <>
      <NavBar />

      <HeroSection />
      <div className="p-10 min-h-[60px] bg-gray-50 flex items-center justify-center  shadow-md">
      </div>
      <MarqueeSection />
      <Body />
    </>
  );
};

export default Landing;
