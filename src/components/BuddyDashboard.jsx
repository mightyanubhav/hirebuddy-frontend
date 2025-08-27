import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import SocketMessages from "../components/SocketMessages";
import { backend_url } from "../context/HardCodedValues";

// Buddy Dashboard Component
const BuddyDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [profileData, setProfileData] = useState({
    baseRate: "",
    expertise: "",
    location: "",
    languages: "",
    bio: "",
    availableDates: [],
  });
  const [availabilityDates, setAvailabilityDates] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [chatMode, setChatMode] = useState(null);

  const { user } = useAuth();

  // Fetch buddy's bookings
  const fetchBookings = useCallback(
    async (status = "") => {
      setLoading(true);
      try {
        const token = user?.token;
        const url = status
          ? `${backend_url}/buddy/bookings?status=${status}`
          : `${backend_url}/buddy/bookings`;

        const response = await fetch(url, {
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
    },
    [user?.token]
  );

  // Fetch buddy's earnings
  const fetchEarnings = useCallback(async () => {
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/earnings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEarnings(data);
      } else {
        console.error("Failed to fetch earnings");
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
    }
  }, [user?.token]);

  // Fetch messages for a booking
  const fetchMessages = useCallback(
    async (bookingId) => {
      try {
        const token = user?.token;
        const response = await fetch(
          `${backend_url}/buddy/messages?bookingId=${bookingId}`,
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

  // Fetch buddy profile
  const fetchProfile = useCallback(async () => {
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // 👇 Save everything: name, email, and buddyProfile
        setProfileData(data);
        setAvailabilityDates(data.buddyProfile?.availableDates || []);
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [user?.token]);

  // Update buddy profile
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/profileEdit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setShowProfileModal(false);
      } else {
        const errorData = await response.json();
        alert(`Profile update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed. Please try again.");
    }
  };

  // Update availability
  const updateAvailability = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ availableDates: availabilityDates }),
      });

      if (response.ok) {
        alert("Availability updated successfully!");
        setShowAvailabilityModal(false);
      } else {
        const errorData = await response.json();
        alert(`Availability update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Availability update failed. Please try again.");
    }
  };

  // Add date to availability
  const addAvailabilityDate = () => {
    if (newDate && !availabilityDates.includes(newDate)) {
      setAvailabilityDates([...availabilityDates, newDate]);
      setNewDate("");
    }
  };

  // Remove date from availability
  const removeAvailabilityDate = (dateToRemove) => {
    setAvailabilityDates(
      availabilityDates.filter((date) => date !== dateToRemove)
    );
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = user?.token;
      const response = await fetch(
        `${backend_url}/buddy/booking/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        alert(`Booking ${status.toLowerCase()} successfully!`);
        fetchBookings(); // Refresh bookings list
      } else {
        const errorData = await response.json();
        alert(`Status update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Status update failed. Please try again.");
    }
  };

  // Send a message
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim() || !selectedBooking) return;

    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: selectedBooking,
          text: newMessage, // 👈 changed here
        }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchMessages(selectedBooking); // Refresh messages
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [newMessage, selectedBooking, fetchMessages, user?.token]);

  // Get user ID from token
  const getUserId = () => {
    const token = user?.token;
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };

  const userId = getUserId();

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings();
    } else if (activeTab === "earnings") {
      fetchEarnings();
    } else if (activeTab === "profile") {
      fetchProfile();
    }
  }, [activeTab, fetchBookings, fetchEarnings, fetchProfile]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Buddy Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowProfileModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setShowAvailabilityModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Set Availability
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "bookings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab("earnings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "earnings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Earnings
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Profile
            </button>
          </nav>
        </div>

        {/* Bookings Tab Content */}
        {activeTab === "bookings" && (
          <div className="py-6">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-medium mb-4">Filter Bookings</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => fetchBookings()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                >
                  All
                </button>
                <button
                  onClick={() => fetchBookings("Pending")}
                  className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-2 px-4 rounded-md"
                >
                  Pending
                </button>
                <button
                  onClick={() => fetchBookings("Confirmed")}
                  className="bg-green-200 hover:bg-green-300 text-green-800 py-2 px-4 rounded-md"
                >
                  Confirmed
                </button>
                <button
                  onClick={() => fetchBookings("Declined")}
                  className="bg-red-200 hover:bg-red-300 text-red-800 py-2 px-4 rounded-md"
                >
                  Declined
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">
                          Booking with {booking.customer?.name}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Location:</span>{" "}
                          {booking.location}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Status:</span>
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {booking.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateBookingStatus(booking._id, "Confirmed")
                              }
                              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                updateBookingStatus(booking._id, "Declined")
                              }
                              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                            >
                              Decline
                            </button>
                          </>
                        )}

                        {/* History Messages */}
                        <button
                          onClick={() => {
                            fetchMessages(booking._id);
                            setChatMode("history");
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                        >
                          Messages
                        </button>

                        {/* Live Chat */}
                        <button
                          onClick={() => {
                            setSelectedBooking(booking._id);
                            setChatMode("live");
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
                        >
                          Live Chat
                        </button>
                      </div>
                    </div>

                    {/* Messages Section */}
                    {selectedBooking === booking._id && chatMode === "history" && (
  <div className="mt-6 border-t pt-4">
    <h4 className="font-medium mb-4">Messages</h4>
    <div className="space-y-4 max-h-60 overflow-y-auto p-2">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`p-3 rounded-lg ${
            message.sender === userId
              ? "bg-blue-100 ml-8"
              : "bg-gray-100 mr-8"
          }`}
        >
          <p>{message.text}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
    <div className="mt-4 flex">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Type your message..."
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md"
      >
        Send
      </button>
    </div>
  </div>
)}

{selectedBooking === booking._id && chatMode === "live" && (
  <div className="mt-6 border-t pt-4">
    <h4 className="font-medium mb-4">Live Chat</h4>
    {/* Use your SocketMessages component here */}
    <SocketMessages bookingId={booking._id} userId={userId} />
  </div>
)}

                  </div>
                ))}
              </div>
            )}

            {bookings.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  You don't have any bookings yet.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab Content */}
        {activeTab === "earnings" && (
          <div className="py-6">
            {earnings ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Your Earnings</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800">
                      Total Earnings
                    </h3>
                    <p className="text-2xl font-bold">
                      ₹{earnings.totalEarnings}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-green-800">
                      Last Payment
                    </h3>
                    <p className="text-xl font-bold">
                      {new Date(earnings.lastPaymentDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-800">
                      Transactions
                    </h3>
                    <p className="text-xl font-bold">
                      {earnings.transactions.length}
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">
                  Recent Transactions
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {earnings.transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ₹{transaction.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="py-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">
                {profileData.name || "Unnamed User"}
              </h2>
              <p className="text-gray-600 mb-6">
                {profileData.email || "No email"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Base Rate (₹/hour)
                      </label>
                      <p className="mt-1">
                        {profileData.buddyProfile?.baseRate || "Not set"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <p className="mt-1">
                        {profileData.buddyProfile?.location || "Not set"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expertise
                      </label>
                      <p className="mt-1">
                        {profileData.buddyProfile?.expertise?.length > 0
                          ? profileData.buddyProfile.expertise.join(", ")
                          : "Not set"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Additional Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Languages
                      </label>
                      <p className="mt-1">
                        {profileData.buddyProfile?.languages?.length > 0
                          ? profileData.buddyProfile.languages.join(", ")
                          : "Not set"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <p className="mt-1">
                        {profileData.buddyProfile?.bio || "Not set"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Available Dates
                      </label>
                      <div className="mt-1">
                        {profileData.buddyProfile?.availableDates?.length >
                        0 ? (
                          <ul className="list-disc list-inside">
                            {profileData.buddyProfile.availableDates.map(
                              (date, index) => (
                                <li key={index}>
                                  {new Date(date).toLocaleDateString()}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p>No available dates set</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={updateProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Base Rate (₹/hour)
                  </label>
                  <input
                    type="number"
                    value={profileData.baseRate}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        baseRate: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expertise
                  </label>
                  <input
                    type="text"
                    value={profileData.expertise}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        expertise: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Yoga, Fitness, Meditation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Languages
                  </label>
                  <input
                    type="text"
                    value={profileData.languages}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        languages: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., English, Hindi"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Set Availability</h2>
            <form onSubmit={updateAvailability}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Add Available Date
                </label>
                <div className="flex mt-1">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addAvailabilityDate}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Available Dates
                </label>
                <div className="mt-1 max-h-40 overflow-y-auto">
                  {availabilityDates.length > 0 ? (
                    <ul className="border rounded-md divide-y">
                      {availabilityDates.map((date, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center py-2 px-3"
                        >
                          <span>{new Date(date).toLocaleDateString()}</span>
                          <button
                            type="button"
                            onClick={() => removeAvailabilityDate(date)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 py-2">No dates added yet</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAvailabilityModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                  Save Availability
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuddyDashboard;
