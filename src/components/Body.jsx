import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import hireBuddyLogo from "../assets/hireBuddy.png";
import { Link } from "react-router-dom";

// Additional Feature Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: "🛍️",
      title: "Shopping Assistance",
      description: "Get help with your shopping from trusted buddies who know the best deals and places."
    },
    {
      icon: "✈️",
      title: "Travel Companions",
      description: "Find travel buddies to explore new places or commute together safely."
    },
    {
      icon: "🏠",
      title: "Accommodation Help",
      description: "Get assistance in finding the perfect stay or roommate for your needs."
    },
    {
      icon: "💬",
      title: "Friendly Chat",
      description: "Connect with people for conversation, advice, or just someone to talk to."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How HireBuddy Helps You</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our platform connects you with trusted helpers for all aspects of daily life</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Frequent Traveler",
      content: "HireBuddy made my solo trips so much more enjoyable and safe. I found great travel companions!"
    },
    {
      name: "Rahul Kapoor",
      role: "Working Professional",
      content: "The shopping assistance feature saved me so much time. My buddy knew all the best places and deals."
    },
    {
      name: "Ananya Patel",
      role: "College Student",
      content: "As someone new to the city, HireBuddy helped me find accommodation and make friends quickly."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied users across India</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative"
            >
              <div className="absolute top-4 right-4 text-blue-500 text-2xl">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">Join thousands of users who are making their daily life easier with HireBuddy</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div
            id="sign-up-button"
            className="px-8 py-4 bg-white text-blue-600 cursor-pointer hover:bg-gray-100 duration-300 rounded-lg flex items-center justify-center text-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Get the App
          </div>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-lg transition-all duration-300 font-medium">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img
                src={hireBuddyLogo}
                alt="hire-buddy logo"
                className="h-8 w-8 mr-3"
              />
              <p className="font-bold text-xl">HireBuddy</p>
            </div>
            <p className="text-gray-400 mb-6">Making daily life easier, more enjoyable, and stress-free.</p>
            <div className="flex space-x-4">
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Product</h3>
            <ul className="space-y-3">
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Help</h3>
            <ul className="space-y-3">
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} HireBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const Body = () => {
  return (
    <div className="App">
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      
      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.3s ease-in forwards;
        }
        
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes gradientXY {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradientXY 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Body;