import React, { useState, useEffect } from "react";
import { backend_url } from "../../../context/HardCodedValues";

const AvailabilityModal = ({ profileData, onClose, user }) => {
  const [availabilityDates, setAvailabilityDates] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setAvailabilityDates(profileData.buddyProfile?.availableDates || []);
  }, [profileData]);

  const addAvailabilityDate = () => {
    setError("");
    
    if (!newDate) {
      setError("Please select a date");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (newDate < today) {
      setError("Cannot select past dates");
      return;
    }

    if (availabilityDates.includes(newDate)) {
      setError("This date is already added");
      return;
    }

    setAvailabilityDates([...availabilityDates, newDate]);
    setNewDate("");
  };

  const removeAvailabilityDate = (dateToRemove) => {
    setAvailabilityDates(availabilityDates.filter((date) => date !== dateToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAvailabilityDate();
    }
  };

  const updateAvailability = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ availableDates: availabilityDates }),
      });

      if (response.ok) {
        alert("✅ Availability updated successfully!");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`❌ Availability update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("❌ Availability update failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAllDates = () => {
    if (availabilityDates.length === 0) return;
    
    if (window.confirm("Are you sure you want to clear all available dates?")) {
      setAvailabilityDates([]);
    }
  };

  const getSortedDates = () => {
    return [...availabilityDates].sort((a, b) => new Date(a) - new Date(b));
  };

  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const isDateInPast = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString < today;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Set Availability</h2>
              <p className="text-sm text-gray-600 mt-1">
                Add dates when you're available for sessions
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={updateAvailability}>
            {/* Date Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Available Date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => {
                    setNewDate(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex-1 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={addAvailabilityDate}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
              
              {error && (
                <div className="mt-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200 flex items-center">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
            </div>

            {/* Available Dates List */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Available Dates ({availabilityDates.length})
                </label>
                {availabilityDates.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllDates}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear All
                  </button>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                {availabilityDates.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {getSortedDates().map((date, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center py-3 px-4 transition-colors duration-200 ${
                          isDateInPast(date) ? 'bg-gray-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            isDateInPast(date) ? 'bg-gray-400' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <span className={`font-medium ${
                              isDateInPast(date) ? 'text-gray-500 line-through' : 'text-gray-700'
                            }`}>
                              {formatDateDisplay(date)}
                            </span>
                            {isDateInPast(date) && (
                              <span className="text-xs text-gray-500 ml-2">(Past)</span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAvailabilityDate(date)}
                          className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                          title="Remove date"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 text-sm">No dates added yet</p>
                    <p className="text-gray-400 text-xs mt-1">Add dates using the input above</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || availabilityDates.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Availability"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;