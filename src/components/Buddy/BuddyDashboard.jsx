import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./buddyComponents/Header";
import NavigationTabs from "./buddyComponents/NavigationTabs";
import BookingsTab from "./buddyComponents/BookingsTab";
import EarningsTab from "./buddyComponents/EarningsTab";
import ProfileTab from "./buddyComponents/ProfileTab";
import ProfileModal from "./buddyComponents/ProfileModal";
import AvailabilityModal from "./buddyComponents/AvailabilityModal";
import { backend_url } from "../../context/HardCodedValues";

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

  // ===== Fetch Functions =====
  const fetchBookings = useCallback(
    async (status = "") => {
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
    },
    [user?.token]
  );

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

  // ===== Handle Tab Data Fetch =====
  useEffect(() => {
    if (activeTab === "bookings") fetchBookings();
    else if (activeTab === "earnings") fetchEarnings();
    else if (activeTab === "profile") fetchProfile();
  }, [activeTab, fetchBookings, fetchEarnings, fetchProfile]);

  // ====== Main UI ======
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Header
          onProfileClick={() => setShowProfileModal(true)}
          onAvailabilityClick={() => setShowAvailabilityModal(true)}
          onLogout={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
      </div>

      {/* Tabs Navigation - Sticky on mobile */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="overflow-x-auto flex justify-between sm:justify-center scrollbar-hide"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
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
      </div>

      {/* ====== Modals ====== */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <ProfileModal
              profileData={profileData}
              onProfileDataChange={setProfileData}
              onClose={() => setShowProfileModal(false)}
              user={user}
            />
          </div>
        </div>
      )}

      {showAvailabilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <AvailabilityModal
              profileData={profileData}
              onClose={() => setShowAvailabilityModal(false)}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BuddyDashboard;
