import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import NavigationTabs from "./components/NavigationTabs";
import BookingsTab from "./components/BookingsTab";
import EarningsTab from "./components/EarningsTab";
import ProfileTab from "./components/ProfileTab";
import ProfileModal from "./components/ProfileModal";
import AvailabilityModal from "./components/AvailabilityModal";
import { backend_url } from "../../../context/HardCodedValues";

const BuddyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(null);
  const [profileData, setProfileData] = useState({
    baseRate: "",
    expertise: "",
    location: "",
    languages: "",
    bio: "",
    availableDates: [],
  });
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  const { user } = useAuth();

  // Fetch functions
  const fetchBookings = useCallback(async (status = "") => {
    setLoading(true);
    try {
      const token = user?.token;
      const url = status
        ? `${backend_url}/buddy/bookings?status=${status}`
        : `${backend_url}/buddy/bookings`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  const fetchEarnings = useCallback(async () => {
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/earnings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setEarnings(data);
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
    }
  }, [user?.token]);

  const fetchProfile = useCallback(async () => {
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [user?.token]);

  useEffect(() => {
    if (activeTab === "bookings") fetchBookings();
    else if (activeTab === "earnings") fetchEarnings();
    else if (activeTab === "profile") fetchProfile();
  }, [activeTab, fetchBookings, fetchEarnings, fetchProfile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onProfileClick={() => setShowProfileModal(true)}
        onAvailabilityClick={() => setShowAvailabilityModal(true)}
        onLogout={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === "bookings" && (
          <BookingsTab 
            bookings={bookings}
            loading={loading}
            onFetchBookings={fetchBookings}
          />
        )}
        
        {activeTab === "earnings" && <EarningsTab earnings={earnings} />}
        
        {activeTab === "profile" && <ProfileTab profileData={profileData} />}
      </div>

      {showProfileModal && (
        <ProfileModal
          profileData={profileData}
          onProfileDataChange={setProfileData}
          onClose={() => setShowProfileModal(false)}
          user={user}
        />
      )}

      {showAvailabilityModal && (
        <AvailabilityModal
          profileData={profileData}
          onClose={() => setShowAvailabilityModal(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default BuddyDashboard;