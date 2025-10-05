// components/BookingsTab.jsx
import { useState } from "react";
import BookingCard from "./BookingCard";

const BookingsTab = ({
  bookings = [
    {
      _id: "1",
      buddy: { name: "Alex Johnson" },
      date: "2025-10-15",
      location: "San Francisco, CA",
      status: "Confirmed",
    },
    {
      _id: "2",
      customer: { name: "Sarah Smith" },
      date: "2025-10-20",
      location: "New York, NY",
      status: "Pending",
    },
    {
      _id: "3",
      buddy: { name: "Mike Chen" },
      date: "2025-10-25",
      location: "Austin, TX",
      status: "Confirmed",
    },
  ],
  loading = false,
  messages = [],
  newMessage = "",
  setNewMessage,
  fetchMessages,
  sendMessage,
  userId = "user123",
  updateBookingStatus,
}) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [chatMode, setChatMode] = useState(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-500">Your bookings will appear here once you make them.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          fetchMessages={fetchMessages}
          sendMessage={sendMessage}
          userId={userId}
          selectedBooking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
          chatMode={chatMode}
          setChatMode={setChatMode}
          updateBookingStatus={updateBookingStatus}
        />
      ))}
    </div>
  );
};
export default BookingsTab;
