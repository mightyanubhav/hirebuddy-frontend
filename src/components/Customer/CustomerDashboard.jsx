import React, { useState, useEffect } from "react";
import Header from "./Header";
import BuddiesTab from "./BuddiesTab";
import BookingsTab from "../Booking/BookingsTab";
import BookingModal from "../Booking/BookingModel";

import { backend_url } from "../../context/HardCodedValues";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

import { useCredits } from "../hooks/useCredits";
import { useBuddies } from "../hooks/useBuddies";
import { useBookings } from "../hooks/useBookings";
import { useBookingHandler } from "../hooks/useBookingHandler";
import CombinedNavigation from "./CombinedNavigation";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const token = user?.token;

  const [activeTab, setActiveTab] = useState("buddies");
  const [filters, setFilters] = useState({
    location: "",
    expertise: "",
    date: "",
  });
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingLocation, setBookingLocation] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const getUserId = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id || decoded.userId || decoded._id || decoded.sub;
    } catch {
      return null;
    }
  };

  const userId = getUserId();
  const { credits, setCredits, fetchCredits } = useCredits(token);
  const {
    buddies,
    loading: buddiesLoading,
    fetchBuddies,
  } = useBuddies(token, filters);
  const {
    bookings,
    messages,
    selectedBooking,
    loading: bookingsLoading,
    fetchBookings,
    fetchMessages,
  } = useBookings(token);

  const { handleBooking } = useBookingHandler(
    token,
    selectedBuddy,
    setCredits,
    fetchBookings
  );

  useEffect(() => {
    fetchCredits();
    if (activeTab === "buddies") fetchBuddies();
    else if (activeTab === "bookings") fetchBookings();
  }, [activeTab, fetchBookings, fetchBuddies, fetchCredits]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedBooking) return;
    try {
      const res = await fetch(`${backend_url}/customer/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: selectedBooking,
          content: newMessage,
        }),
      });
      if (res.ok) {
        setNewMessage("");
        fetchMessages(selectedBooking);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header credits={credits} setCredits={setCredits} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <CombinedNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filters={filters}
          setFilters={setFilters}
          fetchBuddies={fetchBuddies}
        />
        {activeTab === "buddies" && (
          <BuddiesTab
            loading={buddiesLoading}
            buddies={buddies}
            setSelectedBuddy={setSelectedBuddy}
            setShowBookingModal={setShowBookingModal}
            credits={credits}
          />
        )}
        {activeTab === "bookings" && (
          <BookingsTab
            loading={bookingsLoading}
            bookings={bookings}
            messages={messages}
            newMessage={newMessage}
            selectedBooking={selectedBooking}
            setNewMessage={setNewMessage}
            fetchMessages={fetchMessages}
            sendMessage={sendMessage}
            userId={userId}
          />
        )}
      </div>

      {showBookingModal && selectedBuddy && (
        <BookingModal
          selectedBuddy={selectedBuddy}
          bookingDate={bookingDate}
          bookingLocation={bookingLocation}
          setBookingDate={setBookingDate}
          setBookingLocation={setBookingLocation}
          setShowBookingModal={setShowBookingModal}
          handleBooking={(e) =>
            handleBooking(e, bookingDate, bookingLocation, () =>
              setShowBookingModal(false)
            )
          }
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
