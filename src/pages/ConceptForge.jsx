import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiLightbulb, FiTarget, FiDollarSign, FiUsers, FiTool, 
  FiTrendingUp, FiRefreshCw, FiArrowRight, FiBookmark, FiEdit3 
} = FiIcons;

function ConceptForge({ userProfile }) {
  const [selectedOpportunity, setSelectedOpportunity] = useState('');
  const [conceptVariant, setConceptVariant] = useState('micro-saas');
  const [generatingState, setGeneratingState] = useState('idle');
  const [concepts, setConcepts] = useState([]);

  const opportunities = [
    'AI-Powered Compliance SaaS for Small Law Firms',
    'Client Portal + Automation for Boutique Agencies',
    'Workflow Intelligence for Remote Design Teams'
  ];

  const handleGenerate = () => {
    if (!selectedOpportunity) return;
    
    setGeneratingState('generating');
    
    setTimeout(() => {
      const newConcepts = [
        {
          id: 1,
          name: 'ComplianceAI Pro',
          tagline: 'AI compliance monitoring that never sleeps',
          oneLiner: 'Automated legal compliance tracking with predictive violation alerts for small law firms',
          hook: 'AI co-pilot for legal compliance',
          variant: 'micro-saas',
          coreFeatures: [
            'AI-powered document analysis',
            'Automated compliance checklists',
            'Risk prediction alerts',
            'One-click audit reports'
          ],
          niceToHave: [
            'Multi-jurisdiction support',
            'Client portal integration',
            'Advanced analytics dashboard'
          ],
          leanCanvas: {
            problem: ['Manual compliance tracking', 'Risk of violations', 'Time-consuming audits'],
            solution: ['AI monitoring system', 'Predictive alerts', 'Automated reporting'],
            keyMetrics: ['Compliance score', 'Violations prevented', 'Time saved'],
            unfairAdvantage: 'Legal-specific AI models',
            costStructure: ['AI/ML infrastructure', 'Legal data licensing', 'Development'],
            revenueStreams: ['Monthly subscription', 'Setup fees', 'Premium support']
          },
          risks: {
            market: { level: 'medium', description: 'Small law firms may be slow to adopt AI' },
            technical: { level: 'high', description: 'Complex legal AI models required' },
            distribution: { level: 'medium', description: 'Need to reach niche legal market' },
            monetization: { level: 'low', description: 'Clear value proposition for pricing' }
          },
          pricing: '$200-500/month per firm',
          buildTime: '4-6 months'
        },
        {
          id: 2,
          name: 'LegalGuard Lite',
          tagline: 'Essential compliance for solo practitioners',
          oneLiner: 'Simplified compliance toolkit designed specifically for solo lawyers and micro firms',
          hook: 'Compliance-in-a-box for solo lawyers',
          variant: 'micro-saas',
          coreFeatures: [
            'Compliance calendar & reminders',
            'Document templates library',
            'Basic risk assessments',
            'Simple reporting tools'
          ],
          niceToHave: [
            'Mobile app notifications',
            'Integration with practice management',
            'Client communication tools'
          ],
          leanCanvas: {
            problem: ['Overwhelming compliance requirements', 'Limited resources', 'Fear of violations'],
            solution: ['Simplified compliance system', 'Templates & checklists', 'Gentle guidance'],
            keyMetrics: ['User engagement', 'Template usage', 'Retention rate'],
            unfairAdvantage: 'Solo lawyer-specific focus',
            costStructure: ['Platform development', 'Content creation', 'Support'],
            revenueStreams: ['Low-cost subscription', 'Template marketplace']
          },
          risks: {
            market: { level: 'low', description: 'Large market of solo practitioners' },
            technical: { level: 'low', description: 'Simple CRUD application' },
            distribution: { level: 'medium', description: 'Need legal marketing expertise' },
            monetization: { level: 'medium', description: 'Price-sensitive market segment' }
          },
          pricing: '$29-79/month per lawyer',
          buildTime: '6-8 weeks'
        },
        {
          id: 3,
          name: 'ComplianceHub Enterprise',
          tagline: 'Comprehensive compliance management for growing firms',
          oneLiner: 'Enterprise-grade compliance platform with team collaboration and advanced analytics',
          hook: 'Turn compliance into competitive advantage',
          variant: 'vertical-saas',
          coreFeatures: [
            'Multi-user compliance workflows',
            'Advanced analytics & reporting',
            'Integration with legal software',
            'Custom compliance frameworks'
          ],
          niceToHave: [
            'API for third-party integrations',
            'White-label options',
            'Advanced AI insights'
          ],
          leanCanvas: {
            problem: ['Complex multi-lawyer compliance', 'Lack of oversight', 'Inefficient processes'],
            solution: ['Team-based compliance platform', 'Workflow automation', 'Executive dashboards'],
            keyMetrics: ['Team productivity', 'Compliance coverage', 'ROI metrics'],
            unfairAdvantage: 'Deep legal workflow integration',
            costStructure: ['Enterprise development', 'Sales team', 'Customer success'],
            revenueStreams: ['Tiered subscriptions', 'Professional services', 'Training']
          },
          risks: {
            market: { level: 'medium', description: 'Smaller market but higher ACV' },
            technical: { level: 'high', description: 'Complex integrations required' },
            distribution: { level: 'high', description: 'Enterprise sales process needed' },
            monetization: { level: 'low', description: 'High willingness to pay for compliance' }
          },
          pricing: '$500-2000/month per firm',
          buildTime: '8-12 months'
        }
      ];
      
      setConcepts(newConcepts);
      setGeneratingState('complete');
    }, 2500);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiLightbulb} className="w-8 h-8 mr-3 text-blue-600" />
          Concept Forge
        </h1>
        <p className="text-gray-600 mt-1">
          Transform blue ocean opportunities into concrete, validated SaaS concepts
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Concepts</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Blue Ocean Opportunity
            </label>
            <select 
              value={selectedOpportunity}
              onChange={(e) => setSelectedOpportunity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose an opportunity...</option>
              {opportunities.map((opp, index) => (
                <option key={index} value={opp}>{opp}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Concept Type
            </label>
            <select 
              value={conceptVariant}
              onChange={(e) => setConceptVariant(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="micro-saas">Micro-SaaS (Small & Focused)</option>
              <option value="vertical-saas">Vertical SaaS (Deep Niche)</option>
              <option value="ecosystem-saas">Ecosystem SaaS (Integrations)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedOpportunity || generatingState === 'generating'}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SafeIcon 
            icon={FiRefreshCw} 
            className={`w-5 h-5 mr-2 ${generatingState === 'generating' ? 'animate-spin' : ''}`} 
          />
          {generatingState === 'generating' ? 'Forging Concepts...' : 'Generate Concepts'}
        </button>
      </div>

      {/* Generation Progress */}
      {generatingState === 'generating' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 text-center border border-purple-200"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiLightbulb} className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Forging SaaS Concepts...</h3>
          <p className="text-gray-600 text-sm mb-4">
            Creating multiple concept variations with lean canvases and risk analysis
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              Generating product variations
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              Creating lean canvases
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              Analyzing risks & opportunities
            </div>
          </div>
        </motion.div>
      )}

      {/* Generated Concepts */}
      {generatingState === 'complete' && concepts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Generated Concepts</h2>
            <span className="text-sm text-gray-500">{concepts.length} variations created</span>
          </div>

          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Concept Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 mr-3">{concept.name}</h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {concept.variant.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <p className="text-gray-600 text-lg mb-2">{concept.tagline}</p>
                    <p className="text-gray-700">{concept.oneLiner}</p>
                  </div>
                  
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <SafeIcon icon={FiBookmark} className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">🎯 Unique Hook</h4>
                  <p className="text-purple-800">{concept.hook}</p>
                </div>
              </div>

              {/* Concept Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Features */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <SafeIcon icon={FiTarget} className="w-4 h-4 mr-2 text-green-600" />
                        Core Features (Must-Have)
                      </h4>
                      <ul className="space-y-2">
                        {concept.coreFeatures.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2 text-blue-600" />
                        Nice-to-Have (Future)
                      </h4>
                      <ul className="space-y-2">
                        {concept.niceToHave.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-500 flex items-start">
                            <span className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-1" />
                          <span>Pricing: {concept.pricing}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <SafeIcon icon={FiTool} className="w-4 h-4 mr-1" />
                          <span>Build Time: {concept.buildTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lean Canvas */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Lean Canvas</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                          <h5 className="text-xs font-semibold text-red-900 mb-2">PROBLEM</h5>
                          <ul className="text-xs text-red-800 space-y-1">
                            {concept.leanCanvas.problem.map((p, idx) => (
                              <li key={idx}>• {p}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <h5 className="text-xs font-semibold text-green-900 mb-2">SOLUTION</h5>
                          <ul className="text-xs text-green-800 space-y-1">
                            {concept.leanCanvas.solution.map((s, idx) => (
                              <li key={idx}>• {s}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <h5 className="text-xs font-semibold text-blue-900 mb-2">KEY METRICS</h5>
                          <ul className="text-xs text-blue-800 space-y-1">
                            {concept.leanCanvas.keyMetrics.map((m, idx) => (
                              <li key={idx}>• {m}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded p-3">
                          <h5 className="text-xs font-semibold text-purple-900 mb-2">UNFAIR ADVANTAGE</h5>
                          <p className="text-xs text-purple-800">{concept.leanCanvas.unfairAdvantage}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-orange-50 border border-orange-200 rounded p-3">
                          <h5 className="text-xs font-semibold text-orange-900 mb-2">COST STRUCTURE</h5>
                          <ul className="text-xs text-orange-800 space-y-1">
                            {concept.leanCanvas.costStructure.map((c, idx) => (
                              <li key={idx}>• {c}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-teal-50 border border-teal-200 rounded p-3">
                          <h5 className="text-xs font-semibold text-teal-900 mb-2">REVENUE STREAMS</h5>
                          <ul className="text-xs text-teal-800 space-y-1">
                            {concept.leanCanvas.revenueStreams.map((r, idx) => (
                              <li key={idx}>• {r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Analysis */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4">Risk Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(concept.risks).map(([riskType, risk]) => (
                      <div key={riskType} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900 capitalize">{riskType} Risk</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.level)}`}>
                            {risk.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Concept generated for {conceptVariant} approach
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                      <SafeIcon icon={FiEdit3} className="w-4 h-4 mr-2" />
                      Customize
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Start Validation
                      <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Next Steps */}
      {generatingState === 'complete' && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Next Steps (48 hours)</h3>
          <div className="space-y-2 text-sm mb-4">
            <p className="text-gray-700">1. <strong>Pick 1 concept</strong> that best matches your skills and market access</p>
            <p className="text-gray-700">2. <strong>Create validation experiments</strong> to test core assumptions</p>
            <p className="text-gray-700">3. <strong>Build landing page</strong> and start collecting early interest signals</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Start Validation Lab
              <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
            </button>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
              Save All Concepts
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ConceptForge;