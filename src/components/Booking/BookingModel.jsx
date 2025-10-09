// components/BookingModal.jsx
const BookingModal = ({
  selectedBuddy,
  bookingDate,
  bookingLocation,
  setBookingDate,
  setBookingLocation,
  setShowBookingModal,
  handleBooking,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBooking(e);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        {/* Header */}
        <div className="bg-gray-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-md">
                {selectedBuddy?.profileImage?.url ? (
                  <img
                    src={selectedBuddy.profileImage.url}
                    alt={selectedBuddy.name || "Buddy"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {selectedBuddy.name?.charAt(0).toUpperCase() || "B"}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Book Session</h2>
                <p className="text-gray-100 text-sm">
                  with {selectedBuddy.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowBookingModal(false)}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Session Date
            </label>
            <div className="relative">
              <input
                type="date"
                required
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100 transition-all duration-200 bg-white shadow-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Select a future date for your session
            </p>
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Session Location
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={bookingLocation}
                onChange={(e) => setBookingLocation(e.target.value)}
                placeholder="Enter location (e.g., Station name, Point address)"
                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100 transition-all duration-200 bg-white shadow-sm placeholder-gray-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Specify where the session will take place
            </p>
          </div>

          {/* Cost Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Session Cost
              </span>
              <span className="text-lg font-bold text-gray-700">
                ₹{selectedBuddy.buddyProfile?.baseRate || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Credit Required</span>
              <span className="font-semibold">1 Credit</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-3.5 rounded-lg font-medium transition-all duration-200 hover:shadow-sm border border-gray-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1  bg-gray-600  hover:from-gray-700 hover:to-indigo-700 text-white py-2.5 px-3.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Confirm
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              You'll be able to chat with {selectedBuddy.name} after booking
              confirmation
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
