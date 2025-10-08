import BuddyCard from "./BuddyCard";


const BuddiesTab = ({
  loading,
  buddies,
  setSelectedBuddy,
  setShowBookingModal,
  credits,
}) => {
  return (
    <div className="py-6">
     
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Buddies Grid */}
          {buddies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {buddies.map((buddy) => (
                <BuddyCard
                  key={buddy._id}
                  buddy={buddy}
                  setSelectedBuddy={setSelectedBuddy}
                  setShowBookingModal={setShowBookingModal}
                  credits={credits}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No buddies found matching your criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BuddiesTab;
