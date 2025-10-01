import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Send us an email anytime',
      contact: 'email@hirebuddy.com',
      link: 'mailto:hello@company.com'
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 6pm',
      contact: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Instant help from our team',
      contact: 'Start Chat',
      link: '#chat'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Our headquarters location',
      contact: '123 Business Ave, City, State 12345',
      link: '#location'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">Contact Us</h1>
          
        </header>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Other Ways to Reach Us</h2>
              
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {method.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black group-hover:text-blue-600 transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">{method.description}</p>
                      <p className="text-blue-600 font-medium">{method.contact}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-blue-600 text-xl">⏱️</span>
                <h3 className="font-semibold text-black">Response Time</h3>
              </div>
              <p className="text-gray-700 text-sm">
                We typically respond to all inquiries within <strong>2 business hours</strong>. 
                For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;