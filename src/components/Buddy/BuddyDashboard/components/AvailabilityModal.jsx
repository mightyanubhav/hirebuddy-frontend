import React, { useState, useEffect } from "react";
import { backend_url } from "../../../../context/HardCodedValues";

const AvailabilityModal = ({ profileData, onClose, user }) => {
  const [availabilityDates, setAvailabilityDates] = useState([]);
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    setAvailabilityDates(profileData.buddyProfile?.availableDates || []);
  }, [profileData]);

  const addAvailabilityDate = () => {
    if (newDate && !availabilityDates.includes(newDate)) {
      setAvailabilityDates([...availabilityDates, newDate]);
      setNewDate("");
    }
  };

  const removeAvailabilityDate = (dateToRemove) => {
    setAvailabilityDates(availabilityDates.filter((date) => date !== dateToRemove));
  };

  const updateAvailability = async (e) => {
    e.preventDefault();
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
        alert("Availability updated successfully!");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Availability update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Availability update failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Set Availability</h2>
        <form onSubmit={updateAvailability}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Add Available Date
            </label>
            <div className="flex mt-1">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addAvailabilityDate}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Available Dates
            </label>
            <div className="mt-1 max-h-40 overflow-y-auto">
              {availabilityDates.length > 0 ? (
                <ul className="border rounded-md divide-y">
                  {availabilityDates.map((date, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 px-3"
                    >
                      <span>{new Date(date).toLocaleDateString()}</span>
                      <button
                        type="button"
                        onClick={() => removeAvailabilityDate(date)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 py-2">No dates added yet</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Save Availability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityModal;