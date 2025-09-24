import { useState, useEffect } from "react";
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

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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

  // Items that go into dropdown in tablet view and small menu
  const dropItems = (
    <>
      <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span className="ml-2">Search</span>
      </div>
      <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
        <FontAwesomeIcon icon={faGlobe} className="mr-2" /> Eng
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
      </div>
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
      <div className="flex h-17 sm:h-22 px-2 sm:px-4 bg-blue-200 items-center relative justify-between gap-3">
        {/* LOGO */}
        <div className="min-w-[110px] sm:min-w-[150px] bg-gray-50 h-10 sm:h-13 border-blue-300 rounded-xl sm:rounded-xl mr-2 sm:mr-3 flex items-center justify-center transition-all duration-300">
          <p className="font-extrabold text-sm sm:text-lg md:text-xl text-blue-700 tracking-tight">
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
                {/* Header with logo + close */}
                <div className="flex justify-between items-center mb-6">
                  <p className="font-extrabold text-xl text-blue-700">
                    HireBuddy
                  </p>
                  <button
                    className="p-2 rounded-full hover:bg-blue-300 transition"
                    onClick={handleDrawerClose}
                    aria-label="Close menu"
                  >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                  </button>
                </div>

                {/* All menu items vertical */}
                <div className="flex flex-col gap-5 text-lg font-medium">
                  <div className="cursor-pointer flex items-center text-sm sm:text-base md:text-lg hover:text-blue-700 transition-colors duration-200">
                    <span>Products</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                  <div className="cursor-pointer flex items-center text-sm sm:text-base md:text-lg hover:text-blue-700 transition-colors duration-200">
                    <span>Resources</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                  <div className="cursor-pointer flex items-center text-sm sm:text-base md:text-lg hover:text-blue-700 transition-colors duration-200">
                    <span>Company</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
          

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
                    id="sign-up-button"
                    className="w-full h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-lg flex items-center justify-center text-lg font-semibold shadow-md transition-all duration-300"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
            <Link
              to="/signup"
              id="sign-up-button"
              className="w-20 h-9 text-white bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
            >
              Sign In
            </Link>
          </>
        ) : viewportWidth <= 1162 && viewportWidth > 999 ? (
          // Tablet: dropdown for search, eng, support, login
          <>
            <div className="flex items-center gap-8">
              {/* Main menu items */}
              <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
                <span>Products</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
                <span>Resources</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
                <span>Company</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
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

            {/* Sign Up visible always */}
            <Link
              to="/signup"
              id="sign-up-button"
              className="w-40 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium ml-4"
            >
              Sign In
            </Link>
          </>
        ) : (
          // Desktop: show everything fully
          <>
            <div className="w-full flex">
              <div className="w-3/6 flex flex-row items-center gap-14 font-normal">
                <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
                  <span>Products</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
                  <span>Resources</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
                  <span>Company</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                
              </div>
              <div className="w-2/6 flex flex-row items-center justify-end gap-6">
                <div className="cursor-pointer hover:text-blue-700 transition-colors duration-200">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="cursor-pointer hover:text-blue-700 transition-colors duration-200">
                  <FontAwesomeIcon icon={faGlobe} /> Eng{" "}
                  <FontAwesomeIcon icon={faCaretDown} />{" "}
                </div>
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
                  id="sign-up-button"
                  className="w-40 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
