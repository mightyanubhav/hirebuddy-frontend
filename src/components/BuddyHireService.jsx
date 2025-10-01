import React, { useState } from "react";

const BuddyHireService = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  const services = [
    {
      title: "Tour Guide Buddy",
      description:
        "Explore new places with knowledgeable local guides who show you hidden gems and attractions.",
      icon: "🗺️",
      hourly: "Rs -25/hour",
      daily: "Rs -180/day",
      features: ["Local expertise", "Custom itineraries", "Photo help", "Culture"],
    },
    {
      title: "Hand Help Assistant",
      description:
        "Assistance with daily tasks, moving help, or event setup with reliable buddies.",
      icon: "🤝",
      hourly: "Rs -20/hour",
      daily: "Rs -140/day",
      features: ["Heavy lifting", "Assembly help", "Event setup", "Quick tasks"],
    },
    {
      title: "Accommodation Finder",
      description: "Find the perfect stay with experts who know the best areas.",
      icon: "🏠",
      hourly: "Rs -30/hour",
      daily: "Rs -200/day",
      features: ["Neighborhood tours", "Negotiation help", "Paperwork", "Insights"],
    },
    {
      title: "Chatting Companion",
      description: "Friendly companions for meaningful conversations anytime.",
      icon: "💬",
      hourly: "Rs -15/hour",
      daily: "Rs -100/day",
      features: ["Multi-language", "Cultural exchange", "Stories", "Friendship"],
    },
    {
      title: "Shopping Buddy",
      description: "Shop smart with personal shopping assistants & stylists.",
      icon: "🛍️",
      hourly: "Rs -22/hour",
      daily: "Rs -150/day",
      features: ["Fashion advice", "Styling", "Deals", "Gift selection"],
    },
    {
      title: "Pickup & Drop",
      description: "Reliable transport services with trusted local drivers.",
      icon: "🚗",
      hourly: "Rs -28/hour",
      daily: "Rs -190/day",
      features: ["Safe drivers", "Comfortable rides", "Multiple stops", "Luggage help"],
    },
  ];

  const whyChooseUs = [
    { title: "Verified & Trusted", description: "Background checked and verified buddies for safety." },
    { title: "Flexible Booking", description: "Hourly or daily options to fit your budget." },
    { title: "24/7 Support", description: "Always here to help you anytime, anywhere." },
    { title: "Instant Matching", description: "Get matched with the right buddy in minutes." },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow z-50">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-extrabold text-xl text-blue-700">HireBuddy</div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-8 text-gray-700 font-medium">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#pricing" className="hover:text-blue-600">Pricing</a>
            <a href="#why-us" className="hover:text-blue-600">Why Us</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex space-x-3">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Become a Buddy
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-gray-800 transition Rs -{isMenuOpen && "rotate-45 translate-y-2"}`} />
              <span className={`h-0.5 w-full bg-gray-800 transition Rs -{isMenuOpen && "opacity-0"}`} />
              <span className={`h-0.5 w-full bg-gray-800 transition Rs -{isMenuOpen && "-rotate-45 -translate-y-2"}`} />
            </div>
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="flex flex-col space-y-3 p-4">
              <a href="#services" className="hover:text-blue-600">Services</a>
              <a href="#pricing" className="hover:text-blue-600">Pricing</a>
              <a href="#why-us" className="hover:text-blue-600">Why Us</a>
              <a href="#contact" className="hover:text-blue-600">Contact</a>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                Become a Buddy
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Book Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-28 pb-16 text-center px-4">
        <h1
          className={`text-4xl sm:text-5xl font-extrabold mb-6 transition-all duration-1000 Rs -{
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Your Perfect Buddy <br />
          <span className="text-blue-600">Is Just a Click Away</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Hire trusted local buddies for guiding, assistance, shopping, companionship & more. 
          <span className="text-gray-800 font-medium"> Flexible hourly or daily bookings.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition">
            Book Your Buddy
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition">
            Become a Buddy
          </button>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose BuddyHire?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide the best buddy experience with verified, reliable, and flexible services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services & Pricing</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose from a wide range of services with flexible hourly or daily rates.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-600 mb-4">{s.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between bg-blue-50 px-3 py-2 rounded">
                      <span>Hourly</span> <span className="text-blue-600 font-bold">{s.hourly}</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                      <span>Full Day</span> <span className="text-blue-600 font-bold">{s.daily}</span>
                    </div>
                  </div>
                  <ul className="text-gray-600 mb-6 space-y-1">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Have questions? Our team is ready to help you anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Contact Info</h3>
              <p className="text-gray-600 mb-2">📍 Bangalore, India</p>
              <p className="text-gray-600 mb-2">📧 support@hirebuddy.com</p>
              <p className="text-gray-600">📞 +91 98765 43210</p>
            </div>
            <form className="bg-white p-6 rounded-xl shadow space-y-4">
              <input type="text" placeholder="Name" className="w-full border rounded-lg px-3 py-2" />
              <input type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2" />
              <textarea rows="4" placeholder="Message" className="w-full border rounded-lg px-3 py-2"></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">BuddyHire</h3>
            <p>Your trusted partner for all buddy services.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Services</h4>
            <ul className="space-y-1">
              {services.slice(0, 4).map((s, i) => (
                <li key={i}><a href="#" className="hover:text-white">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
          © 2024 BuddyHire. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BuddyHireService;
