import React, { useState, useEffect } from "react";
import { backend_url } from "../../../context/HardCodedValues";

const ProfileModal = ({ profileData, onProfileDataChange, onClose, user }) => {
  const [previewImage, setPreviewImage] = useState(
    profileData.profileImage?.url ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  setPreviewImage(
    profileData.profileImage?.url ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
}, [profileData.profileImage]);


  const updateProfile = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = user?.token;
      const formData = new FormData();

      if (profileData.profileImage instanceof File) {
        formData.append("profileImage", profileData.profileImage);
      }

      formData.append("baseRate", profileData.baseRate || "");
      formData.append("location", profileData.location || "");
      formData.append("bio", profileData.bio || "");

      // Convert string or array to comma-separated
      formData.append(
        "expertise",
        Array.isArray(profileData.expertise)
          ? profileData.expertise.join(",")
          : profileData.expertise || ""
      );
      formData.append(
        "languages",
        Array.isArray(profileData.languages)
          ? profileData.languages.join(",")
          : profileData.languages || ""
      );

      (profileData.availableDates || []).forEach((date) => {
        formData.append("availableDates", date);
      });

      const response = await fetch(`${backend_url}/buddy/profileEdit`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateImage = (file) => {
    const MAX_SIZE = 700 * 1024; // 700 KB in bytes
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid image file (JPEG, PNG, GIF, WebP).";
    }

    if (file.size > MAX_SIZE) {
      return "Image size must be less than 700 KB.";
    }

    return "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateImage(file);
    setImageError(error);

    if (error) {
      // Reset the file input
      e.target.value = "";
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    onProfileDataChange({ ...profileData, profileImage: file });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate < today) {
      alert("You cannot select a date before today!");
      return;
    }

    // Check if date already exists
    if (profileData.availableDates?.includes(selectedDate)) {
      alert("This date is already added to your availability!");
      return;
    }

    const updatedDates = [...(profileData.availableDates || []), selectedDate];
    onProfileDataChange({ ...profileData, availableDates: updatedDates });
  };

  const removeDate = (dateToRemove) => {
    const updatedDates = profileData.availableDates?.filter(
      (date) => date !== dateToRemove
    );
    onProfileDataChange({ ...profileData, availableDates: updatedDates });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm transition-opacity duration-300">
      {/* Scrollable container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
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

        <div className="p-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <img
                src={previewImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg transition-all duration-300 group-hover:border-blue-600"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            <label className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg inline-flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {imageError && (
              <div className="mt-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {imageError}
              </div>
            )}

            <p className="mt-2 text-xs text-gray-500 text-center">
              Supported formats: JPEG, PNG, GIF, WebP • Max size: 700 KB
            </p>
          </div>

          <form onSubmit={updateProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Base Rate */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Base Rate (₹/hour)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={profileData.baseRate}
                    onChange={(e) =>
                      onProfileDataChange({
                        ...profileData,
                        baseRate: e.target.value,
                      })
                    }
                    className="pl-8 mt-1 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
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
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your city"
                />
              </div>

              {/* Expertise */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
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
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="e.g., Yoga, Fitness, Meditation"
                />
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
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
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="e.g., English, Hindi"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  onProfileDataChange({ ...profileData, bio: e.target.value })
                }
                rows="4"
                className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Tell us about yourself and your expertise..."
              />
            </div>

            {/* Available Date Picker */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Available Date
              </label>
              <input
                type="date"
                onChange={handleDateChange}
                className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                min={new Date().toISOString().split("T")[0]}
              />

              {profileData.availableDates?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Selected Dates:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.availableDates.map((date, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg flex items-center text-sm font-medium"
                      >
                        <span>{new Date(date).toLocaleDateString()}</span>
                        <button
                          type="button"
                          onClick={() => removeDate(date)}
                          className="ml-2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
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
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 sticky bottom-0 bg-white pt-6 pb-2 border-t border-gray-200 -mx-6 px-6">
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
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
