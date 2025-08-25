// components/BookingsTab.jsx
import BookingCard from "./BookingCard";

const BookingsTab = ({
  loading,
  bookings,
  messages,
  newMessage,
  selectedBooking,
  setNewMessage,
  fetchMessages,
  sendMessage,
  userId
}) => {
  return (
    <div className="py-6">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              messages={messages}
              newMessage={newMessage}
              selectedBooking={selectedBooking}
              setNewMessage={setNewMessage}
              fetchMessages={fetchMessages}
              sendMessage={sendMessage}
              userId={userId}
            />
          ))}
        </div>
      )}

      {bookings.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;