import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiSearch, FiMapPin, FiClock, FiTool, FiZap, FiHeart, 
  FiUsers, FiTarget, FiArrowRight, FiRefreshCw, FiDownload 
} = FiIcons;

function NicheDeepDiver({ userProfile }) {
  const [nicheInput, setNicheInput] = useState('');
  const [geography, setGeography] = useState('global');
  const [analysisState, setAnalysisState] = useState('idle'); // idle, analyzing, complete
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyze = () => {
    if (!nicheInput.trim()) return;
    
    setAnalysisState('analyzing');
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisData({
        niche: nicheInput,
        dayInLife: [
          { time: '9:00 AM', activity: 'Review client requests from overnight', pain: 'Email overload, hard to prioritize' },
          { time: '10:30 AM', activity: 'Client call for project kickoff', pain: 'Manual note-taking, no structured process' },
          { time: '12:00 PM', activity: 'Update project status across tools', pain: 'Context switching between 5+ tools' },
          { time: '2:00 PM', activity: 'Create client report manually', pain: 'Time-consuming, repetitive formatting' },
          { time: '4:00 PM', activity: 'Invoice generation and follow-up', pain: 'Manual tracking, delayed payments' },
          { time: '6:00 PM', activity: 'Team handoff for next day', pain: 'Information scattered, no single source of truth' }
        ],
        keyWorkflows: [
          { workflow: 'Client Onboarding', steps: 8, duration: '2-3 hours', pain: 'Manual forms, scattered info collection' },
          { workflow: 'Project Status Reporting', steps: 6, duration: '1 hour daily', pain: 'Data lives in multiple tools' },
          { workflow: 'Invoice & Payment Tracking', steps: 5, duration: '30 min weekly', pain: 'Manual follow-up, no automation' },
          { workflow: 'Team Collaboration', steps: 4, duration: 'Ongoing', pain: 'No structured handoff process' }
        ],
        existingStack: [
          { tool: 'Slack', purpose: 'Team communication', cost: '$8/user/month', gaps: 'No project context' },
          { tool: 'Asana', purpose: 'Project management', cost: '$11/user/month', gaps: 'No client portal' },
          { tool: 'Google Workspace', purpose: 'Documents & email', cost: '$6/user/month', gaps: 'No automation' },
          { tool: 'QuickBooks', purpose: 'Invoicing', cost: '$30/month', gaps: 'No project integration' },
          { tool: 'Calendly', purpose: 'Scheduling', cost: '$8/user/month', gaps: 'No project workflow tie-in' }
        ],
        jobsToBeDone: {
          functional: [
            'Collect client requirements efficiently',
            'Track project progress in real-time',
            'Generate professional client reports',
            'Automate invoice generation and follow-up',
            'Facilitate smooth team handoffs'
          ],
          emotional: [
            'Feel confident about project status',
            'Look professional to clients',
            'Reduce stress from manual tracking',
            'Feel in control of cash flow'
          ],
          social: [
            'Appear organized to clients',
            'Show transparency in pricing',
            'Demonstrate professionalism',
            'Build trust through consistency'
          ]
        },
        concepts: [
          {
            name: 'AgencyFlow Pro',
            tagline: 'All-in-one client experience platform for boutique agencies',
            hook: 'White-label client portal + project automation in one',
            coreFeatures: ['Branded client portal', 'Automated status updates', 'Integrated invoicing', 'Team workflows'],
            uniqueValue: 'Clients can see everything without agencies switching tools'
          },
          {
            name: 'ClientSync',
            tagline: 'Automated client communication for creative agencies',
            hook: 'AI-powered client updates that write themselves',
            coreFeatures: ['Smart progress tracking', 'Auto-generated reports', 'Proactive client notifications', 'Payment automation'],
            uniqueValue: 'Reduces client management overhead by 70%'
          },
          {
            name: 'Studio Command',
            tagline: 'Operations intelligence for creative teams',
            hook: 'Turn your agency chaos into smooth operations',
            coreFeatures: ['Workflow templates', 'Capacity planning', 'Client health scoring', 'Revenue forecasting'],
            uniqueValue: 'Agencies can scale without hiring operations people'
          }
        ]
      });
      setAnalysisState('complete');
    }, 3000);
  };

  const nicheExamples = [
    'Boutique design agencies (5-15 people)',
    'Small law firms doing M&A',
    'YouTube editors for agencies',
    'Local logistics companies',
    'Independent financial advisors',
    'Digital marketing consultants'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiSearch} className="w-8 h-8 mr-3 text-blue-600" />
          Niche Deep-Diver
        </h1>
        <p className="text-gray-600 mt-1">
          Uncover hidden workflow opportunities in specific niches and domains
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Define Your Niche</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Niche Description
            </label>
            <input
              type="text"
              value={nicheInput}
              onChange={(e) => setNicheInput(e.target.value)}
              placeholder="e.g., Boutique design agencies with 5-15 employees"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geographic Scope
            </label>
            <select 
              value={geography}
              onChange={(e) => setGeography(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="global">Global</option>
              <option value="us">United States</option>
              <option value="europe">Europe</option>
              <option value="local">Local/Regional</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-600 mr-2">Quick examples:</span>
          {nicheExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setNicheInput(example)}
              className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!nicheInput.trim() || analysisState === 'analyzing'}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SafeIcon 
            icon={FiRefreshCw} 
            className={`w-5 h-5 mr-2 ${analysisState === 'analyzing' ? 'animate-spin' : ''}`} 
          />
          {analysisState === 'analyzing' ? 'Analyzing Niche...' : 'Deep Dive Analysis'}
        </button>
      </div>

      {/* Analysis Progress */}
      {analysisState === 'analyzing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-200"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiSearch} className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Deep-Diving Into: {nicheInput}</h3>
          <p className="text-gray-600 text-sm mb-4">
            Analyzing workflows, pain points, and hidden opportunities...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Mapping day-in-the-life journeys
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Identifying workflow bottlenecks
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Analyzing existing tool gaps
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysisState === 'complete' && analysisData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Day in the Life */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <SafeIcon icon={FiClock} className="w-5 h-5 mr-2 text-blue-600" />
                Day-in-the-Life Journey
              </h3>
              <span className="text-sm text-gray-500">Typical workday for {analysisData.niche}</span>
            </div>
            
            <div className="space-y-4">
              {analysisData.dayInLife.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-20 text-sm font-medium text-blue-600 flex-shrink-0">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium mb-1">{item.activity}</p>
                    <p className="text-red-600 text-sm flex items-start">
                      <SafeIcon icon={FiZap} className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                      {item.pain}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Workflows */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiTool} className="w-5 h-5 mr-2 text-purple-600" />
              Key Workflows & Friction Points
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisData.keyWorkflows.map((workflow, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{workflow.workflow}</h4>
                  <div className="text-sm text-gray-600 mb-3 space-y-1">
                    <div>Steps: {workflow.steps}</div>
                    <div>Time: {workflow.duration}</div>
                  </div>
                  <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    💥 {workflow.pain}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Existing Tools & Gaps */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiTool} className="w-5 h-5 mr-2 text-green-600" />
              Current Tool Stack & Gaps
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Tool</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Purpose</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Cost</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Key Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.existingStack.map((tool, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">{tool.tool}</td>
                      <td className="py-3 px-4 text-gray-600">{tool.purpose}</td>
                      <td className="py-3 px-4 text-gray-600">{tool.cost}</td>
                      <td className="py-3 px-4 text-red-600 text-sm">{tool.gaps}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Opportunity:</strong> This niche is spending $63-83/user/month on disconnected tools with major workflow gaps.
              </p>
            </div>
          </div>

          {/* Jobs to be Done */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiTarget} className="w-5 h-5 mr-2 text-orange-600" />
              Jobs to be Done Analysis
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiTool} className="w-4 h-4 mr-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Functional Jobs</h4>
                </div>
                <ul className="space-y-2">
                  {analysisData.jobsToBeDone.functional.map((job, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {job}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiHeart} className="w-4 h-4 mr-2 text-red-600" />
                  <h4 className="font-semibold text-gray-900">Emotional Jobs</h4>
                </div>
                <ul className="space-y-2">
                  {analysisData.jobsToBeDone.emotional.map((job, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {job}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Social Jobs</h4>
                </div>
                <ul className="space-y-2">
                  {analysisData.jobsToBeDone.social.map((job, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {job}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SaaS Concept Ideas */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <SafeIcon icon={FiTarget} className="w-5 h-5 mr-2 text-green-600" />
              Generated SaaS Concepts for This Niche
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {analysisData.concepts.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-gray-900 mb-2">{concept.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{concept.tagline}</p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                    <p className="text-blue-800 text-sm font-medium">🎯 {concept.hook}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Core Features:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {concept.coreFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-green-800 text-sm">
                      <strong>Unique Value:</strong> {concept.uniqueValue}
                    </p>
                  </div>
                  
                  <button className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Develop This Concept
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Export & Next Steps */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Next Steps (48 hours)</h3>
            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-700">1. <strong>Pick 1-2 concepts</strong> that best fit your skills and interests</p>
              <p className="text-gray-700">2. <strong>Design value curves</strong> to understand competitive positioning</p>
              <p className="text-gray-700">3. <strong>Create validation experiments</strong> to test with real niche members</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Design Value Curves
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
              </button>
              <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                Export Analysis
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default NicheDeepDiver;