import { useState } from "react";

const Filters = ({ filters, setFilters, fetchBuddies }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fetchBuddies) fetchBuddies();
    setIsOpen(false);
  };

  const handleReset = () => setFilters({ location: "", expertise: "" });

  const hasFilters = filters.location || filters.expertise;

  return (
    <div className="mb-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-medium shadow-sm flex items-center justify-between"
      >
        <span>{isOpen ? "Hide Filters" : "Search Buddies"}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible Form */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-72 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Location */}
              <div className="relative">
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  placeholder="Location"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {filters.location && (
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, location: "" })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Expertise */}
              <div className="relative">
                <input
                  type="text"
                  value={filters.expertise}
                  onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
                  placeholder="Expertise"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {filters.expertise && (
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, expertise: "" })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasFilters}
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition ${
                  hasFilters ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Reset
              </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-md text-sm font-medium transition shadow-sm"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filters;
