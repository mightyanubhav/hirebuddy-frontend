// components/BookingCard.jsx
import MessagesSection from "./MessagesSection";

const BookingCard = ({
  booking,
  messages,
  newMessage,
  selectedBooking,
  setNewMessage,
  fetchMessages,
  sendMessage,
  userId
}) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">
            Booking with {booking.buddy?.name}
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
                booking.status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {booking.status}
            </span>
          </p>
        </div>
        <button
          onClick={() => fetchMessages(booking._id)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          View Messages
        </button>
      </div>

      {selectedBooking === booking._id && (
        <MessagesSection
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          userId={userId}
        />
      )}
    </div>
  );
};

export default BookingCard;