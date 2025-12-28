import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiRadar, FiFilter, FiTrendingUp, FiDollarSign, 
  FiClock, FiUsers, FiTarget, FiArrowRight, FiRefreshCw, FiBookmark, FiZap 
} = FiIcons;

function OpportunityRadar({ userProfile }) {
  const navigate = useNavigate();
  const [scanningState, setScanningState] = useState('idle');
  
  const opportunities = [
    {
      id: 1,
      title: 'AI-Powered Compliance Automation for Small Law Firms',
      niche: 'Legal Tech',
      audience: 'Solo practitioners & small law firms (2-10 lawyers)',
      blueOceanAngle: 'Simplified "Compliance-in-a-box" with proactive AI monitoring alerts.',
      difficulty: 7,
      monetization: '$200-500/month',
      timeToBuild: '3-4 months',
      techFit: 95
    },
    {
      id: 2,
      title: 'White-Label Portal for Boutique Creative Agencies',
      niche: 'Agency Ops',
      audience: 'Design & marketing agencies (5-25 people)',
      blueOceanAngle: 'Client self-service + project automation without the generic Jira/Asana bloat.',
      difficulty: 5,
      monetization: '$99-299/month',
      timeToBuild: '6-8 weeks',
      techFit: 90
    }
  ];

  const handleScan = () => {
    setScanningState('scanning');
    setTimeout(() => setScanningState('complete'), 2500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 flex items-center">
            <SafeIcon icon={FiRadar} className="w-10 h-10 mr-4 text-blue-600" />
            Opportunity Radar
          </h1>
          <p className="text-slate-500 font-medium mt-2">AI-powered discovery of blue ocean market gaps.</p>
        </div>
        <button 
          onClick={handleScan} 
          disabled={scanningState === 'scanning'}
          className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-black transition-all hover:bg-blue-700 shadow-xl shadow-blue-200 disabled:opacity-50"
        >
          <SafeIcon icon={FiRefreshCw} className={`w-5 h-5 mr-2 ${scanningState === 'scanning' ? 'animate-spin' : ''}`} />
          {scanningState === 'scanning' ? 'Scanning Web...' : 'Initiate Market Scan'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {scanningState === 'scanning' ? (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-slate-900 rounded-[2.5rem] p-16 text-center border border-slate-800 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <SafeIcon icon={FiRadar} className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Analyzing Market Gaps...</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8 font-medium italic">
                Cross-referencing Reddit pain points, G2 competitor weaknesses, and your specific tech stack...
              </p>
              <div className="w-64 mx-auto bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="bg-blue-500 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {opportunities.map((opp, i) => (
              <motion.div 
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all overflow-hidden group"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{opp.niche}</span>
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">High Potential</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{opp.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{opp.blueOceanAngle}</p>
                    </div>
                    <div className="flex flex-row md:flex-col gap-3">
                      <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">
                        <SafeIcon icon={FiBookmark} className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Monetization', val: opp.monetization, icon: FiDollarSign },
                      { label: 'Complexity', val: `Difficulty: ${opp.difficulty}/10`, icon: FiTarget },
                      { label: 'Build Time', val: opp.timeToBuild, icon: FiClock },
                      { label: 'Tech Fit', val: `${opp.techFit}% Match`, icon: FiTrendingUp }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <SafeIcon icon={stat.icon} className="w-4 h-4 text-slate-400 mb-2" />
                        <div className="text-sm font-black text-slate-900">{stat.val}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                    <button 
                      onClick={() => navigate('/niche-diver')} 
                      className="flex-1 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center"
                    >
                      Deep-Dive Niche <SafeIcon icon={FiArrowRight} className="ml-2" />
                    </button>
                    <button 
                      onClick={() => navigate('/concept-forge')} 
                      className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-100"
                    >
                      Forge Concept <SafeIcon icon={FiZap} className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default OpportunityRadar;