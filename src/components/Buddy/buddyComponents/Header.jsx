import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../context/AuthContext";
import {
  faUserEdit,
  faCalendarCheck,
  faSignOutAlt,
  faBars,
  faTimes,
  
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { backend_url } from "../../../context/HardCodedValues";

const Header = ({ onProfileClick, onAvailabilityClick, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchBuddyProfile = async () => {
      try {
        const token = user?.token;
        const response = await axios.get(`${backend_url}/buddy/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching buddy profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuddyProfile();
  }, [user?.token]);

  const getDisplayName = () => {
    if (loading) return "Loading...";
    return profileData?.name || "Buddy";
  };

  const getProfileImage = () => {
    if (profileData?.profileImage?.url) {
      return (
        <img
          src={profileData.profileImage.url}
          alt={getDisplayName()}
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow-md ring-2 ring-blue-50"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-blue-50">
        <span className="text-white font-bold text-base">
          {getDisplayName().charAt(0)?.toUpperCase()}
        </span>
      </div>
    );
  };

  const getExpertise = () => {
    if (loading) return "Professional Buddy";
    if (profileData?.buddyProfile?.expertise?.length > 0) {
      return profileData.buddyProfile.expertise[0];
    }
    return "Professional Buddy";
  };

  return (
    <header className="bg-gradient-to-r from-white to-blue-50/30 backdrop-blur-sm shadow-lg border-b border-blue-100/50 sticky  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {getProfileImage()}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white"></span>
            </span>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-gray-900 leading-tight tracking-tight">
              {getDisplayName()}
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                {getExpertise()}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onProfileClick}
            className="group flex items-center gap-2 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-300 transition-all duration-200 font-medium"
          >
            <FontAwesomeIcon icon={faUserEdit} className="text-sm group-hover:scale-110 transition-transform" />
            <span className="text-sm">Edit Profile</span>
          </button>

          <button
            onClick={onAvailabilityClick}
            className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="text-sm group-hover:scale-110 transition-transform" />
            <span className="text-sm">Availability</span>
          </button>

          <button
            onClick={onLogout}
            className="group flex items-center gap-2 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-red-300 transition-all duration-200 font-medium"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-sm group-hover:scale-110 transition-transform" />
            <span className="text-sm">Logout</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            <FontAwesomeIcon 
              icon={menuOpen ? faTimes : faBars} 
              className="text-gray-700 text-xl transition-transform duration-200"
              style={{ transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col px-3 py-2 space-y-1">
            <button
              onClick={() => {
                onProfileClick();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faUserEdit} className="text-blue-600 w-4" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => {
                onAvailabilityClick();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-150 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="text-green-600 w-4" />
              <span>Set Availability</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-150 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;