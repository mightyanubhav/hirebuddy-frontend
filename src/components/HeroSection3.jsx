import React, { useEffect, useState } from "react";
import hireBuddyImg from "../assets/hireBuddy.png";
import { Link } from "react-router-dom";
const animatedWords = [
  "Hangouts",
  "Travel",
  "Find-Stay",
  "Shopping",
  "Daily-Task",
  "Communication",
];

export default function HeroSection3() {
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
    <section className="relative w-full bg-gray-50 overflow-hidden pt-22 ">
      <div className="mx-auto px-4 sm:px-8 pt-16 pb-14 flex flex-col lg:flex-row items-start relative z-10">
        {/* Left Section */}
        <div className="flex-1 z-20">
          <h1 className="text-2xl xs:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
            To assist you with{" "}
            <span
              className="inline-block rounded px-3 py-1 text-blue-600 min-h-[2.5rem] font-mono transition-all duration-500"
              style={{ letterSpacing: "0.03em", whiteSpace: "pre" }}
              aria-live="polite"
            >
              {displayedText}
              <span className="blinking-cursor">|</span>
            </span>
          </h1>
          <p className="text-base xs:text-lg md:text-xl text-black/80 mt-2 mb-8 max-w-2xl">
            Need help shopping, moving, or finding a room? Want a travel buddy,
            a pickup at the station, or simply someone to talk to? Hire Buddy
            connects you with the right person for every moment—making daily
            life easier, more enjoyable, and stress-free.
          </p>
          <div className="flex flex-col gap-4 xs:flex-row xs:gap-6 mb-14 items-start">
            <Link
              to='/signup'
              id="sign-up-button"
              className="w-40 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
            >
              Get Started
            </Link>
            <button className="flex items-center text-blue-700 font-semibold hover:text-blue-800 text-lg">
              Learn more
              <span className="ml-2 text-2xl">&#8594;</span>
            </button>
          </div>
          <div className="border-t border-gray-200 my-5"></div>
          <div className="flex flex-col sm:flex-row gap-10 mt-6">
            <div>
              <span className="text-blue-700 font-bold text-xl xs:text-2xl">
                10K
              </span>
              <div className="text-black/80 text-base">Customers &rarr;</div>
            </div>
            <div>
              <span className="text-blue-700 font-bold text-xl xs:text-2xl">
                27+
              </span>
              <div className="text-black/80 text-base">
                States across India &rarr;
              </div>
            </div>
            <div>
              <span className="text-blue-700 font-bold text-xl xs:text-2xl">
                100+
              </span>
              <div className="text-black/80 text-base">
                Customer join every month &rarr;
              </div>
            </div>
            <div>
              <span className="text-blue-700 font-bold text-xl xs:text-2xl">
                #1
              </span>
              <div className="text-black/80 text-base">
               First app of its kind &rarr;
              </div>
            </div>
          </div>
        </div>

        {/* Right: Always-Connected Patch and Animated Image */}
        <div className="absolute right-0 top-0 h-full w-[50vw] flex items-center justify-center -z-100">
          {/* Patch background */}
          <div className="h-full w-full rounded-tl-[240px] bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center shadow-2xl">
            <img
              src={hireBuddyImg}
              alt="dashboard"
              className={`img-float transition-all duration-500 object-contain mx-auto ${"w-36 sm:w-52 md:w-64 lg:w-80 xl:w-96"}`}
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
