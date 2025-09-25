import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCaretDown,
  faMagnifyingGlass,
  faGlobe,
  faBars,
  faXmark,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// ---------- Reusable Dropdown ----------
const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="cursor-pointer flex items-center gap-1 hover:text-blue-700 transition"
        onClick={() => setOpen(!open)}
      >
        {label} <FontAwesomeIcon icon={faCaretDown} />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 bg-white shadow-xl rounded-xl p-3 w-48 animate-fade-in flex flex-col gap-2 z-50">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="px-3 py-2 hover:bg-blue-100 rounded-md cursor-pointer text-gray-700 hover:text-blue-700 transition"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const SearchOverlay = ({ open, onClose }) => {
  const overlayRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute top-16 right-4 md:right-10 w-80 md:w-96 bg-white rounded-xl shadow-2xl p-4 flex flex-col gap-3 z-50 animate-scale-in" ref={overlayRef}>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
        />
      </div>
      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
        {["Product A", "Product B", "Docs", "Guides", "Careers"].map((item) => (
          <div
            key={item}
            className="px-2 py-1 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700 hover:text-blue-700 text-sm"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes scaleIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in {
            animation: scaleIn 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languages = ["English", "Spanish", "French", "German", "Hindi"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="cursor-pointer flex items-center gap-1 hover:text-blue-700 transition"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faGlobe} /> Eng
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl p-2 w-36 animate-fade-in flex flex-col gap-1 z-50">
          {languages.map((lang) => (
            <div
              key={lang}
              className="px-3 py-2 hover:bg-blue-100 rounded-md cursor-pointer text-gray-700 hover:text-blue-700 transition"
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [searchOpen, setSearchOpen] = useState(false);


  // Track window width for responsive logic
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle closing animation for hamburger drawer
  useEffect(() => {
    let timeout;
    if (drawerClosing) {
      timeout = setTimeout(() => {
        setDrawerClosing(false);
        setHamburgerOpen(false);
      }, 1000); // match animation duration
    }
    return () => clearTimeout(timeout);
  }, [drawerClosing]);



  const handleDrawerClose = () => {
    setDrawerClosing(true);
  };

  // Items for dropdown
  const dropItems = (
    <>
      <div
        className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200"
        onClick={() => setSearchOpen(true)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span className="ml-2">Search</span>
      </div>
      <LanguageDropdown />
      <div className="cursor-pointer hover:text-blue-700 transition-colors duration-200">
        Support
      </div>
      <Link
        to="/login"
        className="cursor-pointer hover:text-blue-700 transition-colors duration-200"
      >
        Log in
      </Link>
    </>
  );

  return (
    <div className="flex flex-col box-border w-full fixed top-0 left-0 z-50">
      {/* NAVBAR */}
      <div className="flex h-17 sm:h-18 px-2 sm:px-4 bg-white shadow-md items-center relative justify-between gap-3">
        {/* LOGO */}
        <div className="min-w-[110px] sm:min-w-[150px]  h-10 sm:h-13 border-blue-300 rounded-xl mr-2 sm:mr-3 flex items-center justify-center transition-all duration-300">
          <p className="font-semibold text-sm sm:text-lg md:text-lg text-blue-700 tracking-tight">
            HireBuddy
          </p>
        </div>

        {/* Mobile: <999px */}
        {viewportWidth < 999 ? (
          <>
            {/* Hamburger Icon */}
            <button
              className="ml-auto mr-2 block"
              onClick={() => setHamburgerOpen(true)}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </button>

            {/* Hamburger Side Drawer */}
            {(hamburgerOpen || drawerClosing) && (
              <div
                className={`fixed top-0 right-0 w-3/5 max-w-xs h-full bg-gradient-to-b from-blue-100 to-blue-200 shadow-2xl z-50 flex flex-col p-6 transform ${
                  drawerClosing
                    ? "animate-slide-out opacity-0"
                    : "animate-slide-in opacity-100"
                } transition-all duration-500`}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <p className="font-extrabold text-xl text-blue-700">
                    Options 
                  </p>
                  <button
                    className="p-2 rounded-full hover:bg-blue-300 transition"
                    onClick={handleDrawerClose}
                    aria-label="Close menu"
                  >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                  </button>
                </div>

                {/* Menu */}
                <div className="flex flex-col gap-5 text-sm font-medium">
                  <Dropdown
                    label="Products"
                    items={["Product A", "Product B", "Product C"]}
                  />
                  <Dropdown
                    label="Resources"
                    items={["Docs", "Guides", "API"]}
                  />
                  <Dropdown
                    label="Company"
                    items={["About Us", "Careers", "Contact"]}
                  />

                  {/* Small submenu */}
                  <div className="mt-4 border-t border-blue-300 pt-4">
                    <div className="relative">
                      <button
                        className="cursor-pointer flex items-center text-sm sm:text-base md:text-lg hover:text-blue-700 transition-colors duration-200"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <span>More</span>
                        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                      </button>
                      {dropdownOpen && (
                        <div className="mt-3 bg-white rounded-lg shadow-lg p-3 flex flex-col gap-3 animate-fade-in">
                          {dropItems}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sign In button pinned at bottom */}
                <div className="mt-auto pt-6">
                  <Link
                    to="/signup"
                    className="w-full h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-lg flex items-center justify-center text-lg font-semibold shadow-md transition-all duration-300"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
            <Link
              to="/signup"
              className="w-20 h-9 text-white bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
            >
              Sign In
            </Link>
          </>
        ) : viewportWidth <= 1162 && viewportWidth > 999 ? (
          // Tablet
          <>
            <div className="flex items-center gap-8">
              <Dropdown
                label="Products"
                items={["Product A", "Product B", "Product C"]}
              />
              <Dropdown label="Resources" items={["Docs", "Guides", "API"]} />
              <Dropdown
                label="Company"
                items={["About Us", "Careers", "Contact"]}
              />
              <div className="cursor-pointer hover:text-blue-700 transition-colors duration-200">
                Pricing
              </div>

              {/* Dropdown for hidden items */}
              <div className="relative">
                <button
                  className="flex items-center cursor-pointer hover:text-blue-700 ml-4"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </span>
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 min-w-[150px] bg-white shadow-lg rounded p-2 z-100 flex flex-col gap-2">
                    {dropItems}
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/signup"
              className="w-40 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium ml-4"
            >
              Sign In
            </Link>
          </>
        ) : (
          // Desktop
          <>
            <div className="w-full flex">
              <div className="w-3/6 flex flex-row items-center gap-14 font-normal">
                <Dropdown
                  label="Products"
                  items={["Product A", "Product B", "Product C"]}
                />
                <Dropdown label="Resources" items={["Docs", "Guides", "API"]} />
                <Dropdown
                  label="Company"
                  items={["About Us", "Careers", "Contact"]}
                />
              </div>
              <div className="w-2/6 flex flex-row items-center justify-end gap-6">
                <button
                  className="cursor-pointer hover:text-blue-700 transition"
                  onClick={() => setSearchOpen(true)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <LanguageDropdown />
                <div className="cursor-pointer hover:text-blue-700 transition-colors duration-200">
                  Support
                </div>
                <Link
                  to="/login"
                  className="cursor-pointer hover:text-blue-700 transition-colors duration-200"
                >
                  Log in
                </Link>
              </div>
              <div className="w-1/6 flex items-center justify-center px-7">
                <Link
                  to="/signup"
                  className="w-40 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default NavBar;
