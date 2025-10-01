import React, { useState } from 'react';

const BuddyVerification = () => {
  const [activeStep, setActiveStep] = useState(0);

  const verificationSteps = [
    {
      step: 1,
      title: 'Profile Verification',
      icon: '👤',
      description: 'Basic identity and personal information check',
      details: [
        'Government ID verification (Aadhaar, PAN, Driving License)',
        'Personal profile completeness check',
        'Contact information validation',
        'Age verification (must be 18+ years)'
      ],
      duration: '2-4 hours',
      completion: '99.8%'
    },
    {
      step: 2,
      title: 'Background Check',
      icon: '🛡️',
      description: 'Comprehensive criminal and legal background verification',
      details: [
        '7-year criminal record check across India',
        'Court record verification',
        'Address verification and validation',
        'Police verification certificate'
      ],
      duration: '24-48 hours',
      completion: '99.5%'
    },
    {
      step: 3,
      title: 'Document Verification',
      icon: '📄',
      description: 'Authentication of all required documents',
      details: [
        'Address proof verification (Utility bills, Rental agreement)',
        'Educational qualification validation',
        'Professional certification checks',
        'Vehicle documents (if applicable)'
      ],
      duration: '6-8 hours',
      completion: '99.7%'
    },
    {
      step: 4,
      title: 'Skill Assessment',
      icon: '🎯',
      description: 'Practical evaluation of service-specific skills',
      details: [
        'Service capability testing',
        'Practical skill demonstration',
        'Communication skills assessment',
        'Problem-solving ability evaluation'
      ],
      duration: '2-3 hours',
      completion: '98.9%'
    },
    {
      step: 5,
      title: 'Training & Orientation',
      icon: '🎓',
      description: 'Comprehensive training on platform and service standards',
      details: [
        'Platform usage training',
        'Service quality standards',
        'Safety protocols and guidelines',
        'Customer interaction best practices'
      ],
      duration: '4-6 hours',
      completion: '100%'
    },
    {
      step: 6,
      title: 'Final Approval',
      icon: '✅',
      description: 'Final review and platform activation',
      details: [
        'Quality assurance check',
        'Platform readiness verification',
        'Service area activation',
        'Welcome kit and tools setup'
      ],
      duration: '1-2 hours',
      completion: '99.9%'
    }
  ];

  const securityFeatures = [
    {
      icon: '🔒',
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring of buddy activities and customer feedback'
    },
    {
      icon: '📱',
      title: 'Live Location Tracking',
      description: 'GPS tracking during active service sessions for safety'
    },
    {
      icon: '🔄',
      title: 'Regular Re-verification',
      description: 'Periodic background checks and document updates'
    },
    {
      icon: '⭐',
      title: 'Rating System',
      description: 'Customer ratings and reviews maintain service quality'
    }
  ];

  const verificationStats = [
    { number: '2,50,000+', label: 'Buddies Verified' },
    { number: '99.7%', label: 'Verification Success Rate' },
    { number: '4.8/5', label: 'Customer Safety Rating' },
    { number: '48h', label: 'Average Verification Time' }
  ];

  const rejectedReasons = [
    'Incomplete documentation',
    'Criminal background found',
    'Fake or forged documents',
    'Failed skill assessment',
    'Violation of terms of service'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Our Buddy Verification Process</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Your safety is our priority. We follow a rigorous 6-step verification process inspired by 
            industry leaders like Uber, Swiggy, and Amazon to ensure only trustworthy professionals serve you.
          </p>
        </header>

        {/* Stats Section */}
        <section className="px-6 py-8 bg-blue-600 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {verificationStats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Verification Process */}
        <section className="px-6 py-12">
          <h2 className="text-3xl font-bold text-black text-center mb-4">
            6-Step Verification Process
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Every buddy goes through our comprehensive verification journey before they can serve you
          </p>

          <div className="max-w-5xl mx-auto">
            {/* Step Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-8 pb-4 scrollbar-hide">
              {verificationSteps.map((step, index) => (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    activeStep === index
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                  <span className="font-semibold">Step {step.step}</span>
                  <span className="hidden sm:block">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                      {verificationSteps[activeStep].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black">
                        {verificationSteps[activeStep].title}
                      </h3>
                      <p className="text-gray-600">{verificationSteps[activeStep].description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Duration</div>
                        <div className="font-semibold text-black">{verificationSteps[activeStep].duration}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Success Rate</div>
                        <div className="font-semibold text-black">{verificationSteps[activeStep].completion}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-black mb-3">What we verify:</h4>
                      <ul className="space-y-2">
                        {verificationSteps[activeStep].details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <span className="text-green-500 mt-1">✓</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-black mb-4">Required Documents</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <span className="text-blue-600">📄</span>
                      <span className="text-sm">Government ID (Aadhaar/Driving License)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <span className="text-blue-600">🏠</span>
                      <span className="text-sm">Address Proof</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <span className="text-blue-600">📸</span>
                      <span className="text-sm">Recent Photograph</span>
                    </div>
                    {activeStep >= 3 && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <span className="text-blue-600">🎓</span>
                        <span className="text-sm">Educational/Professional Certificates</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h5 className="font-semibold text-black mb-2">💡 Important Note</h5>
                    <p className="text-sm text-gray-700">
                      All documents are verified using government-approved methods and cross-checked with official databases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="px-6 py-12 bg-gray-50 border-y border-gray-200">
          <h2 className="text-3xl font-bold text-black text-center mb-4">Continuous Safety Measures</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Verification doesn't stop after onboarding. We continuously monitor and ensure safety standards.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rejection Criteria */}
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black text-center mb-4">Why Applications Get Rejected</h2>
            <p className="text-gray-600 text-center mb-8">
              Transparency in our verification standards helps maintain trust and safety
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {rejectedReasons.map((reason, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="text-red-500">❌</span>
                    <span className="text-sm text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Note:</strong> Rejected applicants can re-apply after 90 days if they can address the reasons for rejection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="px-6 py-12 bg-white border-t border-gray-200">
          <h2 className="text-2xl font-bold text-black text-center mb-8">Trusted By</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <div className="text-2xl font-bold text-gray-700">🔒 ISO 27001 Certified</div>
            <div className="text-2xl font-bold text-gray-700">🛡️ GDPR Compliant</div>
            <div className="text-2xl font-bold text-gray-700">✅ MeitY Approved</div>
            <div className="text-2xl font-bold text-gray-700">📜 FAME India Certified</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-12 bg-blue-600 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Your Safety is Our Promise</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We invest heavily in verification technology and processes to ensure every interaction on our platform is safe and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Download Safety Guide
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Contact Safety Team
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuddyVerification;