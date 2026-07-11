import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';
import { aiService } from '../services/aiService';

const { FiSearch, FiClock, FiZap, FiRefreshCw, FiArrowRight, FiAlertCircle } = FiIcons;

function NicheDeepDiver({ userProfile }) {
  const [nicheInput, setNicheInput] = useState('');
  const [geography, setGeography] = useState('global');
  const [analysisState, setAnalysisState] = useState('idle');
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [previousAnalyses, setPreviousAnalyses] = useState([]);

  useEffect(() => {
    const fetchPrevious = async () => {
      const { data } = await supabase
        .from('deep_dives_1740480000000')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setPreviousAnalyses(data);
    };
    fetchPrevious();
  }, []);

  const handleAnalyze = async () => {
    if (!nicheInput.trim()) return;
    setAnalysisState('analyzing');
    setError(null);

    try {
      const data = await aiService.deepDiveNiche(nicheInput, geography);
      setAnalysisData(data);
      setAnalysisState('complete');

      // Persist to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: saved } = await supabase
          .from('deep_dives_1740480000000')
          .insert({
            user_id: user.id,
            niche: nicheInput,
            geography,
            analysis_data: data
          })
          .select()
          .single();
        if (saved) {
          setPreviousAnalyses(prev => [saved, ...prev]);
        }
      }
    } catch (err) {
      setError(err.message);
      setAnalysisState('idle');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiSearch} className="w-8 h-8 mr-3 text-blue-600" /> Niche Deep-Diver
        </h1>
        <p className="text-gray-600 mt-1">Uncover hidden workflow opportunities using AI analysis.</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Niche</label>
            <input 
              type="text" 
              value={nicheInput} 
              onChange={(e) => setNicheInput(e.target.value)}
              placeholder="e.g., Boutique SEO agencies, Solo Architects"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select value={geography} onChange={(e) => setGeography(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="global">Global</option>
              <option value="us">United States</option>
              <option value="europe">Europe</option>
            </select>
          </div>
        </div>
        <button 
          onClick={handleAnalyze} 
          disabled={analysisState === 'analyzing'}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center disabled:opacity-50"
        >
          <SafeIcon icon={FiRefreshCw} className={`mr-2 ${analysisState === 'analyzing' ? 'animate-spin' : ''}`} />
          {analysisState === 'analyzing' ? 'Deep Diving...' : 'Start AI Analysis'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm font-bold flex items-center">
          <SafeIcon icon={FiAlertCircle} className="mr-2" /> {error}
        </div>
      )}

      {analysisData && analysisState === 'complete' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <SafeIcon icon={FiClock} className="mr-2 text-blue-500" /> Day in the Life
            </h3>
            <div className="space-y-4">
              {(analysisData.dayInLife || []).map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-20 font-black text-blue-600 text-sm">{item.time}</div>
                  <div>
                    <div className="font-bold text-slate-900">{item.activity}</div>
                    <div className="text-sm text-red-500 font-medium">Pain: {item.pain}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-xl border border-gray-100">
               <h3 className="font-bold mb-4">Workflow Friction</h3>
               {(analysisData.keyWorkflows || []).map((w, i) => (
                 <div key={i} className="mb-3 p-3 border border-slate-100 rounded-lg">
                   <div className="font-bold text-sm">{w.workflow} ({w.duration})</div>
                   <div className="text-xs text-slate-500">{w.pain}</div>
                 </div>
               ))}
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-100">
               <h3 className="font-bold mb-4">Blue Ocean Concepts</h3>
               {(analysisData.concepts || []).map((c, i) => (
                 <div key={i} className="mb-3 p-3 bg-blue-50 rounded-lg">
                   <div className="font-bold text-blue-700">{c.name}</div>
                   <div className="text-xs text-blue-600">{c.hook}</div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* Previous Analyses */}
      {previousAnalyses.length > 0 && analysisState !== 'complete' && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Previous Analyses</h3>
          <div className="space-y-3">
            {previousAnalyses.slice(0, 5).map((prev) => (
              <button
                key={prev.id}
                onClick={() => {
                  setAnalysisData(prev.analysis_data);
                  setAnalysisState('complete');
                  setNicheInput(prev.niche);
                  setGeography(prev.geography);
                }}
                className="w-full text-left p-4 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors group"
              >
                <div className="font-bold text-slate-900 group-hover:text-blue-700">{prev.niche}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {prev.geography} &middot; {new Date(prev.created_at).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default NicheDeepDiver;