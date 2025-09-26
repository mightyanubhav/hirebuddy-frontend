import { faGlobe,faCaretDown,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export {Dropdown,SearchOverlay,LanguageDropdown }