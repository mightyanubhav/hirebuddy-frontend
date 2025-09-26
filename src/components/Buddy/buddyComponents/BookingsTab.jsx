import React, { useState } from "react";
import BookingCard from "./BookingCard";

const BookingsTab = ({ bookings, loading, onFetchBookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [chatMode, setChatMode] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-medium mb-4">Filter Bookings</h2>
        <div className="flex space-x-4">
          {["", "Pending", "Confirmed", "Declined"].map((status) => (
            <button
              key={status || "All"}
              onClick={() => onFetchBookings(status)}
              className={`py-2 px-4 rounded-md ${
                status === ""
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  : status === "Pending"
                  ? "bg-yellow-200 hover:bg-yellow-300 text-yellow-800"
                  : status === "Confirmed"
                  ? "bg-green-200 hover:bg-green-300 text-green-800"
                  : "bg-red-200 hover:bg-red-300 text-red-800"
              }`}
            >
              {status || "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            isSelected={selectedBooking === booking._id}
            chatMode={chatMode}
            onSelectBooking={setSelectedBooking}
            onChatModeChange={setChatMode}
          />
        ))}
      </div>

      {bookings.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;