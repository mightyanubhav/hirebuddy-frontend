import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faWallet,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "bookings", label: "Bookings", icon: faClipboardList },
    { id: "earnings", label: "Earnings", icon: faWallet },
    { id: "profile", label: "Profile", icon: faUser },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <nav
        className="flex overflow-x-auto sm:justify-center scrollbar-hide"
        aria-label="Dashboard Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex flex-col sm:flex-row items-center justify-center
              sm:justify-start px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap
              transition-all duration-200
              ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50 sm:bg-transparent"
                  : "text-gray-500 hover:text-blue-500 hover:bg-blue-50 sm:hover:bg-transparent"
              }
            `}
          >
            <FontAwesomeIcon
              icon={tab.icon}
              className={`text-lg sm:mr-2 ${
                activeTab === tab.id ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <span className="text-xs sm:text-sm font-medium">{tab.label}</span>

            {/* Animated underline for desktop */}
            {activeTab === tab.id && (
              <span className="hidden sm:block absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full animate-fadeIn"></span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;
