import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faGlobe, faBars, faXmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
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
      <div className="cursor-pointer hover:text-blue-700 transition-colors duration-200">Support</div>
      <Link to='/login' className="cursor-pointer hover:text-blue-700 transition-colors duration-200">Log in</Link>
    </>
  );

  return (
    <div className="flex flex-col box-border w-full fixed top-0 left-0 z-50">
      {/* NAVBAR */}
      <div className="flex h-22 p-3 bg-blue-200 items-center relative justify-between">
        {/* LOGO */}
        <div className="min-w-50  bg-gray-50 h-16 border-blue-300 rounded-3xl mr-3 flex flex-row items-center justify-center ">
          
          <p className="font-extrabold text-lg text-blue-700">HireBuddy</p>
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
            {/* Sign Up always visible */}
            <Link
            to="/signup"
              id="sign-up-button"
              className="w-40 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
            >
              Sign In
            </Link>

            {/* Hamburger Side Drawer */}
            {(hamburgerOpen || drawerClosing) && (
              <div
                className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-blue-100 shadow-lg z-50 flex flex-col p-6 ${
                  drawerClosing ? "animate-slide-out" : "animate-slide-in"
                }`}
              >
                {/* Close button at top */}
                <button
                  className="self-end p-2 mb-4 hover:bg-blue-300 rounded"
                  onClick={handleDrawerClose}
                  aria-label="Close menu"
                >
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>

                {/* All menu items vertical */}
                <div className="flex flex-col gap-4">
                  <div className="cursor-pointer flex items-center">
                    <span>Products</span>
                    <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                  </div>
                  <div className="cursor-pointer flex items-center">
                    <span>Resources</span>
                    <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                  </div>
                  <div className="cursor-pointer flex items-center">
                    <span>Company</span>
                    <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                  </div>
                  <div className="cursor-pointer">Pricing</div>

                  {/* Small menu like 1162px dropdown style */}
                  {/* Show main menu items*/}
                  <div className="mt-4 border-t border-blue-300 pt-4">
                    {/* Dropdown for smaller submenu */}
                    <div className="relative">
                      <button
                        className="flex items-center cursor-pointer hover:text-blue-700"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <span>More</span>
                        <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute left-0 mt-2 min-w-[150px] bg-white shadow-lg rounded p-2 z-10 flex flex-col gap-2">
                          {dropItems}
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                  to="/signup"
                    id="sign-up-button"
                    className="w-40 mt-6 h-12 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 duration-300 rounded-sm hover:rounded-4xl flex items-center justify-center text-lg font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
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
                  <span><FontAwesomeIcon icon={faEllipsis} /></span>
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
                <div className="cursor-pointer flex items-center hover:text-blue-700 transition-colors duration-200">
                  Pricing
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
                <Link to='/login' className="cursor-pointer hover:text-blue-700 transition-colors duration-200">
                  Log in
                </Link>
              </div>
              <div className="w-1/6 flex items-center justify-center">
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