import React from 'react';

const WhyUs = () => {
  const features = [
    {
      icon: '🛡️',
      title: 'Rigorous Verification',
      description: '6-step verification process inspired by industry leaders',
      details: 'Every buddy undergoes comprehensive background checks, document verification, and skill assessments'
    },
    {
      icon: '⚡',
      title: 'Instant Matching',
      description: 'Find the perfect buddy in seconds',
      details: 'Smart algorithm matches you with verified professionals based on your specific needs'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'No hidden charges, no surprises',
      details: 'Know exactly what you pay upfront with clear pricing and multiple payment options'
    },
    {
      icon: '🎯',
      title: 'Quality Assured',
      description: '4.8/5 average customer rating',
      details: 'Continuous quality monitoring and regular performance reviews'
    },
    {
      icon: '🔄',
      title: 'Continuous Monitoring',
      description: '24/7 safety and quality oversight',
      details: 'Real-time tracking and regular re-verification of all buddies'
    },
    {
      icon: '💬',
      title: 'Dedicated Support',
      description: '24/7 customer support',
      details: 'Always available to help with any questions or concerns'
    }
  ];

  const stats = [
    { number: '25+', label: 'Verified Buddies' },
    { number: '10+', label: 'Happy Customers' },
    { number: '99.7%', label: 'Verification Success Rate' },
    { number: '4.8/5', label: 'Customer Rating' },
    { number: '48h', label: 'Avg. Verification Time' },
    { number: '24/7', label: 'Support Available' }
  ];

  const verificationProcess = [
    {
      step: 1,
      title: 'Profile Verification',
      description: 'Government ID and personal information validation'
    },
    {
      step: 2,
      title: 'Background Check',
      description: '7-year criminal record and police verification'
    },
    {
      step: 3,
      title: 'Document Authentication',
      description: 'Address proof and professional certificates verification'
    },
    {
      step: 4,
      title: 'Skill Assessment',
      description: 'Practical evaluation and capability testing'
    },
    {
      step: 5,
      title: 'Training & Orientation',
      description: 'Platform and service standards training'
    },
    {
      step: 6,
      title: 'Final Approval',
      description: 'Quality assurance and platform activation'
    }
  ];

  const howItWorks = {
    customer: [
      { step: 1, title: 'Create Account', description: 'Quick signup and profile setup' },
      { step: 2, title: 'Find Buddy', description: 'Browse verified professionals' },
      { step: 3, title: 'Book Session', description: 'Select time and services needed' },
      { step: 4, title: 'Secure Payment', description: 'Multiple payment options' },
      { step: 5, title: 'Get Service', description: 'Professional service delivery' },
      { step: 6, title: 'Rate & Review', description: 'Share your experience' }
    ],
    buddy: [
      { step: 1, title: 'Apply', description: 'Complete application process' },
      { step: 2, title: 'Get Verified', description: '6-step verification process' },
      { step: 3, title: 'Setup Profile', description: 'Create service portfolio' },
      { step: 4, title: 'Receive Bookings', description: 'Get matched with customers' },
      { step: 5, title: 'Provide Service', description: 'Deliver quality work' },
      { step: 6, title: 'Get Paid', description: 'Secure and timely payments' }
    ]
  };

  const safetyFeatures = [
    {
      icon: '🔒',
      title: 'Real-time Tracking',
      description: 'Live GPS tracking during service sessions'
    },
    {
      icon: '📱',
      title: 'In-app Communication',
      description: 'Secure messaging without sharing personal contacts'
    },
    {
      icon: '⭐',
      title: 'Rating System',
      description: 'Transparent feedback from both customers and buddies'
    },
    {
      icon: '🔄',
      title: 'Regular Re-verification',
      description: 'Periodic background checks and document updates'
    }
  ];

  const trustBadges = [
    { name: 'ISO 27001 Certified', icon: '🏅' },
    { name: 'GDPR Compliant', icon: '🛡️' },
    { name: 'MeitY Approved', icon: '✅' },
    { name: 'FAME India Certified', icon: '📜' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Regular Customer',
      content: 'The verification process gave me confidence to use the service. My buddy was professional and trustworthy.',
      rating: 5
    },
    {
      name: 'Rahul Kumar',
      role: 'Home Service User',
      content: 'Love the transparent pricing and the quality of service. The app is so easy to use!',
      rating: 5
    },
    {
      name: 'Anita Patel',
      role: 'Hire Buddy Partner',
      content: 'As a buddy, the verification process was thorough but fair. I feel proud to be part of this trusted platform.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Why Choose <span className="text-blue-600">Hire Buddy</span>?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're redefining service delivery in India with trust, technology, and transparency at our core. 
            Here's why millions choose us every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Get Started Today
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Download App
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-4">
            What Makes Us Different
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We combine cutting-edge technology with rigorous safety standards to deliver exceptional service experiences
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{feature.description}</p>
                <p className="text-gray-600 text-sm">{feature.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-4">
            Industry-Leading Verification
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Inspired by Uber, Swiggy, and Amazon - our 6-step verification ensures only the most trustworthy professionals serve you
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verificationProcess.map((step) => (
              <div key={step.step} className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-black">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-12">
            Simple & Seamless Experience
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Customer Flow */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">👤</span>
                <h3 className="text-2xl font-bold text-black">For Customers</h3>
              </div>
              <div className="space-y-4">
                {howItWorks.customer.map((step) => (
                  <div key={step.step} className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buddy Flow */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🛠️</span>
                <h3 className="text-2xl font-bold text-black">For Buddies</h3>
              </div>
              <div className="space-y-4">
                {howItWorks.buddy.map((step) => (
                  <div key={step.step} className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Your Safety is Our Priority
          </h2>
          <p className="text-blue-100 text-center mb-12 max-w-2xl mx-auto">
            We go beyond verification with continuous safety measures for complete peace of mind
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="bg-blue-700 rounded-lg p-6 text-center">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-blue-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Trusted & Certified
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Our commitment to security and quality is recognized through industry certifications
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{badge.icon}</div>
                <div className="font-semibold text-black">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers and successful buddies who trust our platform
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-black">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join India's most trusted service platform today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg">
              Sign Up as Customer
            </button>
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-lg">
              Apply as Buddy
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            No hidden fees • 24/7 support • 100% verified professionals
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;