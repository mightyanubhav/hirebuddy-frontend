
const ProfileTab = ({ profileData }) => {
  // console.log(profileData);
  const profileImg =
  profileData?.profileImage?.url
    ? profileData.profileImage.url
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const formatDate = (dateString) => {
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

  const getSortedDates = () => {
    return profileData.buddyProfile?.availableDates
      ? [...profileData.buddyProfile.availableDates].sort((a, b) => new Date(a) - new Date(b))
      : [];
  };

  return (
    <div className="py-6 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 pb-8 mb-8 border-b border-gray-100">
          <div className="relative">
            <img
              src={profileImg}
              alt="Profile"
              className="w-36 h-36 rounded-2xl object-cover border-4 border-white shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              👑 Pro Buddy
            </div>
          </div>
          
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {profileData.name || "Unnamed User"}
            </h1>
            <p className="text-gray-600 text-lg mb-3 flex items-center justify-center lg:justify-start">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {profileData.email || "No email provided"}
            </p>
            
            {profileData.buddyProfile?.location && (
              <p className="text-gray-500 flex items-center justify-center lg:justify-start">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profileData.buddyProfile.location}
              </p>
            )}
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center min-w-[200px] border border-blue-100">
            <div className="text-2xl font-bold text-blue-700 mb-1">
              {profileData.buddyProfile?.baseRate ? `₹${profileData.buddyProfile.baseRate}` : "N/A"}
            </div>
            <div className="text-sm text-blue-600 font-medium">Hourly Rate</div>
            <div className="text-xs text-blue-500 mt-2">per session</div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Professional Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Expertise</span>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {profileData.buddyProfile?.expertise?.length > 0 ? (
                      profileData.buddyProfile.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">Not specified</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Languages</span>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {profileData.buddyProfile?.languages?.length > 0 ? (
                      profileData.buddyProfile.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {language}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">Not specified</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-700">Member Since</span>
                  <span className="text-gray-600">
                    {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {profileData.buddyProfile?.bio && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                  {profileData.buddyProfile.bio}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Availability */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Availability Schedule
              </h3>
              
              <div className="space-y-3">
                {getSortedDates().length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
                    {getSortedDates().map((date, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          isDateInPast(date)
                            ? 'bg-gray-100 border-gray-300 opacity-60'
                            : 'bg-white border-green-200 hover:border-green-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              isDateInPast(date) ? 'bg-gray-400' : 'bg-green-500'
                            }`}></div>
                            <span className={`font-medium ${
                              isDateInPast(date) ? 'text-gray-500' : 'text-gray-700'
                            }`}>
                              {formatDate(date)}
                            </span>
                          </div>
                          {isDateInPast(date) && (
                            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">Past</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 font-medium">No availability set</p>
                    <p className="text-gray-400 text-sm mt-1">Add available dates to get booked</p>
                  </div>
                )}
              </div>

              {/* Availability Stats */}
              {getSortedDates().length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Available Dates:</span>
                    <span className="font-semibold text-blue-600">{getSortedDates().length}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Upcoming Dates:</span>
                    <span className="font-semibold text-green-600">
                      {getSortedDates().filter(date => !isDateInPast(date)).length}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {profileData.buddyProfile?.expertise?.length || 0}
                </div>
                <div className="text-xs text-gray-600 font-medium">Skills</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {profileData.buddyProfile?.languages?.length || 0}
                </div>
                <div className="text-xs text-gray-600 font-medium">Languages</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;