import { useState } from "react";

const BuddyCard = ({
  buddy = {
    name: "John Doe",
    buddyProfile: {
      expertise: ["React", "Node.js", "UI/UX", "TypeScript", "MongoDB"],
      location: "San Francisco, CA",
      languages: ["English", "Spanish"],
      baseRate: 500,
      availableDates: ["2025-10-10", "2025-10-15", "2025-10-20"],
      bio: "Experienced developer with 5+ years in web development. Passionate about helping others learn and grow. Specialized in modern JavaScript frameworks and cloud technologies.",
    },
  },
  setSelectedBuddy,
  setShowBookingModal,
  credits = 10,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBookClick = () => {
    if (credits <= 0) {
      alert("You don't have enough credits. Please buy credits first.");
      return;
    }
    if (setSelectedBuddy) setSelectedBuddy(buddy);
    if (setShowBookingModal) setShowBookingModal(true);
  };

  const profile = buddy.buddyProfile || {};
  const expertise = profile.expertise || [];
  const languages = profile.languages || [];
  const availableDates = profile.availableDates || [];
  const bioText = profile.bio || "No bio provided";
  const truncatedBio =
    bioText.length > 120 ? bioText.slice(0, 120) + "..." : bioText;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-5 sm:p-6">
        {/* Header Section - Stacked on Mobile */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Top Row: Avatar + Name + Rating */}
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <div className="h-14 w-14 rounded-2xl  bg-gray-200 flex items-center justify-center shadow-lg group-hover:shadow-blue-200/50 transition-shadow duration-300">
                <span className="text-blue-600 font-bold text-lg">
                  {buddy.name ? buddy.name.charAt(0).toUpperCase() : "B"}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 break-words">
                  {buddy.name || "Buddy"}
                </h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-semibold text-yellow-700">
                    4.9
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span className="truncate">
                  {profile.location || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Rate Badge - Full Width on Mobile */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span className="text-xs text-gray-600 font-medium">
                Base Rate
              </span>
            </div>
            <div className="text-xl font-bold text-blue-700">
              ₹{profile.baseRate || "N/A"}
              <span className="text-sm font-medium text-gray-600">/hr</span>
            </div>
          </div>
        </div>

        {/* Expertise Tags */}
        {expertise.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {expertise.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-100/50 shadow-sm"
                >
                  {skill}
                </span>
              ))}
              {expertise.length > 3 && (
                <span className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200">
                  +{expertise.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Bio Section */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {isExpanded ? bioText : truncatedBio}
          </p>
          {bioText.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 text-sm font-semibold mt-2 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
            >
              <span>{isExpanded ? "Show less" : "Read more"}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Details Grid */}
        <div className="space-y-3 mb-5 pb-4 border-b border-gray-100">
          {/* Languages */}
          {languages.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-gray-500 font-semibold block mb-0.5">
                  Languages
                </span>
                <p className="text-sm text-gray-800 font-medium">
                  {languages.join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Available Dates */}
          {availableDates.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-gray-500 font-semibold block mb-0.5">
                  Next Available
                </span>
                <p className="text-sm text-gray-800 font-medium">
                  {new Date(availableDates[0]).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {availableDates.length > 1 && (
                    <span className="text-blue-600 ml-1">
                      +{availableDates.length - 1} dates
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleBookClick}
          disabled={credits <= 0}
          className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
            credits <= 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
          }`}
        >
          {credits <= 0 ? (
            <>
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>No Credits Available</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Book Session</span>
              <span className="ml-auto bg-white/20 px-2 py-1 rounded text-xs">
                1 Credit
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BuddyCard;
