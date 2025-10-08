// components/NavigationTabs.jsx
import { useEffect, useRef, useState } from "react";

// Custom hook for sticky behavior (same as Filters)
const useSticky = (stickyOffset = 120) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > stickyOffset);
    };

    let ticking = false;
    const updateSticky = () => {
      handleScroll();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateSticky);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [stickyOffset]);

  return isSticky;
};

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "buddies", label: "Find Buddies", icon: "👥" },
    { id: "bookings", label: "My Bookings", icon: "📅" }
  ];

  const underlineRef = useRef(null);
  const isSticky = useSticky(120); // Same 120px threshold as Filters

  useEffect(() => {
    const activeElement = document.querySelector(`[data-tab="${activeTab}"]`);
    if (activeElement && underlineRef.current) {
      const { offsetLeft, offsetWidth } = activeElement;
      underlineRef.current.style.transform = `translateX(${offsetLeft}px)`;
      underlineRef.current.style.width = `${offsetWidth}px`;
    }
  }, [activeTab, isSticky]);

  return (
    <div className={`border-b border-gray-200 bg-white relative transition-all duration-300 ${
      isSticky 
        ? "sticky top-0 z-70 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm pt-4" 
        : "pt-10"
    }`}>
      <nav className="-mb-px flex space-x-8 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-tab={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 font-semibold text-sm transition-colors duration-300 z-10 ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </span>
          </button>
        ))}
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out"
        />
      </nav>
    </div>
  );
};

export default NavigationTabs;