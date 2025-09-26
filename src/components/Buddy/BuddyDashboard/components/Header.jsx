import React from "react";

const Header = ({ onProfileClick, onAvailabilityClick, onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Buddy Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={onProfileClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
          <button
            onClick={onAvailabilityClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Set Availability
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;