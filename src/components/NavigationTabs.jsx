// components/NavigationTabs.jsx
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab("buddies")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "buddies"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Find Buddies
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "bookings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          My Bookings
        </button>
      </nav>
    </div>
  );
};

export default NavigationTabs;