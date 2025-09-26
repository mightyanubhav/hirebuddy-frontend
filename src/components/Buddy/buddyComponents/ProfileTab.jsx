import React from "react";

const ProfileTab = ({ profileData }) => {
  return (
    <div className="py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-2">
          {profileData.name || "Unnamed User"}
        </h2>
        <p className="text-gray-600 mb-6">
          {profileData.email || "No email"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Base Rate (₹/hour)
                </label>
                <p className="mt-1">
                  {profileData.buddyProfile?.baseRate || "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <p className="mt-1">
                  {profileData.buddyProfile?.location || "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expertise
                </label>
                <p className="mt-1">
                  {profileData.buddyProfile?.expertise?.length > 0
                    ? profileData.buddyProfile.expertise.join(", ")
                    : "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Languages
                </label>
                <p className="mt-1">
                  {profileData.buddyProfile?.languages?.length > 0
                    ? profileData.buddyProfile.languages.join(", ")
                    : "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <p className="mt-1">
                  {profileData.buddyProfile?.bio || "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Dates
                </label>
                <div className="mt-1">
                  {profileData.buddyProfile?.availableDates?.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {profileData.buddyProfile.availableDates.map((date, index) => (
                        <li key={index}>
                          {new Date(date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No available dates set</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;