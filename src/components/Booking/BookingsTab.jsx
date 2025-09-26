// components/BookingsTab.jsx
import { useState } from "react";
import BookingCard from "./BookingCard";

const BookingsTab = ({
  bookings,
  loading,
  messages,
  newMessage,
  setNewMessage,
  fetchMessages,
  sendMessage,
  userId,
  updateBookingStatus, // buddy only
}) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [chatMode, setChatMode] = useState(null); // "history" or "live"

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
          updateBookingStatus={updateBookingStatus} // only used for Buddy side
        />
      ))}

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">You don&apos;t have any bookings yet.</p>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
