// components/BookingCard.jsx
import MessagesSection from "./MessagesSection";
import SocketMessages from "./SocketMessages";

const BookingCard = ({
  booking,
  messages,
  newMessage,
  setNewMessage,
  fetchMessages,
  sendMessage,
  userId,
  selectedBooking,
  setSelectedBooking,
  chatMode,
  setChatMode,
  updateBookingStatus, // only for Buddy
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">
            Booking with{" "}
            {booking.buddy?.name || booking.customer?.name}
          </h3>
          <p className="text-gray-600">
            <span className="font-medium">Date:</span>{" "}
            {new Date(booking.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {booking.location}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
                booking.status === "Confirmed" || booking.status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : booking.status === "Pending" || booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {booking.status}
            </span>
          </p>
        </div>

        <div className="flex space-x-2">
          {/* Buddy-only: Accept / Decline buttons */}
          {updateBookingStatus && booking.status === "Pending" && (
            <>
              <button
                onClick={() => updateBookingStatus(booking._id, "Confirmed")}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Accept
              </button>
              <button
                onClick={() => updateBookingStatus(booking._id, "Declined")}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              >
                Decline
              </button>
            </>
          )}

          {/* History Messages */}
          <button
            onClick={() => {
              setSelectedBooking(booking._id);
              setChatMode("history");
              fetchMessages(booking._id);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            View Messages
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

      {/* Render Sections */}
      {selectedBooking === booking._id && chatMode === "history" && (
        <MessagesSection
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          userId={userId}
        />
      )}

      {selectedBooking === booking._id && chatMode === "live" && (
        <SocketMessages bookingId={booking._id} userId={userId} />
      )}
    </div>
  );
};

export default BookingCard;
