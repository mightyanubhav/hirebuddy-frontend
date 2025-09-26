import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

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
    <section className="py-12  bg-blue-700  text-white">
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


// Main App Component
const Body = () => {
  return (
    <div className="App">
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection /> 
    </div>
  );
};

export default Body;