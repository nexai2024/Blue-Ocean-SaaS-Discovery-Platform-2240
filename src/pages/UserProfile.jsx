import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiUser, FiCode, FiClock, FiDollarSign, FiTarget, 
  FiX, FiPlus, FiSave, FiRefreshCw 
} = FiIcons;

function UserProfile({ userProfile, setUserProfile }) {
  const techStackOptions = [
    { id: 'nextjs', name: 'Next.js + TypeScript', category: 'Frontend' },
    { id: 'react', name: 'React + Node.js', category: 'Frontend' },
    { id: 'vue', name: 'Vue.js', category: 'Frontend' },
    { id: 'typescript', name: 'TypeScript', category: 'Language' },
    { id: 'javascript', name: 'JavaScript', category: 'Language' },
    { id: 'python', name: 'Python', category: 'Language' },
    { id: 'prisma', name: 'Prisma ORM', category: 'Database' },
    { id: 'postgres', name: 'PostgreSQL', category: 'Database' },
    { id: 'supabase', name: 'Supabase', category: 'Backend' },
    { id: 'firebase', name: 'Firebase', category: 'Backend' },
    { id: 'rails', name: 'Ruby on Rails', category: 'Framework' },
    { id: 'django', name: 'Django', category: 'Framework' },
    { id: 'laravel', name: 'Laravel', category: 'Framework' }
  ];

  const interestOptions = [
    'Legal Tech', 'FinTech', 'EdTech', 'HealthTech', 'Marketing Tools',
    'Developer Tools', 'Design Tools', 'Agency Tools', 'E-commerce',
    'Creator Economy', 'Remote Work', 'Productivity', 'AI/ML',
    'Compliance', 'Analytics', 'Communication'
  ];

  const avoidOptions = [
    'Cryptocurrency', 'Dating Apps', 'Gambling', 'Adult Content',
    'Social Media', 'Gaming', 'Hardware', 'Enterprise Sales',
    'Healthcare Compliance', 'Financial Trading', 'Real Estate'
  ];

  const updateProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const groupedTechStack = techStackOptions.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiUser} className="w-8 h-8 mr-3 text-blue-600" />
          Profile & Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Customize your profile to get personalized blue ocean recommendations
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => updateProfile('name', e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select
              value={userProfile.experience}
              onChange={(e) => updateProfile('experience', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (2-5 years)</option>
              <option value="advanced">Advanced (5+ years)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
          <SafeIcon icon={FiCode} className="w-5 h-5 mr-2 text-blue-600" />
          Tech Stack & Skills
        </h3>
        
        <div className="space-y-6">
          {Object.entries(groupedTechStack).map(([category, techs]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {techs.map(tech => (
                  <button
                    key={tech.id}
                    onClick={() => toggleArrayItem('techStack', tech.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      userProfile.techStack.includes(tech.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {userProfile.techStack.length > 0 
              ? userProfile.techStack.join(', ') 
              : 'No technologies selected'
            }
          </p>
        </div>
      </div>

      {/* Availability & Budget */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Availability & Resources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiClock} className="w-4 h-4 inline mr-1" />
              Weekly Hours Available
            </label>
            <input
              type="number"
              value={userProfile.weeklyHours}
              onChange={(e) => updateProfile('weeklyHours', parseInt(e.target.value) || 0)}
              min="1"
              max="168"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Hours per week you can dedicate to building</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiDollarSign} className="w-4 h-4 inline mr-1" />
              Initial Budget (USD)
            </label>
            <input
              type="number"
              value={userProfile.budget}
              onChange={(e) => updateProfile('budget', parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Budget for tools, hosting, and initial marketing</p>
          </div>
        </div>
      </div>

      {/* Interests & Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
          <SafeIcon icon={FiTarget} className="w-5 h-5 mr-2 text-green-600" />
          Interests & Domains
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Industries/Domains You're Interested In</h4>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleArrayItem('interests', interest)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userProfile.interests.includes(interest)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Domains to Avoid</h4>
            <div className="flex flex-wrap gap-2">
              {avoidOptions.map(avoid => (
                <button
                  key={avoid}
                  onClick={() => toggleArrayItem('avoidDomains', avoid)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userProfile.avoidDomains.includes(avoid)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {avoid}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <div><strong>Experience:</strong> {userProfile.experience}</div>
            <div><strong>Weekly Hours:</strong> {userProfile.weeklyHours} hours</div>
            <div><strong>Budget:</strong> ${userProfile.budget}</div>
          </div>
          <div className="space-y-2">
            <div><strong>Tech Stack:</strong> {userProfile.techStack.length} technologies</div>
            <div><strong>Interests:</strong> {userProfile.interests.length} domains</div>
            <div><strong>Avoiding:</strong> {userProfile.avoidDomains.length} domains</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>AI Personalization:</strong> Your profile helps our AI tailor opportunity recommendations, 
            complexity estimates, and tech stack suggestions specifically for your situation.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end space-x-4">
        <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <SafeIcon icon={FiRefreshCw} className="w-4 h-4 mr-2" />
          Reset to Defaults
        </button>
        <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
          Save Profile
        </button>
      </div>
    </motion.div>
  );
}

export default UserProfile;