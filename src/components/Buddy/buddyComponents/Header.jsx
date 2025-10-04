import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faCalendarCheck,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ onProfileClick, onAvailabilityClick, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 tracking-tight">
          Buddy Dashboard
        </h1>

        {/* ===== Desktop Buttons ===== */}
        <div className="hidden sm:flex space-x-3">
          <button
            onClick={onProfileClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-150"
          >
            <FontAwesomeIcon icon={faUserEdit} />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={onAvailabilityClick}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-150"
          >
            <FontAwesomeIcon icon={faCalendarCheck} />
            <span>Availability</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-150"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>

        {/* ===== Mobile Menu Toggle ===== */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-all"
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-gray-700 text-xl" />
          </button>
        </div>
      </div>

      {/* ===== Mobile Dropdown Menu ===== */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md animate-slideDown">
          <div className="flex flex-col px-4 py-3 space-y-3">
            <button
              onClick={() => {
                onProfileClick();
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FontAwesomeIcon icon={faUserEdit} />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => {
                onAvailabilityClick();
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
            >
              <FontAwesomeIcon icon={faCalendarCheck} />
              <span>Set Availability</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
