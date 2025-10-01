import React, { useState } from 'react';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const supportContacts = {
    general: [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Customer Support Manager',
        email: 'sarah.johnson@company.com',
        phone: '+1 (555) 123-4567',
        availability: 'Mon-Fri, 9AM-6PM EST',
        department: 'General Inquiries'
      },
      {
        id: 2,
        name: 'Mike Chen',
        role: 'Support Specialist',
        email: 'mike.chen@company.com',
        phone: '+1 (555) 123-4568',
        availability: 'Mon-Fri, 8AM-5PM PST',
        department: 'General Inquiries'
      }
    ],
    technical: [
      {
        id: 3,
        name: 'Alex Rodriguez',
        role: 'Technical Support Lead',
        email: 'alex.rodriguez@company.com',
        phone: '+1 (555) 123-4569',
        availability: '24/7 Emergency Support',
        department: 'Technical Issues'
      },
      {
        id: 4,
        name: 'Priya Patel',
        role: 'Software Engineer',
        email: 'priya.patel@company.com',
        phone: '+1 (555) 123-4570',
        availability: 'Mon-Fri, 10AM-7PM EST',
        department: 'Technical Issues'
      }
    ],
    billing: [
      {
        id: 5,
        name: 'David Wilson',
        role: 'Billing Specialist',
        email: 'david.wilson@company.com',
        phone: '+1 (555) 123-4571',
        availability: 'Mon-Fri, 9AM-5PM EST',
        department: 'Billing & Payments'
      }
    ],
    sales: [
      {
        id: 6,
        name: 'Emily Davis',
        role: 'Sales Consultant',
        email: 'emily.davis@company.com',
        phone: '+1 (555) 123-4572',
        availability: 'Mon-Sat, 8AM-8PM EST',
        department: 'Sales & Partnerships'
      }
    ]
  };

  const ContactCard = ({ contact }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-500">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {contact.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 className="text-black font-semibold text-lg">{contact.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{contact.role}</p>
          <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            {contact.department}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-gray-500">📧</span>
          <a 
            href={`mailto:${contact.email}`}
            className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
          >
            {contact.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500">📞</span>
          <a 
            href={`tel:${contact.phone}`}
            className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
          >
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500">🕒</span>
          <span className="text-gray-700 text-sm">{contact.availability}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-8">
          <h1 className="text-3xl font-bold text-black text-center mb-2">
            Customer Support
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Get in touch with our dedicated support team
          </p>
        </header>

        {/* Tabs */}
        <div className="bg-gray-50 border-b border-gray-200 px-6">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {Object.keys(supportContacts).map((tab) => (
              <button
                key={tab}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-200 whitespace-nowrap font-medium ${
                  activeTab === tab
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Support
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {supportContacts[tab].length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportContacts[activeTab].map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-6 py-4">
              <span className="text-red-500 text-xl">🚨</span>
              <div className="text-left">
                <h3 className="text-black font-semibold">Emergency Support</h3>
                <p className="text-gray-600 text-sm mb-1">
                  For critical issues outside business hours
                </p>
                <a
                  href="tel:+1-555-EMERGENCY"
                  className="text-red-600 hover:text-red-800 font-semibold text-lg transition-colors"
                >
                  +1 (555) EMERGENCY
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;