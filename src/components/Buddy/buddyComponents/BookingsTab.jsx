import React, { useState, useMemo, useCallback } from "react";
import BookingCard from "./BookingCard";
import ChatTab from "./ChatTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCalendarAlt,
  faSearch,
  faSort,
  faXmark,
  faComment,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const BookingsTab = ({ bookings, loading, onFetchBookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [chatMode, setChatMode] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeChatTab, setActiveChatTab] = useState(null); // 'history' or 'live'

  const filters = useMemo(
    () => [
      {
        id: "",
        label: "All",
        color: "bg-gray-100 text-gray-800 border-gray-300",
        activeColor: "bg-gray-800 text-white border-gray-800",
      },
      {
        id: "Pending",
        label: "Pending",
        color: "bg-yellow-50 text-yellow-800 border-yellow-200",
        activeColor: "bg-yellow-600 text-white border-yellow-600",
      },
      {
        id: "Confirmed",
        label: "Confirmed",
        color: "bg-green-50 text-green-800 border-green-200",
        activeColor: "bg-green-600 text-white border-green-600",
      },
      {
        id: "Declined",
        label: "Declined",
        color: "bg-red-50 text-red-800 border-red-200",
        activeColor: "bg-red-600 text-white border-red-600",
      },
    ],
    []
  );

  const filteredAndSortedBookings = useMemo(() => {
    let result = bookings.filter(
      (booking) =>
        booking.serviceName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        booking.customerName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        booking._id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "service":
          return (a.serviceName || "").localeCompare(b.serviceName || "");
        default:
          return 0;
      }
    });
    return result;
  }, [bookings, searchQuery, sortBy]);

  const handleFilterChange = useCallback(
    (filterId) => {
      setActiveFilter(filterId);
      onFetchBookings(filterId);
    },
    [onFetchBookings]
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

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setActiveFilter("");
    onFetchBookings("");
  }, [onFetchBookings]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Chat Tab Header - When a chat is active */}
      {activeChatTab && currentBooking && (
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon 
                  icon={activeChatTab === "history" ? faComment : faCommentDots} 
                  className={activeChatTab === "history" ? "text-blue-600" : "text-purple-600"}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {activeChatTab === "history" ? "Message History" : "Live Chat"} 
                    <span className="text-gray-500 font-normal ml-2">
                      • Booking #{currentBooking._id?.slice(-6)}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    with {currentBooking.customer?.name || "Customer"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseChatTab}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close Chat"
              >
                <FontAwesomeIcon icon={faXmark} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with conditional layout */}
      <div className={`${activeChatTab ? 'hidden' : 'block'}`}>
        {/* ===== Sticky Filters Section ===== */}
        <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block py-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                {/* Search + Sort Row */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 text-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="text-gray-400 text-xs"
                        />
                      </button>
                    )}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative w-40">
                    <FontAwesomeIcon
                      icon={faSort}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10"
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white cursor-pointer text-sm shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                </div>

                {/* Status Filters */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Filter by status:
                    </span>
                    {activeFilter && (
                      <button
                        onClick={() => handleFilterChange("")}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
                    {filters.map((filter) => {
                      const isActive = activeFilter === filter.id;
                      return (
                        <button
                          key={filter.id}
                          onClick={() => handleFilterChange(filter.id)}
                          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 min-w-[90px] ${
                            isActive
                              ? filter.activeColor + " shadow-md scale-105"
                              : filter.color +
                                " hover:shadow-sm hover:scale-[1.02]"
                          }`}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden py-4 space-y-3">
              {/* Search + Sort Bar */}
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="text-gray-400 text-xs"
                      />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-28">
                  <FontAwesomeIcon
                    icon={faSort}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs z-10"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm cursor-pointer transition-all duration-200"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="service">Service</option>
                  </select>
                </div>
              </div>

              {/* Status Filters */}
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Filter by status:
                  </span>
                  {activeFilter && (
                    <button
                      onClick={() => handleFilterChange("")}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {filters.map((filter) => {
                    const isActive = activeFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => handleFilterChange(filter.id)}
                        className={`flex-shrink-0 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 min-w-[85px] ${
                          isActive
                            ? filter.activeColor + " shadow-sm scale-105"
                            : filter.color + " hover:shadow-sm hover:scale-[1.02]"
                        }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bookings Grid ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedBookings.length > 0 ? (
              filteredAndSortedBookings.map((booking, index) => (
                <div
                  key={booking._id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <BookingCard
                    booking={booking}
                    isSelected={selectedBooking === booking._id}
                    chatMode={chatMode}
                    onSelectBooking={handleSelectBooking}
                    onChatModeChange={setChatMode}
                    onOpenChatTab={handleOpenChatTab}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12 sm:py-16 bg-white rounded-2xl shadow-sm border border-gray-100 col-span-full">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-300 text-5xl sm:text-6xl mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {searchQuery || activeFilter
                    ? "No matching bookings"
                    : "No bookings yet"}
                </h3>
                <p className="text-gray-600 max-w-sm mx-auto mb-6">
                  {searchQuery || activeFilter
                    ? "Try adjusting your search criteria or filters to find what you're looking for."
                    : "When customers book your services, they'll appear here for you to manage."}
                </p>
                {(searchQuery || activeFilter) && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Tab Content */}
      {activeChatTab && currentBooking && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ChatTab
            booking={currentBooking}
            mode={activeChatTab}
            onClose={handleCloseChatTab}
            onOpenChatTab={handleOpenChatTab}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(BookingsTab);