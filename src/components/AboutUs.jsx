
const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: '10+ years of experience in tech industry. Passionate about innovation and customer success.',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'CTO',
      bio: 'Former tech lead at Fortune 500 companies. Expert in scalable architecture and AI solutions.',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Head of Product',
      bio: 'Product management specialist with a focus on user-centered design and market strategy.',
      avatar: 'ED'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Operations Director',
      bio: 'Ensures smooth business operations and exceptional customer service delivery.',
      avatar: 'DW'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize customer support solutions.'
    },
    {
      year: '2019',
      title: 'First Major Client',
      description: 'Secured partnership with Fortune 500 company, validating our approach.'
    },
    {
      year: '2020',
      title: 'Product Launch',
      description: 'Successfully launched our flagship support platform to the market.'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded operations to serve clients across 3 continents.'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Customer First',
      description: 'We prioritize our customers needs in every decision we make.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions.'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'We believe in transparency and doing the right thing always.'
    },
    {
      icon: '🌍',
      title: 'Impact',
      description: 'Committed to making a positive difference in our community.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">About Our Company</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We are a passionate team dedicated to transforming customer support through innovative 
            technology and exceptional service delivery.
          </p>
        </header>

        {/* Mission Section */}
        <section className="px-6 py-12 bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To empower businesses with intelligent support solutions that create meaningful 
              connections between companies and their customers. We believe that exceptional 
              customer service should be accessible to every business, regardless of size.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 py-12 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-6 py-12 bg-gray-50 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {milestone.year}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-black mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 py-12">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-12 bg-blue-600 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;