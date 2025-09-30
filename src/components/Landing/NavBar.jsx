import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
  faBars,
  faXmark,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Dropdown,
  SearchOverlay,
  LanguageDropdown,
} from "./ImportantNavBarFunctions";
// ========== MAIN NAVBAR ==========
const NavBar = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Items for dropdown (shared across versions)
  const dropItems = (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center cursor-pointer hover:text-blue-700 transition-colors duration-200"
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
        className="cursor-pointer  text-blue-700 hover:text-blue-600 transition-colors duration-200"
      >
        Log in
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col box-border w-full fixed top-0 left-0 z-50">
      <div className="flex h-17 sm:h-18 px-2 sm:px-4 bg-white shadow-md items-center relative justify-between gap-3">
        {/* LOGO */}
        <div className="min-w-[110px] sm:min-w-[150px]  h-10 sm:h-13 rounded-xl mr-2 sm:mr-3 flex items-center justify-center transition-all duration-300">
          <p className="font-semibold text-lg text-blue-700 tracking-tight">
            HireBuddy
          </p>
        </div>

        {/* Render versions */}
        {viewportWidth < 999 ? (
          <MobileNavBar dropItems={dropItems} />
        ) : viewportWidth <= 1162 && viewportWidth > 999 ? (
          <TabletNavBar dropItems={dropItems} />
        ) : (
          <DesktopNavBar dropItems={dropItems} setSearchOpen={setSearchOpen} />
        )}
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default NavBar;

//
// ========== MOBILE NAVBAR ==========
//
const MobileNavBar = ({ dropItems }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);

  const handleDrawerClose = () => setDrawerClosing(true);

  useEffect(() => {
    let timeout;
    if (drawerClosing) {
      timeout = setTimeout(() => {
        setDrawerClosing(false);
        setHamburgerOpen(false);
      }, 400); // faster animation
    }
    return () => clearTimeout(timeout);
  }, [drawerClosing]);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="ml-auto mr-2 block p-2 rounded-md hover:bg-blue-200 transition"
        onClick={() => setHamburgerOpen(true)}
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faBars} size="xl" />
      </button>

      {/* Hamburger Side Drawer */}
      {(hamburgerOpen || drawerClosing) && (
        <div
          className={`fixed top-0 right-0 w-3/5 max-w-xs h-full bg-gradient-to-b from-blue-100 to-blue-200 shadow-2xl z-50 flex flex-col p-4 transform ${
            drawerClosing
              ? "animate-slide-out opacity-0"
              : "animate-slide-in opacity-100"
          } transition-all duration-400 rounded-l-3xl`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 px-2">
            <p className="font-extrabold text-2xl text-blue-700 tracking-tight">
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

          {/* Menu */}
          {/* Menu */}
          <div className="flex flex-col gap-4 px-2 text-sm font-medium">
            <Link
              to="/services"
              className="cursor-pointer hover:text-blue-700 transition-colors duration-200"
            >
              Services
            </Link>
            <Dropdown label="Resources" items={["Docs", "Guides", "API"]} />
            <Dropdown
              label="Company"
              items={["About Us", "Careers", "Contact"]}
            />

            {/* DropItems directly */}
            <div className="flex flex-col gap-3 px-1">{dropItems}</div>
          </div>

          {/* Sign In button */}
          <div className="mt-auto pt-6 px-2">
            <Link
              to="/signup"
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Floating Sign In button */}
      <Link
        to="/signup"
        className="w-20 h-9 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-sm flex items-center justify-center text-lg font-medium shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200"
      >
        Sign In
      </Link>
    </>
  );
};

//
// ========== TABLET NAVBAR ==========
//
const TabletNavBar = ({ dropItems }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-8">
        <Link
          to="/services"
          className="cursor-pointer hover:text-blue-700 transition-colors duration-200"
        >
          Services
        </Link>
        <Dropdown label="Resources" items={["Docs", "Guides", "API"]} />
        <Dropdown label="Company" items={["About Us", "Careers", "Contact"]} />

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
  );
};

//
// ========== DESKTOP NAVBAR ==========
//
const DesktopNavBar = ({ setSearchOpen }) => {
  return (
    <div className="w-full flex">
      <div className="w-3/6 flex flex-row items-center gap-14 font-normal">
        <Link
          to="/services"
          className="cursor-pointer hover:text-blue-700 transition-colors duration-200"
        >
          Services
        </Link>
        <Dropdown label="Resources" items={["Docs", "Guides", "API"]} />
        <Dropdown label="Company" items={["About Us", "Careers", "Contact"]} />
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
  );
};
