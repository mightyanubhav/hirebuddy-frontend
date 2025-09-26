import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import NavigationTabs from "./NavigationTabs";
import BuddiesTab from "./BuddiesTab";
import BookingsTab from "../Booking/BookingsTab";
import BookingModal from "../Booking/BookingModel";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { backend_url } from "../../context/HardCodedValues";

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

  const [credits, setCredits] = useState(0);

  const fetchCredits = useCallback(async () => {
    if (!user?.token) return;
    try {
      const response = await fetch(`${backend_url}/customer/credits`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits);
      } else {
        console.error("Failed to fetch credits");
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  }, [user?.token]);

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

      const url = `${backend_url}/customer/buddies${
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
      const response = await fetch(`${backend_url}/customer/bookings`, {
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
          `${backend_url}/customer/messages?bookingId=${bookingId}`,
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
  // inside CustomerDashboard
const handleBooking = async (e) => {
  e.preventDefault();
  try {
    const token = user?.token;
    const response = await fetch(`${backend_url}/customer/book`, {
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

      // ✅ reduce credits by 1 after success
      setCredits((prev) => Math.max(prev - 1, 0));
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
      const response = await fetch(`${backend_url}/customer/messages`, {
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
    fetchCredits();
    if (activeTab === "buddies") {
      fetchBuddies();
    } else if (activeTab === "bookings") {
      fetchBookings();
    }
  }, [activeTab, fetchBuddies, fetchBookings, fetchCredits]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header credits={credits} setCredits={setCredits} />

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
            credits={credits}
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
