import React, { useState } from 'react';

const HowToOperate = () => {
  const [userType, setUserType] = useState('customer');

  const customerSteps = [
    {
      step: 1,
      title: 'Create Your Account',
      description: 'Sign up and complete your profile with basic information',
      icon: '👤',
      details: ['Download the app from App Store/Play Store', 'Register with email or social media', 'Complete your profile setup']
    },
    {
      step: 2,
      title: 'Find Your Buddy',
      description: 'Browse available buddies based on your needs and location',
      icon: '🔍',
      details: ['Use filters to find the right buddy', 'Check ratings and reviews', 'View buddy profiles and specialties']
    },
    {
      step: 3,
      title: 'Book a Session',
      description: 'Select time, date, and services you need',
      icon: '📅',
      details: ['Choose your preferred time slot', 'Select service duration', 'Add special requests if any']
    },
    {
      step: 4,
      title: 'Make Payment',
      description: 'Secure payment through multiple options',
      icon: '💳',
      details: ['Pay via credit/debit card', 'Use digital wallets', 'Secure and encrypted transactions']
    },
    {
      step: 5,
      title: 'Meet Your Buddy',
      description: 'Connect and get your tasks done',
      icon: '🤝',
      details: ['Real-time tracking', 'In-app messaging', 'Live session updates']
    },
    {
      step: 6,
      title: 'Rate & Review',
      description: 'Share your experience and help others',
      icon: '⭐',
      details: ['Rate your buddy out of 5 stars', 'Write detailed feedback', 'Help improve our community']
    }
  ];

  const buddySteps = [
    {
      step: 1,
      title: 'Apply as Buddy',
      description: 'Complete the buddy application process',
      icon: '📝',
      details: ['Submit personal information', 'Provide service categories', 'Upload required documents']
    },
    {
      step: 2,
      title: 'Verification Process',
      description: 'Get verified through our security checks',
      icon: '✅',
      details: ['Background verification', 'Skill assessment', 'Document validation']
    },
    {
      step: 3,
      title: 'Set Up Profile',
      description: 'Create an attractive profile to attract customers',
      icon: '🎨',
      details: ['Add profile picture and bio', 'Set your service rates', 'Define availability schedule']
    },
    {
      step: 4,
      title: 'Receive Bookings',
      description: 'Get notified when customers book your services',
      icon: '🔔',
      details: ['Real-time booking notifications', 'Booking details and requirements', 'Customer preferences']
    },
    {
      step: 5,
      title: 'Provide Service',
      description: 'Deliver excellent service to your customers',
      icon: '🛠️',
      details: ['Arrive on time for sessions', 'Maintain professional standards', 'Follow safety guidelines']
    },
    {
      step: 6,
      title: 'Get Paid',
      description: 'Receive payments securely and on time',
      icon: '💰',
      details: ['Weekly payout processing', 'Multiple withdrawal options', 'Transparent earnings breakdown']
    }
  ];

  const features = {
    customer: [
      {
        icon: '🎯',
        title: 'Instant Matching',
        description: 'Find the perfect buddy in seconds with our smart matching algorithm'
      },
      {
        icon: '🛡️',
        title: 'Verified Buddies',
        description: 'All buddies are thoroughly verified and background checked'
      },
      {
        icon: '💬',
        title: 'Live Chat',
        description: 'Communicate directly with your buddy through secure in-app messaging'
      },
      {
        icon: '📱',
        title: 'Real-time Tracking',
        description: 'Track your buddy\'s arrival and session progress in real-time'
      }
    ],
    buddy: [
      {
        icon: '⚡',
        title: 'Flexible Schedule',
        description: 'Work when you want and set your own availability hours'
      },
      {
        icon: '💸',
        title: 'Instant Payouts',
        description: 'Get paid quickly with multiple withdrawal options available'
      },
      {
        icon: '📈',
        title: 'Growth Opportunities',
        description: 'Increase your earnings with ratings and repeat customers'
      },
      {
        icon: '🎓',
        title: 'Training Resources',
        description: 'Access training materials to improve your skills and service quality'
      }
    ]
  };

  const currentSteps = userType === 'customer' ? customerSteps : buddySteps;
  const currentFeatures = userType === 'customer' ? features.customer : features.buddy;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-4">How Hire Buddy Works</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {userType === 'customer' 
              ? 'Get things done easily with help from verified buddies'
              : 'Start earning by providing services to customers in your area'
            }
          </p>
        </header>

        {/* User Type Selector */}
        <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="bg-white p-1 rounded-lg border border-gray-300 flex">
              <button
                onClick={() => setUserType('customer')}
                className={`flex-1 py-3 px-4 rounded-md text-center font-semibold transition-all duration-200 ${
                  userType === 'customer'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                👤 For Customers
              </button>
              <button
                onClick={() => setUserType('buddy')}
                className={`flex-1 py-3 px-4 rounded-md text-center font-semibold transition-all duration-200 ${
                  userType === 'buddy'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                🛠️ For Buddies
              </button>
            </div>
          </div>
        </div>

        {/* Quick Features */}
        <section className="px-6 py-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black text-center mb-8">
            Why Choose Hire Buddy {userType === 'customer' ? 'as a Customer' : 'as a Buddy'}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {currentFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="px-6 py-12">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {userType === 'customer' ? 'Getting Started as Customer' : 'Becoming a Buddy'}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {currentSteps.map((step, index) => (
              <div key={step.step} className="flex flex-col md:flex-row gap-6 mb-12 last:mb-0">
                {/* Step Number and Icon */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                    {step.step}
                  </div>
                  <div className="text-3xl my-2">{step.icon}</div>
                  {index < currentSteps.length - 1 && (
                    <div className="hidden md:block flex-1 w-1 bg-blue-200 my-2"></div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-black mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3 text-gray-700 text-sm">
                        <span className="text-blue-500 mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-12 bg-blue-600 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            {userType === 'customer' 
              ? 'Ready to Get Things Done?'
              : 'Ready to Start Earning?'
            }
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {userType === 'customer'
              ? 'Join thousands of customers who are getting their tasks completed efficiently with Hire Buddy'
              : 'Join our community of professional buddies and start earning on your own schedule'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              {userType === 'customer' ? 'Download App Now' : 'Apply as Buddy'}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-black text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {userType === 'customer' ? (
              <>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-black mb-2">How do I choose the right buddy?</h3>
                  <p className="text-gray-600 text-sm">Check their ratings, reviews, specialties, and response time to find the perfect match for your needs.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-black mb-2">What if I need to cancel a booking?</h3>
                  <p className="text-gray-600 text-sm">You can cancel up to 2 hours before the session without any charges. Check our cancellation policy for details.</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-black mb-2">How much can I earn as a buddy?</h3>
                  <p className="text-gray-600 text-sm">Earnings vary based on services, experience, and ratings. Top buddies earn $500-$1000+ per week.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-black mb-2">What support do you provide to buddies?</h3>
                  <p className="text-gray-600 text-sm">We offer 24/7 support, training resources, and tools to help you succeed and grow your business.</p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowToOperate;