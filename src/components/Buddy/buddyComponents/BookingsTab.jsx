import React, { useState, useMemo, useCallback } from "react";
import BookingCard from "./BookingCard";
import ChatTab from "./ChatTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCalendarAlt,
  faFilter,
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { 
  faLayerGroup,  
  faCheck, 
  faXmark 
} from "@fortawesome/free-solid-svg-icons";

const BookingsTab = ({ bookings, loading, onFetchBookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [chatMode, setChatMode] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [activeChatTab, setActiveChatTab] = useState(null);

  const filters = useMemo(
    () => [
      {
        id: "",
        label: "All",
        icon: faFilter,
        gradient: "from-gray-100 to-gray-200",
        activeGradient: "from-gray-700 to-gray-900",
        textColor: "text-gray-700",
        activeTextColor: "text-white",
        borderColor: "border-gray-300",
      },
      {
        id: "Pending",
        label: "Pending",
        icon: faClock,
        gradient: "from-amber-50 to-yellow-100",
        activeGradient: "from-amber-500 to-yellow-600",
        textColor: "text-amber-700",
        activeTextColor: "text-white",
        borderColor: "border-amber-300",
      },
      {
        id: "Confirmed",
        label: "Confirmed",
        icon: faCheckCircle,
        gradient: "from-green-50 to-emerald-100",
        activeGradient: "from-green-500 to-emerald-600",
        textColor: "text-green-700",
        activeTextColor: "text-white",
        borderColor: "border-green-300",
      },
      {
        id: "Declined",
        label: "Declined",
        icon: faTimesCircle,
        gradient: "from-red-50 to-rose-100",
        activeGradient: "from-red-500 to-rose-600",
        textColor: "text-red-700",
        activeTextColor: "text-white",
        borderColor: "border-red-300",
      },
    ],
    []
  );

  // Memoize filtered bookings to prevent re-sorting on every render
  const filteredBookings = useMemo(() => {
    const sorted = [...bookings].sort((a, b) => 
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    return sorted;
  }, [bookings]);

  // Memoize booking counts
  const bookingCounts = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === "Pending").length,
      confirmed: bookings.filter(b => b.status === "Confirmed").length,
      declined: bookings.filter(b => b.status === "Declined").length,
    };
  }, [bookings]);

  const handleFilterChange = useCallback(
    (filterId) => {
      if (filterId === activeFilter) return; // Prevent unnecessary fetch
      setActiveFilter(filterId);
      onFetchBookings(filterId);
    },
    [activeFilter, onFetchBookings]
  );

  const handleSelectBooking = useCallback((bookingId) => {
    setSelectedBooking((prev) => (prev === bookingId ? null : bookingId));
  }, []);

  const handleOpenChatTab = useCallback((bookingId, mode) => {
    setSelectedBooking(bookingId);
    setChatMode(mode);
    setActiveChatTab(mode);
  }, []);

  const handleCloseChatTab = useCallback(() => {
    setActiveChatTab(null);
    setSelectedBooking(null);
    setChatMode(null);
  }, []);

  const clearFilter = useCallback(() => {
    if (activeFilter === "") return;
    setActiveFilter("");
    onFetchBookings("");
  }, [activeFilter, onFetchBookings]);

  // Get the current booking for chat tab
  const currentBooking = useMemo(() => {
    return bookings.find(booking => booking._id === selectedBooking);
  }, [bookings, selectedBooking]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 space-y-4">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-blue-600 text-4xl"
        />
        <p className="text-gray-600 text-lg font-medium">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      {/* Main Content with conditional layout */}
      <div className={`${activeChatTab ? 'hidden' : 'block'}`}>
        {/* Enhanced Filters Section */}
        <FilterBar 
          filters={filters}
          activeFilter={activeFilter}
          bookingCounts={bookingCounts}
          onFilterChange={handleFilterChange}
        />

        {/* Bookings Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats Summary */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 font-medium">
              Showing {filteredBookings.length} of {bookingCounts.total} booking{bookingCounts.total !== 1 ? 's' : ''}
              {activeFilter && (
                <>
                  <span className="text-gray-400 mx-1">•</span>
                  <span className="text-gray-700">
                    {filters.find(f => f.id === activeFilter)?.label}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Bookings Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  isSelected={selectedBooking === booking._id}
                  chatMode={chatMode}
                  onSelectBooking={handleSelectBooking}
                  onChatModeChange={setChatMode}
                  onOpenChatTab={handleOpenChatTab}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200 col-span-full">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-300 text-6xl mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activeFilter ? "No matching bookings" : "No bookings yet"}
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed px-4">
                  {activeFilter
                    ? `No ${activeFilter.toLowerCase()} bookings found. Try selecting a different filter.`
                    : "When customers book your services, they'll appear here for you to manage."}
                </p>
                {activeFilter && (
                  <button
                    onClick={clearFilter}
                    className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:from-gray-800 hover:to-gray-950 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Show All Bookings
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Tab Content - Mobile Full Screen */}
      {activeChatTab && currentBooking && (
        <div className="fixed inset-0 z-50 bg-white sm:relative sm:inset-auto">
          <div className="h-full sm:max-w-4xl sm:mx-auto sm:px-6 sm:py-6">
            <ChatTab
              booking={currentBooking}
              mode={activeChatTab}
              onClose={handleCloseChatTab}
              onOpenChatTab={handleOpenChatTab}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(BookingsTab);






const FilterBar = React.memo(({ activeFilter, bookingCounts, onFilterChange }) => {
  const filters = [
    {
      id: "",
      icon: faLayerGroup,
      label: "All Bookings",
      count: bookingCounts.total,
      desktopShort: "All",
    },
    {
      id: "Pending", 
      icon: faClock,
      label: "Pending",
      count: bookingCounts.pending,
      desktopShort: "Pending",
    },
    {
      id: "Confirmed",
      icon: faCheck,
      label: "Confirmed", 
      count: bookingCounts.confirmed,
      desktopShort: "Confirmed",
    },
    {
      id: "Declined",
      icon: faXmark,
      label: "Declined",
      count: bookingCounts.declined,
      desktopShort: "Declined",
    }
  ];

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          {/* Mobile: Icons only */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide sm:hidden justify-center">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  title={filter.label}
                  className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={filter.icon}
                    className="text-lg"
                  />
                  
                  {/* Count Badge */}
                  <span className={`absolute -top-1 -right-1 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop: Full text with icons */}
          <div className="hidden sm:flex gap-3 justify-center">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={filter.icon}
                    className={`text-sm ${isActive ? 'scale-110' : ''}`}
                  />
                  <span className="font-medium">{filter.desktopShort}</span>
                  
                  {/* Count Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-bold min-w-[24px] ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});


FilterBar.displayName = 'FilterBar';
