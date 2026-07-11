import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';

const { 
  FiRadar, FiTrendingUp, FiTarget, FiActivity, 
  FiZap, FiArrowRight, FiCheckCircle, FiSettings, FiUsers 
} = FiIcons;

function Dashboard({ userProfile }) {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ opps: 0, concepts: 0, experiments: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [oppRes, conceptRes, expRes] = await Promise.all([
        supabase.from('opportunities_1740480000000').select('id', { count: 'exact', head: true }),
        supabase.from('concepts_1740480000000').select('id', { count: 'exact', head: true }),
        supabase.from('experiments_1740480000000').select('id', { count: 'exact', head: true })
      ]);
      setCounts({
        opps: oppRes.count || 0,
        concepts: conceptRes.count || 0,
        experiments: expRes.count || 0
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: 'Opportunities Found', value: String(counts.opps), icon: FiRadar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Concepts Forged', value: String(counts.concepts), icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Market Pressure', value: 'Low', icon: FiActivity, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Experiments', value: String(counts.experiments), icon: FiSettings, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-7xl mx-auto space-y-8 pb-12"
    >
      {/* Hero Section */}
      <section className="relative bg-slate-900 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <SafeIcon icon={FiZap} className="text-blue-400 w-4 h-4 mr-2" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Opportunity Engine Active</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
            Build what the <span className="text-blue-500">market actually wants.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed font-medium">
            Welcome back, {userProfile.name || 'Builder'}. We've analyzed your {userProfile.techStack.length} core skills. 
            You're currently in the <span className="text-white">Discovery Phase</span> for <span className="text-blue-400">Legal Automation</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/opportunity-radar')} 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center group"
            >
              Scan New Markets 
              <SafeIcon icon={FiArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/profile')} 
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all border border-slate-700"
            >
              Update Skills
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
            onClick={() => navigate('/opportunity-radar')}
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <SafeIcon icon={stat.icon} className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Flow Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Recommended Path</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase">Step 1 of 6</span>
            </div>
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-6 md:space-y-0 text-center md:text-left">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-[1.25rem] flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-200 mx-auto md:mx-0">1</div>
                <div className="flex-1">
                  <h4 className="text-2xl font-black text-slate-900 mb-3">Deep-Dive: Legal Compliance Gaps</h4>
                  <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                    Our scanner identified a massive gap in small law firm compliance. Enterprise tools like Clio are too generic. You have the skills to build a niche alternative.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button 
                      onClick={() => navigate('/niche-diver')} 
                      className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center"
                    >
                      Analyze Niche <SafeIcon icon={FiArrowRight} className="ml-2" />
                    </button>
                    <button 
                      onClick={() => navigate('/opportunity-radar')} 
                      className="px-8 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
                    >
                      View All Radar Hits
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Validation Signals</h3>
              <button onClick={() => navigate('/validation-lab')} className="text-blue-600 text-xs font-black uppercase hover:underline">View Lab</button>
            </div>
            <div className="space-y-4">
              {[
                { action: 'Waitlist Signup', item: 'LegalGuard Pro', time: '2h ago', status: '+15%', color: 'text-green-600' },
                { action: 'Value Curve Refined', item: 'AgencyFlow', time: '5h ago', status: 'Saved', color: 'text-blue-600' },
                { action: 'Market Scan', item: 'B2B Creative', time: '1d ago', status: 'Cleaned', color: 'text-slate-400' }
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.25rem] border border-transparent hover:border-slate-200 transition-all cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full group-hover:scale-125 transition-transform" />
                    <div>
                      <div className="text-sm font-black text-slate-900">{act.action}</div>
                      <div className="text-xs font-bold text-slate-400">{act.item}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1">{act.time}</div>
                    <div className={`text-xs font-black ${act.color}`}>{act.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-black mb-4">Indie Builder Tip</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-8 opacity-90">
              "Don't build features until you have 5 discovery calls with potential buyers. Your technical skills are a liability if you build the wrong thing."
            </p>
            <button 
              onClick={() => navigate('/validation-lab')} 
              className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-black text-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Start Discovery Sprint
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiUsers} className="w-8 h-8 text-slate-300" />
            </div>
            <h4 className="font-black text-slate-900 mb-2">Portfolio Synergy</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
              Connect your existing micro-SaaS apps to see potential MRR compounding opportunities.
            </p>
            <button 
              onClick={() => navigate('/profile')} 
              className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              Configure Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;