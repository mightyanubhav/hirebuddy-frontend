import React, { useEffect, useState } from "react";
import hireBuddyImg from "../../assets/personJump.png";
import { Link } from "react-router-dom";
const animatedWords = [
  "Hangouts",
  "Travel",
  "Find-Stay",
  "Shopping",
  "Daily-Task",
  "Communication",
];


export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    let typingTimeout;
    if (typing && displayedText.length < animatedWords[wordIndex].length) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(
          animatedWords[wordIndex].slice(0, displayedText.length + 1)
        );
      }, 70);
    } else if (
      typing &&
      displayedText.length === animatedWords[wordIndex].length
    ) {
      typingTimeout = setTimeout(() => {
        setTyping(false);
      }, 1300);
    } else if (!typing) {
      typingTimeout = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % animatedWords.length);
        setDisplayedText("");
        setTyping(true);
      }, 400);
    }
    return () => clearTimeout(typingTimeout);
  }, [displayedText, wordIndex, typing]);

  return (
    <section className="relative w-full bg-gray-50 overflow-hidden pt-18 -mt-6 sm:mt-0">
      <div className="mx-auto px-4 sm:px-8 pt-16 pb-14 flex flex-col lg:flex-row items-start relative z-10">
        {/* Left Section */}
        <div className="flex-1 z-20">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
            To assist you with
            {/* Mobile version: cursor below */}
            <span className="block sm:hidden mt-1 text-blue-600 font-mono min-h-[2.5rem]">
              {displayedText}
              <span className="blinking-cursor">|</span>
            </span>
            {/* Desktop version: cursor inline */}
            <span
              className="hidden sm:inline-block rounded px-3 py-1 text-blue-600 font-mono min-h-[2.5rem] transition-all duration-800"
              style={{ letterSpacing: "0.03em", whiteSpace: "pre" }}
              aria-live="polite"
            >
              {displayedText}
              <span className="blinking-cursor">|</span>
            </span>
          </h1>

          <p className="pt-5 sm:pt-10 text-base xs:text-md md:text-lg text-black/80 mt-2 mb-8 max-w-2xl">
            Need help shopping, moving, or finding a room? Want a travel buddy,
            a pickup at the station, or simply someone to talk to? Hire Buddy
            connects you with the right person for every moment—making daily
            life easier, more enjoyable, and stress-free.
          </p>
          <div className="flex flex-col gap-4 xs:flex-row xs:gap-6 mb-14 items-start">
            <Link
              to="/signup"
              id="sign-up-button"
              className="w-40 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
          className="flex items-center text-blue-700 font-semibold hover:text-blue-800 text-lg"
          to={'/services'}
        >
          Learn more
          <span className="ml-2 text-2xl">&#8594;</span>
        </Link>
          </div>
          <div className="border-t border-gray-200 my-5"></div>
          <Stats/>
        </div>

        {/* Right: Always-Connected Patch and Animated Image */}
        <div className="absolute right-0 top-0 h-full w-[50vw] flex items-center justify-center -z-100">
          {/* Patch background */}
          <div >
            <img
              src={hireBuddyImg}
              alt="surfing"
              className="surf-animate object-contain mx-auto w-36 sm:w-52 md:w-64 lg:w-80 xl:w-96"
              style={{
                minWidth: "100px",
                maxHeight: 320,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


const Stats = () => {
  const statsData = [
    { label: "Customers", value: 500 },
    { label: "States across India", value: 28 },
    { label: "Customers join every month", value: 50 },
    { label: "First app of its kind", value: 1 },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const duration = 2000; // 2 seconds total animation

  useEffect(() => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounts(
        statsData.map((stat) => Math.ceil(stat.value * progress))
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-7 mt-6">
      {statsData.map((stat, i) => (
        <div key={i}>
          <span className="text-blue-700 font-bold text-xl xs:text-2xl">
            {counts[i]}{i === 3 ? "" : "+"}
          </span>
          <div className="text-black/80 text-base">{stat.label} &rarr;</div>
        </div>
      ))}
    </div>
  );
};
