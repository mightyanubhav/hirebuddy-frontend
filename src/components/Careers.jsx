import React, { useState } from 'react';

const Careers = () => {
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const departments = [
    { id: 'all', name: 'All Departments', count: 28 },
    { id: 'tech', name: 'Technology', count: 12 },
    { id: 'operations', name: 'Operations', count: 8 },
    { id: 'marketing', name: 'Marketing', count: 4 },
    { id: 'customer-support', name: 'Customer Support', count: 3 },
    { id: 'hr', name: 'Human Resources', count: 1 }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'tech',
      type: 'Full-time',
      location: 'Bangalore',
      experience: '3-5 years',
      salary: '₹15-25 LPA',
      remote: true,
      posted: '2 days ago',
      description: 'We are looking for a skilled Frontend Developer to join our product team.',
      requirements: [
        '3+ years of experience in React.js and Next.js',
        'Strong proficiency in JavaScript, including DOM manipulation',
        'Experience with state management libraries like Redux',
        'Knowledge of modern authorization mechanisms',
        'Familiarity with code versioning tools such as Git'
      ]
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'tech',
      type: 'Full-time',
      location: 'Gurgaon',
      experience: '4-6 years',
      salary: '₹20-30 LPA',
      remote: false,
      posted: '1 week ago',
      description: 'Lead product strategy and execution for our customer-facing applications.',
      requirements: [
        '4+ years of product management experience',
        'Strong analytical and problem-solving skills',
        'Experience with Agile development methodologies',
        'Excellent communication and leadership skills',
        'Background in tech startups or product companies'
      ]
    },
    {
      id: 3,
      title: 'Operations Manager',
      department: 'operations',
      type: 'Full-time',
      location: 'Mumbai',
      experience: '3-5 years',
      salary: '₹12-18 LPA',
      remote: false,
      posted: '3 days ago',
      description: 'Manage and optimize our service delivery operations across multiple cities.',
      requirements: [
        '3+ years in operations management',
        'Experience in service industry or logistics',
        'Strong data analysis skills',
        'Excellent team management capabilities',
        'MBA from tier-1 institute preferred'
      ]
    },
    {
      id: 4,
      title: 'Digital Marketing Specialist',
      department: 'marketing',
      type: 'Full-time',
      location: 'Remote',
      experience: '2-4 years',
      salary: '₹8-12 LPA',
      remote: true,
      posted: '5 days ago',
      description: 'Drive user acquisition and brand awareness through digital channels.',
      requirements: [
        '2+ years in digital marketing',
        'Experience with SEO, SEM, and social media',
        'Proficiency in marketing analytics tools',
        'Strong content creation skills',
        'Knowledge of the Indian startup ecosystem'
      ]
    },
    {
      id: 5,
      title: 'Customer Support Lead',
      department: 'customer-support',
      type: 'Full-time',
      location: 'Hyderabad',
      experience: '2-3 years',
      salary: '₹6-9 LPA',
      remote: false,
      posted: '1 day ago',
      description: 'Lead our customer support team and ensure exceptional service delivery.',
      requirements: [
        '2+ years in customer support leadership',
        'Excellent communication skills',
        'Experience with CRM tools',
        'Strong problem-solving abilities',
        'Flexible to work in shifts'
      ]
    },
    {
      id: 6,
      title: 'Backend Engineer - Node.js',
      department: 'tech',
      type: 'Full-time',
      location: 'Bangalore',
      experience: '2-4 years',
      salary: '₹12-20 LPA',
      remote: true,
      posted: '2 weeks ago',
      description: 'Build scalable backend systems for our growing platform.',
      requirements: [
        '2+ years with Node.js and Express',
        'Experience with MongoDB and Redis',
        'Knowledge of microservices architecture',
        'Familiarity with AWS services',
        'Understanding of system design principles'
      ]
    }
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Industry-standard compensation with regular reviews'
    },
    {
      icon: '🏠',
      title: 'Flexible Work',
      description: 'Remote work options and flexible hours'
    },
    {
      icon: '🩺',
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and family'
    },
    {
      icon: '🎓',
      title: 'Learning Budget',
      description: 'Annual budget for courses and conferences'
    },
    {
      icon: '⚡',
      title: 'Latest Tech',
      description: 'Work with cutting-edge technology stack'
    },
    {
      icon: '🍕',
      title: 'Meals & Snacks',
      description: 'Free meals, snacks, and beverages in office'
    },
    {
      icon: '🚀',
      title: 'ESOPs',
      description: 'Employee stock ownership plans'
    },
    {
      icon: '🎯',
      title: 'Career Growth',
      description: 'Clear growth path and mentorship programs'
    }
  ];

  const cultureStats = [
    { number: '200+', label: 'Team Members' },
    { number: '45%', label: 'Women in Tech' },
    { number: '4.8/5', label: 'Employee Happiness' },
    { number: '5+', label: 'Cities Presence' }
  ];

  const filteredJobs = activeDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === activeDepartment);

  const JobCard = ({ job }) => (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedJob(job)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-black mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.department.charAt(0).toUpperCase() + job.department.slice(1)}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.type}
            </span>
            {job.remote && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                Remote
              </span>
            )}
          </div>
        </div>
        <span className="text-gray-500 text-sm">{job.posted}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>💼</span>
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>💰</span>
          <span>{job.salary}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
        Apply Now
      </button>
    </div>
  );

  const JobModal = ({ job, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-black mb-2">{job.title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.department.charAt(0).toUpperCase() + job.department.slice(1)}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.type}
                </span>
                {job.remote && (
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    Remote
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-gray-500">📍</span>
              <div>
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-semibold text-black">{job.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500">💼</span>
              <div>
                <div className="text-sm text-gray-600">Experience</div>
                <div className="font-semibold text-black">{job.experience}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500">💰</span>
              <div>
                <div className="text-sm text-gray-600">Salary</div>
                <div className="font-semibold text-black">{job.salary}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500">🕒</span>
              <div>
                <div className="text-sm text-gray-600">Posted</div>
                <div className="font-semibold text-black">{job.posted}</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-3">Job Description</h3>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-3">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-blue-500 mt-1">•</span>
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Apply for this Position
            </button>
            <button className="border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Build Your Career at <span className="text-blue-600">Hire Buddy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join us in revolutionizing India's service industry. Work with amazing people, 
            solve challenging problems, and create impact at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              View Open Positions
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Learn About Culture
            </button>
          </div>
        </div>
      </section>

      {/* Culture Stats */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {cultureStats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-4">
            Why Work With Us?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We take care of our team with comprehensive benefits and a great work environment
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-4">
            Open Positions
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {jobOpenings.length} roles across {departments.length - 1} departments
          </p>

          {/* Department Filter */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-4 scrollbar-hide">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setActiveDepartment(dept.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeDepartment === dept.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
              >
                <span className="font-semibold">{dept.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeDepartment === dept.id
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {dept.count}
                </span>
              </button>
            ))}
          </div>

          {/* Jobs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-black mb-2">No positions found</h3>
              <p className="text-gray-600">We don't have any open positions in this department right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-12">
            Our Hiring Process
          </h2>

          <div className="space-y-8">
            {[
              { step: 1, title: 'Application Review', duration: '2-3 days', description: 'We carefully review your application and portfolio' },
              { step: 2, title: 'Screening Call', duration: '30 mins', description: 'Quick chat with our HR team to understand your background' },
              { step: 3, title: 'Technical/Skill Assessment', duration: '1-2 hours', description: 'Practical assessment of your skills and capabilities' },
              { step: 4, title: 'Team Interview', duration: '1 hour', description: 'Meet the team you will be working with' },
              { step: 5, title: 'Final Interview', duration: '45 mins', description: 'Discussion with leadership about role and expectations' },
              { step: 6, title: 'Offer', duration: '1-2 days', description: 'We make an offer and welcome you to the team!' }
            ].map(step => (
              <div key={step.step} className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-black">{step.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{step.duration}</span>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Don't See the Perfect Role?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            We're always looking for talented people. Send us your resume and we'll contact you when we have a matching opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Submit General Application
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Refer a Friend
            </button>
          </div>
        </div>
      </section>

      {/* Job Modal */}
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default Careers;