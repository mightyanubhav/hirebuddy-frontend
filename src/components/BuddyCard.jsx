// components/BuddyCard.jsx
const BuddyCard = ({ buddy, setSelectedBuddy, setShowBookingModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">
              {buddy.name ? buddy.name.charAt(0).toUpperCase() : "B"}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium">{buddy.name || "Buddy"}</h3>
            <p className="text-gray-500">
              {buddy.buddyProfile?.expertise?.join(", ") || "No expertise listed"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-medium">Location:</span>{" "}
            {buddy.buddyProfile?.location || "Not specified"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Languages:</span>{" "}
            {buddy.buddyProfile?.languages?.join(", ") || "Not specified"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Base Rate:</span> ₹
            {buddy.buddyProfile?.baseRate || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Available Dates:</span>{" "}
            {buddy.buddyProfile?.availableDates?.join(", ") || "Not specified"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Bio:</span>{" "}
            {buddy.buddyProfile?.bio || "No bio provided"}
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedBuddy(buddy);
            setShowBookingModal(true);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Book This Buddy
        </button>
      </div>
    </div>
  );
};

export default BuddyCard;