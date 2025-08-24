// components/BuddiesTab.jsx
import BuddyCard from "./BuddyCard";
import Filters from "./Filters";

const BuddiesTab = ({
  loading,
  buddies,
  filters,
  setFilters,
  fetchBuddies,
  setSelectedBuddy,
  setShowBookingModal,
}) => {
  return (
    <div className="py-6">
      <Filters
        filters={filters}
        setFilters={setFilters}
        fetchBuddies={fetchBuddies}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buddies.map((buddy) => (
            <BuddyCard
              key={buddy._id}
              buddy={buddy}
              setSelectedBuddy={setSelectedBuddy}
              setShowBookingModal={setShowBookingModal}
            />
          ))}
        </div>
      )}

      {buddies.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No buddies found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BuddiesTab;