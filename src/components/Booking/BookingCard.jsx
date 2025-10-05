// components/BookingCard.jsx
import MessagesSection from "./MessagesSection";
import SocketMessages from "./SocketMessages";

const BookingCard = ({
  booking = {
    _id: "1",
    buddy: { name: "Alex Johnson" },
    customer: { name: "Sarah Smith" },
    date: "2025-10-15",
    location: "San Francisco, CA",
    status: "Confirmed",
  },
  messages = [],
  newMessage = "",
  setNewMessage,
  fetchMessages,
  sendMessage,
  userId,
  selectedBooking,
  setSelectedBooking,
  chatMode,
  setChatMode,
  updateBookingStatus,
}) => {
  const isExpanded = selectedBooking === booking._id;
  const statusColors = {
    Confirmed: "bg-green-50 text-green-700 border-green-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Declined: "bg-red-50 text-red-700 border-red-200",
    declined: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white font-bold text-lg">
                {(booking.buddy?.name || booking.customer?.name || "B").charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {booking.buddy?.name || booking.customer?.name}
              </h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status] || statusColors.Pending}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-700">
              {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-sm text-gray-700 truncate">{booking.location}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100">
          {updateBookingStatus && booking.status === "Pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => updateBookingStatus(booking._id, "Confirmed")}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Accept
              </button>
              <button
                onClick={() => updateBookingStatus(booking._id, "Declined")}
                className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Decline
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setSelectedBooking(booking._id);
              setChatMode("history");
              if (fetchMessages) fetchMessages(booking._id);
            }}
            className={`flex-1 sm:flex-none py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isExpanded && chatMode === "history"
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Messages
          </button>

          <button
            onClick={() => {
              setSelectedBooking(booking._id);
              setChatMode("live");
            }}
            className={`flex-1 sm:flex-none py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isExpanded && chatMode === "live"
                ? "bg-purple-600 text-white"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Chat
          </button>
        </div>
      </div>

      {/* Expanded Sections */}
      {isExpanded && chatMode === "history" && (
        <div className="border-t border-gray-100 bg-gray-50">
          <MessagesSection
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            userId={userId}
          />
        </div>
      )}

      {isExpanded && chatMode === "live" && (
        <div className="border-t border-gray-100">
          <SocketMessages bookingId={booking._id} userId={userId} />
        </div>
      )}
    </div>
  );
};

export default BookingCard;
