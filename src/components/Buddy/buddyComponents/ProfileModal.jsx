import React from "react";
import { backend_url } from "../../../context/HardCodedValues"

const ProfileModal = ({ profileData, onProfileDataChange, onClose, user }) => {
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/profileEdit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Profile update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={updateProfile}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Base Rate (₹/hour)
              </label>
              <input
                type="number"
                value={profileData.baseRate}
                onChange={(e) =>
                  onProfileDataChange({
                    ...profileData,
                    baseRate: e.target.value,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) =>
                  onProfileDataChange({
                    ...profileData,
                    location: e.target.value,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expertise
              </label>
              <input
                type="text"
                value={profileData.expertise}
                onChange={(e) =>
                  onProfileDataChange({
                    ...profileData,
                    expertise: e.target.value,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Yoga, Fitness, Meditation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Languages
              </label>
              <input
                type="text"
                value={profileData.languages}
                onChange={(e) =>
                  onProfileDataChange({
                    ...profileData,
                    languages: e.target.value,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., English, Hindi"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, bio: e.target.value })
              }
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;