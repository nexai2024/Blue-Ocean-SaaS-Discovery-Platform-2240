import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';

const { 
  FiSettings, FiCode, FiDatabase, FiServer, FiGlobe, 
  FiDollarSign, FiClock, FiCheckCircle, FiArrowRight, FiDownload,
  FiTarget, FiTrendingUp, FiRefreshCw
} = FiIcons;

function BuildReadiness({ userProfile }) {
  const [selectedConcept, setSelectedConcept] = useState('');
  const [concepts, setConcepts] = useState([]);
  const [loadingConcepts, setLoadingConcepts] = useState(true);
  const [mvpScope, setMvpScope] = useState({
    mustHave: [],
    goodToHave: [],
    experiments: []
  });

  useEffect(() => {
    const fetchConcepts = async () => {
      setLoadingConcepts(true);
      const { data } = await supabase
        .from('concepts_1740480000000')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setConcepts(data);
      setLoadingConcepts(false);
    };
    fetchConcepts();
  }, []);

  const techStackOptions = {
    'nextjs': { name: 'Next.js + TypeScript', complexity: 'medium', timeMultiplier: 1.0 },
    'react-node': { name: 'React + Node.js + Express', complexity: 'medium', timeMultiplier: 1.1 },
    'rails': { name: 'Ruby on Rails', complexity: 'low', timeMultiplier: 0.9 },
    'django': { name: 'Django + Python', complexity: 'medium', timeMultiplier: 1.0 },
    'laravel': { name: 'Laravel + PHP', complexity: 'low', timeMultiplier: 0.8 }
  };

  const generateMVPPlan = () => {
    const plan = {
      mustHave: [
        { feature: 'User authentication & basic profiles', effort: 8, description: 'Email/password login, user dashboard' },
        { feature: 'Document upload & scanning', effort: 20, description: 'File upload, basic document processing' },
        { feature: 'Compliance checklist system', effort: 16, description: 'Create, assign, and track compliance tasks' },
        { feature: 'Basic reporting dashboard', effort: 12, description: 'Simple charts and compliance status overview' },
        { feature: 'Email notifications', effort: 6, description: 'Alerts for deadlines and violations' },
        { feature: 'Billing integration (Stripe)', effort: 10, description: 'Subscription management and payments' }
      ],
      goodToHave: [
        { feature: 'Advanced AI document analysis', effort: 32, description: 'ML-powered compliance detection' },
        { feature: 'Team collaboration features', effort: 18, description: 'User roles, permissions, sharing' },
        { feature: 'Custom compliance frameworks', effort: 24, description: 'User-defined compliance rules' },
        { feature: 'API integrations', effort: 20, description: 'Connect with practice management software' }
      ],
      experiments: [
        { feature: 'AI-powered risk scoring', effort: 16, description: 'Predictive compliance risk assessment' },
        { feature: 'Mobile app companion', effort: 28, description: 'iOS/Android app for on-the-go access' },
        { feature: 'White-label options', effort: 24, description: 'Customizable branding for resellers' }
      ]
    };
    
    setMvpScope(plan);
  };

  const calculateTotalEffort = (features) => {
    return features.reduce((total, feature) => total + feature.effort, 0);
  };

  const estimateTimeToMarket = () => {
    const baseHours = calculateTotalEffort(mvpScope.mustHave);
    const skillMultiplier = userProfile.experience === 'beginner' ? 1.5 : 
                           userProfile.experience === 'intermediate' ? 1.2 : 1.0;
    const techMultiplier = userProfile.techStack.includes('nextjs') ? 1.0 : 1.2;
    
    const totalHours = baseHours * skillMultiplier * techMultiplier;
    const weeksToComplete = Math.ceil(totalHours / userProfile.weeklyHours);
    
    return {
      hours: Math.round(totalHours),
      weeks: weeksToComplete,
      months: Math.ceil(weeksToComplete / 4.33)
    };
  };

  const architectureRecommendation = {
    frontend: 'Next.js 14 with TypeScript',
    backend: 'Next.js API routes + tRPC',
    database: 'PostgreSQL (Supabase)',
    auth: 'NextAuth.js',
    payments: 'Stripe',
    hosting: 'Vercel',
    storage: 'AWS S3 or Supabase Storage',
    monitoring: 'Sentry + Vercel Analytics'
  };

  const monthlyOperatingCosts = {
    hosting: 20,
    database: 25,
    storage: 15,
    monitoring: 10,
    email: 5,
    payments: '2.9% + $0.30 per transaction',
    total: 75
  };

  React.useEffect(() => {
    if (selectedConcept) {
      generateMVPPlan();
    }
  }, [selectedConcept]);

  const timeEstimate = mvpScope.mustHave.length > 0 ? estimateTimeToMarket() : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiSettings} className="w-8 h-8 mr-3 text-blue-600" />
          Build Readiness & MVP Planning
        </h1>
        <p className="text-gray-600 mt-1">
          Transform your validated concept into a developer-ready build plan
        </p>
      </div>

      {/* Concept Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Validated Concept</h3>
        {loadingConcepts ? (
          <div className="flex items-center justify-center py-8">
            <SafeIcon icon={FiRefreshCw} className="w-6 h-6 animate-spin text-blue-600 mr-2" />
            <span className="text-sm text-gray-500">Loading concepts...</span>
          </div>
        ) : concepts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-4">No concepts found. Generate some in Concept Forge first.</p>
          </div>
        ) : (
          <select 
            value={selectedConcept}
            onChange={(e) => setSelectedConcept(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a validated concept...</option>
            {concepts.map((concept) => (
              <option key={concept.id} value={concept.id}>{concept.name} — {concept.tagline || concept.one_liner}</option>
            ))}
          </select>
        )}
      </div>

      {selectedConcept && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* MVP Scope Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiTarget} className="w-5 h-5 mr-2 text-green-600" />
              MVP Scope Assistant
            </h3>
            
            <div className="space-y-8">
              {/* Must-Have Features */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 mr-2 text-green-600" />
                    Must-Have for Launch ({calculateTotalEffort(mvpScope.mustHave)} hours)
                  </h4>
                  <span className="text-sm text-gray-500">Essential for charging money</span>
                </div>
                <div className="space-y-3">
                  {mvpScope.mustHave.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h5 className="font-medium text-green-900">{feature.feature}</h5>
                        <p className="text-sm text-green-700 mt-1">{feature.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium text-green-900">{feature.effort}h</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Good-to-Have Features */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2 text-blue-600" />
                    Good-to-Have for Retention ({calculateTotalEffort(mvpScope.goodToHave)} hours)
                  </h4>
                  <span className="text-sm text-gray-500">Post-launch improvements</span>
                </div>
                <div className="space-y-3">
                  {mvpScope.goodToHave.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h5 className="font-medium text-blue-900">{feature.feature}</h5>
                        <p className="text-sm text-blue-700 mt-1">{feature.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium text-blue-900">{feature.effort}h</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Experimental Features */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <SafeIcon icon={FiCode} className="w-4 h-4 mr-2 text-purple-600" />
                    Experimental Features ({calculateTotalEffort(mvpScope.experiments)} hours)
                  </h4>
                  <span className="text-sm text-gray-500">Future bets & experiments</span>
                </div>
                <div className="space-y-3">
                  {mvpScope.experiments.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h5 className="font-medium text-purple-900">{feature.feature}</h5>
                        <p className="text-sm text-purple-700 mt-1">{feature.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium text-purple-900">{feature.effort}h</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Estimate */}
            {timeEstimate && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">📅 Time to Market Estimate</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{timeEstimate.hours}</div>
                    <div className="text-sm text-blue-800">Total Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{timeEstimate.weeks}</div>
                    <div className="text-sm text-green-800">Weeks ({userProfile.weeklyHours}h/week)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{timeEstimate.months}</div>
                    <div className="text-sm text-purple-800">Months</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Based on your {userProfile.experience} experience level and {userProfile.weeklyHours} hours per week availability
                </p>
              </div>
            )}
          </div>

          {/* Technical Architecture */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiServer} className="w-5 h-5 mr-2 text-blue-600" />
              Recommended Architecture (Indie-Friendly)
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Tech Stack</h4>
                <div className="space-y-3">
                  {Object.entries(architectureRecommendation).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <SafeIcon 
                          icon={
                            key === 'frontend' || key === 'backend' ? FiCode :
                            key === 'database' ? FiDatabase :
                            key === 'hosting' ? FiServer :
                            FiGlobe
                          } 
                          className="w-4 h-4 mr-2 text-gray-600" 
                        />
                        <span className="text-sm font-medium text-gray-900 capitalize">{key}</span>
                      </div>
                      <span className="text-sm text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Why This Stack?</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Low maintenance:</strong> Serverless architecture reduces operational overhead</span>
                  </div>
                  <div className="flex items-start">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Cost-effective:</strong> Pay-as-you-scale pricing for small apps</span>
                  </div>
                  <div className="flex items-start">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Developer-friendly:</strong> Matches your current {userProfile.techStack.join(', ')} skills</span>
                  </div>
                  <div className="flex items-start">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Proven stack:</strong> Used by thousands of successful indie SaaS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Costs */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiDollarSign} className="w-5 h-5 mr-2 text-green-600" />
              Monthly Operating Costs (at low scale)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Fixed Costs</h4>
                <div className="space-y-3">
                  {Object.entries(monthlyOperatingCosts).filter(([key]) => key !== 'total' && key !== 'payments').map(([service, cost]) => (
                    <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 capitalize">{service}</span>
                      <span className="text-sm text-gray-600">${cost}/month</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-semibold text-green-900">Total Fixed</span>
                    <span className="text-sm font-semibold text-green-900">${monthlyOperatingCosts.total}/month</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Variable Costs</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Payment Processing</span>
                      <span className="text-sm text-blue-800">{monthlyOperatingCosts.payments}</span>
                    </div>
                    <p className="text-xs text-blue-700">Example: $199/month subscription = $6.07 fee</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h5 className="text-sm font-medium text-yellow-900 mb-2">Break-even Analysis</h5>
                    <div className="text-xs text-yellow-800 space-y-1">
                      <div>At $199/month pricing:</div>
                      <div>• Need 1 customer to cover fixed costs</div>
                      <div>• Net revenue per customer: ~$193/month</div>
                      <div>• Very low operational risk</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Go-to-Market Assets */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiGlobe} className="w-5 h-5 mr-2 text-purple-600" />
              Go-to-Market Assets
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Landing Page Headlines</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Primary Headline</div>
                    <div className="text-sm text-gray-600 mt-1">"Never Miss Another Compliance Deadline"</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Sub-headline</div>
                    <div className="text-sm text-gray-600 mt-1">"AI-powered compliance monitoring that saves small law firms 10+ hours per week"</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Value Proposition</div>
                    <div className="text-sm text-gray-600 mt-1">"Automated alerts, instant reports, zero violations"</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Positioning Angles</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <strong className="text-blue-900">vs. Clio:</strong> 
                    <span className="text-blue-800"> "Built specifically for compliance, not general practice management"</span>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <strong className="text-green-900">vs. Manual tracking:</strong> 
                    <span className="text-green-800"> "AI prevents violations before they happen, not after"</span>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <strong className="text-purple-900">vs. Enterprise solutions:</strong> 
                    <span className="text-purple-800"> "Setup in minutes, not months. Priced for small firms."</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Elevator Pitch (30 seconds)</h4>
              <p className="text-sm text-gray-700">
                "We help small law firms avoid compliance violations with AI monitoring. Instead of manually tracking deadlines and regulations, 
                our software scans your documents and processes, then alerts you before violations occur. We're saving firms 10+ hours per week 
                and preventing costly fines. It's like having a compliance expert watching your back 24/7."
              </p>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Your Build Action Plan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiClock} className="w-5 h-5 mr-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Week 1-2</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Set up development environment</li>
                  <li>• Initialize Next.js project</li>
                  <li>• Set up Supabase database</li>
                  <li>• Implement basic authentication</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiCode} className="w-5 h-5 mr-2 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Week 3-8</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Build core MVP features</li>
                  <li>• Implement document upload</li>
                  <li>• Create compliance dashboard</li>
                  <li>• Add notification system</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiGlobe} className="w-5 h-5 mr-2 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Week 9-12</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Integrate Stripe billing</li>
                  <li>• Polish user experience</li>
                  <li>• Deploy to production</li>
                  <li>• Launch to first customers</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <strong>Ready to build?</strong> You have everything needed to start coding your validated SaaS concept.
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                  <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                  Export Build Plan
                </button>
                <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Start Building
                  <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default BuildReadiness;