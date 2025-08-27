import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faHeart, 
  faThumbsUp, 
  faCheckCircle, 
  faRocket, 
  faAward,
  faUsers,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

const Marquee = ({ 
  items, 
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  gradient = true,
  className = ''
}) => {
  // Default items if none provided
  const defaultItems = [
    { id: 1, content: <><FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" /> Trusted by 10K+ Users</> },
    { id: 2, content: <><FontAwesomeIcon icon={faHeart} className="text-red-500 mr-2" /> Rated 4.9/5 Stars</> },
    { id: 3, content: <><FontAwesomeIcon icon={faThumbsUp} className="text-blue-500 mr-2" /> Easy to Use</> },
    { id: 4, content: <><FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" /> Verified Buddies</> },
    { id: 5, content: <><FontAwesomeIcon icon={faRocket} className="text-purple-500 mr-2" /> Fast Matching</> },
    { id: 6, content: <><FontAwesomeIcon icon={faAward} className="text-yellow-500 mr-2" /> Award Winning Service</> },
    { id: 7, content: <><FontAwesomeIcon icon={faUsers} className="text-indigo-500 mr-2" /> 500+ Active Buddies</> },
    { id: 8, content: <><FontAwesomeIcon icon={faGlobe} className="text-teal-500 mr-2" /> Available Across India</> },
  ];

  const marqueeItems = items || defaultItems;
  
  // Speed classes
  const speedClasses = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast'
  };

  // Direction classes
//   const directionClass = direction === 'right' ? 'animate-marquee-right' : 'animate-marquee';

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      {/* Gradient overlays */}
      {gradient && (
        <>
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        </>
      )}
      
      <div 
        className={`flex whitespace-nowrap ${speedClasses[speed]} ${pauseOnHover ? 'hover:pause' : ''}`}
        style={{ animationDirection: direction === 'right' ? 'reverse' : 'normal' }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            className="mx-8 py-4 flex items-center text-lg font-medium text-gray-700"
          >
            {item.content}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee-fast {
          animation: marquee 20s linear infinite;
        }
        .hover:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

// Example usage in your landing page
const MarqueeSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why People Love HireBuddy ? Scroll to know .</h2> */}
        <Marquee 
          speed="normal" 
          pauseOnHover={true}
          className="border-y border-gray-200 py-2"
        />
      </div>
    </section>
  );
};

export default Marquee;
export { MarqueeSection };