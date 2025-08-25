import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import NavigationTabs from "./NavigationTabs";
import BuddiesTab from "./BuddiesTab";
import BookingsTab from "./BookingsTab";
import BookingModal from "./BookingModel";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("buddies");
  const [buddies, setBuddies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingLocation, setBookingLocation] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    expertise: "",
    date: "",
  });
  const { user } = useAuth();

  const getUserId = () => {
    if (!user?.token) return null;
    try {
      const decoded = jwtDecode(user.token);
      // Try different possible fields for user ID
      return decoded.id || decoded.userId || decoded._id || decoded.sub;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const userId = getUserId();


  const fetchBuddies = useCallback(async () => {
    setLoading(true);
    try {
      const token = user?.token;
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      // Build query string from filters (only include non-empty ones)
      const queryParams = new URLSearchParams();
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.expertise) queryParams.append("expertise", filters.expertise);
      if (filters.date) queryParams.append("date", filters.date);

      const url = `http://localhost:7777/customer/buddies${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
      
        setBuddies(data.buddies || []);
      } else {
        console.error("Failed to fetch buddies");
        setBuddies([]);
      }
    } catch (error) {
      console.error("Error fetching buddies:", error);
      setBuddies([]);
    } finally {
      setLoading(false);
    }
  }, [user?.token, filters]);

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const token = user?.token;
      const response = await fetch("http://localhost:7777/customer/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  // Fetch messages
  const fetchMessages = useCallback(
    async (bookingId) => {
      try {
        const token = user?.token;
        const response = await fetch(
          `http://localhost:7777/customer/messages?bookingId=${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages);
          setSelectedBooking(bookingId);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    [user?.token]
  );

  // Handle booking
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const response = await fetch("http://localhost:7777/customer/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          buddyId: selectedBuddy._id,
          date: bookingDate,
          location: bookingLocation,
        }),
      });

      if (response.ok) {
        alert("Booking request sent successfully!");
        setShowBookingModal(false);
        fetchBookings();
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Booking failed. Please try again.");
    }
  };

  // Send message
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim() || !selectedBooking) return;

    try {
      const token = user?.token;
      const response = await fetch("http://localhost:7777/customer/messages", {
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

      if (response.ok) {
        setNewMessage("");
        fetchMessages(selectedBooking);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [newMessage, selectedBooking, fetchMessages, user?.token]);

  // Load tab data
  useEffect(() => {
    if (activeTab === "buddies") {
      fetchBuddies();
    } else if (activeTab === "bookings") {
      fetchBookings();
    }
  }, [activeTab, fetchBuddies, fetchBookings]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "buddies" && (
          <BuddiesTab
            loading={loading}
            buddies={buddies}
            filters={filters}
            setFilters={setFilters}
            fetchBuddies={fetchBuddies}
            setSelectedBuddy={setSelectedBuddy}
            setShowBookingModal={setShowBookingModal}
          />
        )}

        {activeTab === "bookings" && (
          <BookingsTab
            loading={loading}
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
          handleBooking={handleBooking}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
