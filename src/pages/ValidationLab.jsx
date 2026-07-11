import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';

const { 
  FiCheckCircle, FiTarget, FiUsers, FiMessageSquare, 
  FiGlobe, FiBarChart3, FiArrowRight, FiPlay, FiPlus, FiSettings,
  FiRefreshCw
} = FiIcons;

function ValidationLab() {
  const navigate = useNavigate();
  const [signals, setSignals] = useState({ visits: 0, signups: 0, calls: 0, preorders: 0 });
  const [activeTab, setActiveTab] = useState('signals');
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signalId, setSignalId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      // Load validation signals
      const { data: sigData } = await supabase
        .from('validation_signals_1740480000000')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (sigData) {
        setSignals({
          visits: sigData.visits || 0,
          signups: sigData.signups || 0,
          calls: sigData.calls || 0,
          preorders: sigData.preorders || 0
        });
        setSignalId(sigData.id);
      }

      // Load experiments
      const { data: expData } = await supabase
        .from('experiments_1740480000000')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (expData?.length) {
        setExperiments(expData);
      }

      setLoading(false);
    };
    loadData();
  }, []);

  const updateSignal = async (key, val) => {
    const newSignals = { ...signals, [key]: Math.max(0, signals[key] + val) };
    setSignals(newSignals);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const payload = {
      user_id: user.id,
      visits: newSignals.visits,
      signups: newSignals.signups,
      calls: newSignals.calls,
      preorders: newSignals.preorders,
      updated_at: new Date()
    };

    if (signalId) {
      await supabase
        .from('validation_signals_1740480000000')
        .update(payload)
        .eq('id', signalId);
    } else {
      const { data } = await supabase
        .from('validation_signals_1740480000000')
        .insert(payload)
        .select()
        .single();
      if (data) setSignalId(data.id);
    }
  };

  const conversionRate = signals.visits > 0
    ? ((signals.signups / signals.visits) * 100).toFixed(1)
    : '0.0';

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center py-32">
        <SafeIcon icon={FiRefreshCw} className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 flex items-center">
            <SafeIcon icon={FiCheckCircle} className="w-10 h-10 mr-4 text-green-600" />
            Validation Lab
          </h1>
          <p className="text-slate-500 font-medium mt-2">Data-driven evidence for your SaaS concept.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {['signals', 'experiments'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'signals' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Page Visits', key: 'visits', icon: FiGlobe, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Waitlist', key: 'signups', icon: FiUsers, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Calls', key: 'calls', icon: FiMessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Pre-Orders', key: 'preorders', icon: FiTarget, color: 'text-orange-600', bg: 'bg-orange-50' }
              ].map(s => (
                <div key={s.key} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 ${s.bg} rounded-xl`}>
                      <SafeIcon icon={s.icon} className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => updateSignal(s.key, 1)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors">
                        <SafeIcon icon={FiPlus} className="w-3 h-3" />
                      </button>
                      <button onClick={() => updateSignal(s.key, -1)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors">
                        <SafeIcon icon={FiPlus} className="w-3 h-3 rotate-45" />
                      </button>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1">{signals[s.key]}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center">
                <SafeIcon icon={FiBarChart3} className="mr-3 text-green-600" /> Conversion Analysis
              </h3>
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-4">
                    <span className="text-slate-500">Visit to Signup ({conversionRate}%)</span>
                    <span className="text-green-600">3x Industry Benchmark</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-1 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${Math.min(parseFloat(conversionRate) * 5, 100)}%` }}
                      className={`h-full rounded-full shadow-lg ${parseFloat(conversionRate) > 5 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-yellow-500'}`} 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-4">
                    <span className="text-slate-500">Signup to Call ({signals.signups > 0 ? ((signals.calls / signals.signups) * 100).toFixed(1) : '0.0'}%)</span>
                    <span className="text-purple-600">Target: &gt;10%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-1 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${signals.signups > 0 ? (signals.calls / signals.signups) * 100 : 0}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full blur-[80px]" />
              <h3 className="text-xl font-black mb-6 flex items-center">
                <SafeIcon icon={FiPlay} className="mr-3 text-green-400" /> AI Verdict
              </h3>
              {signals.visits > 0 ? (
                <>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                    <span className="text-green-400 font-black uppercase text-[10px] tracking-[0.3em]">Live Data</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                    &ldquo;{signals.signups} signups from {signals.visits} visits ({conversionRate}% conversion).
                    {parseFloat(conversionRate) > 5
                      ? ' Strong signal — accelerate to MVP build.'
                      : parseFloat(conversionRate) > 2
                        ? ' Moderate interest — try refining your landing page.'
                        : ' Low conversion — revisit your value proposition before building.'}&rdquo;
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-2.5 h-2.5 bg-slate-500 rounded-full" />
                    <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Awaiting Data</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                    &ldquo;Start tracking validation signals using the counters above. Once you have real data, the AI will evaluate your product-market fit.&rdquo;
                  </p>
                </>
              )}
              <button 
                onClick={() => navigate('/build-readiness')}
                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-green-900/20 flex items-center justify-center"
              >
                Plan MVP Build <SafeIcon icon={FiSettings} className="ml-2" />
              </button>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiGlobe} className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-black text-slate-900 mb-2">LP Smoke Test</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Status: Live</p>
              <button className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-50 transition-all">
                Update Assets
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'experiments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.length > 0 ? (
            experiments.map((exp, i) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                    <SafeIcon icon={FiMessageSquare} className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    exp.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {exp.status}
                  </span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{exp.name}</h4>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-8 p-0.5">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '0%' }} />
                </div>
                <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-100 transition-all uppercase tracking-widest">
                  Explore Protocol
                </button>
              </motion.div>
            ))
          ) : (
            <>
              {[
                { name: 'Problem Interviews', status: 'In Progress', icon: FiMessageSquare },
                { name: 'Landing Page v2', status: 'Completed', icon: FiGlobe },
                { name: 'Concierge Proof', status: 'Ready', icon: FiTarget }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                      <SafeIcon icon={exp.icon} className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      exp.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {exp.status}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-4">{exp.name}</h4>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-8 p-0.5">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: exp.status === 'Completed' ? '100%' : exp.status === 'In Progress' ? '60%' : '0%' }} />
                  </div>
                  <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-100 transition-all uppercase tracking-widest">
                    Explore Protocol
                  </button>
                </motion.div>
              ))}
            </>
          )}
          <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-center flex-col items-center justify-center text-center cursor-pointer hover:bg-white transition-all">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <SafeIcon icon={FiPlus} className="w-6 h-6 text-slate-400" />
            </div>
            <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Add Experiment</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ValidationLab;
