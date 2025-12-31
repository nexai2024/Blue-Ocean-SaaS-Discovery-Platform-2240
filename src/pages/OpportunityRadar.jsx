import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';
import { aiService } from '../services/aiService';

const { 
  FiRadar, FiDollarSign, FiTarget, FiRefreshCw, FiZap, FiAlertCircle 
} = FiIcons;

function OpportunityRadar({ userProfile }) {
  const navigate = useNavigate();
  const [scanningState, setScanningState] = useState('idle');
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    const { data } = await supabase
      .from('opportunities_1740480000000')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setOpportunities(data);
  };

  const handleScan = async () => {
    setError(null);
    setScanningState('scanning');
    
    try {
      const result = await aiService.scanMarketGaps(userProfile);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      const formattedOpps = result.opportunities.map(opp => ({
        ...opp,
        user_id: user?.id,
        status: 'new'
      }));

      const { data, error: dbError } = await supabase
        .from('opportunities_1740480000000')
        .insert(formattedOpps)
        .select();

      if (dbError) throw dbError;
      if (data) setOpportunities(prev => [...data, ...prev]);
      setScanningState('complete');
    } catch (err) {
      setError(err.message);
      setScanningState('idle');
    }
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
          {scanningState === 'scanning' ? 'Consulting AI...' : 'Initiate Market Scan'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center text-red-700">
          <SafeIcon icon={FiAlertCircle} className="mr-3" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {scanningState === 'scanning' ? (
          <motion.div key="scanning" className="bg-slate-900 rounded-[2.5rem] p-16 text-center border border-slate-800">
            <h3 className="text-3xl font-black text-white mb-4">Scanning Global Markets...</h3>
            <p className="text-slate-400 mb-8">Matching your tech stack with hidden industry friction points.</p>
            <div className="w-64 mx-auto bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div className="bg-blue-500 h-full" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 10 }} />
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <motion.div key={opp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden group">
                <div className="p-8">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{opp.niche}</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-4 mb-3">{opp.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">{opp.blue_ocean_angle}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <div className="text-[10px] font-black text-slate-400 uppercase">Potential ARPU</div>
                      <div className="text-lg font-black text-slate-900">${opp.potential_arpu}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <div className="text-[10px] font-black text-slate-400 uppercase">Difficulty</div>
                      <div className="text-lg font-black text-slate-900">{opp.difficulty}/10</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/concept-forge', { state: { opportunity: opp } })}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all flex items-center justify-center"
                  >
                    Forge Concept <SafeIcon icon={FiZap} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default OpportunityRadar;