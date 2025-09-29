import {
  faGlobe,
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 
          ${open 
            ? " text-blue-700" 
            : " text-white-700 hover:text-blue-700 hover:cursor-pointer"} 
        `}
      >
        {label}
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`ml-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute mt-2 w-52 
          bg-white rounded-xl shadow-xl ring-1 ring-gray-200
          z-50 animate-fade-in"
        >
          <ul className="py-2">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 text-sm text-black 
                hover:bg-blue-600 hover:text-white 
                hover:pl-5 transition-all duration-200 cursor-pointer rounded-md"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const SearchOverlay = ({ open, onClose }) => {
  const overlayRef = useRef(null);

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
    <div
      className="absolute top-16 right-4 md:right-10 w-80 md:w-96 bg-white rounded-2xl shadow-2xl p-4 flex flex-col gap-3 z-50 animate-scale-in"
      ref={overlayRef}
    >
      {/* Search Input */}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-blue-700" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-sm md:text-base transition"
        />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
        {["Product A", "Product B", "Docs", "Guides", "Careers"].map((item) => (
          <div
            key={item}
            className="px-3 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 cursor-pointer text-gray-700 text-sm transition-all duration-200"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes scaleIn {
            0% { transform: scale(0.95); opacity: 0; }
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
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef(null);
  const languages = ["English", "Spanish", "French", "German", "Hindi"];

  // Close dropdown when clicked outside
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button */}
      <button
        className={`flex items-center gap-1 px-4 py-2 rounded-md font-medium transition-colors duration-200
          ${!open ? "text-black" : "text-blue-700"}`}
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faGlobe} /> {selectedLanguage}
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`ml-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl ring-1 ring-gray-200 z-50 animate-fade-in">
          {languages.map((lang) => (
            <div
              key={lang}
              onClick={() => {
                setSelectedLanguage(lang);
                setOpen(false);
              }}
              className={`px-3 py-2 rounded-md cursor-pointer text-black hover:text-blue-600 hover:bg-gray-100 transition-all duration-200
                ${selectedLanguage === lang ? " text-blue-600" : ""}`}
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export { Dropdown, SearchOverlay, LanguageDropdown };
