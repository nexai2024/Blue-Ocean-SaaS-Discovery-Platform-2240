import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';

const { FiLightbulb, FiTarget, FiDollarSign, FiRefreshCw, FiArrowRight, FiZap } = FiIcons;

function ConceptForge({ userProfile }) {
  const [selectedOpportunity, setSelectedOpportunity] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [generatingState, setGeneratingState] = useState('idle');

  useEffect(() => {
    const loadData = async () => {
      const { data: opps } = await supabase.from('opportunities_1740480000000').select('*');
      if (opps) setOpportunities(opps);
      
      const { data: concs } = await supabase.from('concepts_1740480000000').select('*');
      if (concs) setConcepts(concs);
    };
    loadData();
  }, []);

  const handleGenerate = async () => {
    if (!selectedOpportunity) return;
    setGeneratingState('generating');
    
    setTimeout(async () => {
      const opp = opportunities.find(o => o.id === selectedOpportunity);
      const newConcept = {
        opportunity_id: selectedOpportunity,
        name: `${opp.niche}Guard Pro`,
        tagline: 'Blue Ocean Protection for Your Business',
        one_liner: `Automated ${opp.niche} monitoring for small teams.`,
        lean_canvas: { solution: ['AI Monitoring', 'Global Dashboard'] },
        risks: { market: 'low' },
        pricing_model: '$99/mo',
        build_time_estimate: '8 weeks'
      };

      const { data, error } = await supabase
        .from('concepts_1740480000000')
        .insert([newConcept])
        .select();

      if (data) setConcepts(prev => [data[0], ...prev]);
      setGeneratingState('complete');
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <SafeIcon icon={FiLightbulb} className="w-8 h-8 mr-3 text-blue-600" /> Concept Forge
      </h1>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Opportunity</label>
        <select 
          value={selectedOpportunity} 
          onChange={(e) => setSelectedOpportunity(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6"
        >
          <option value="">Choose an opportunity...</option>
          {opportunities.map(opp => <option key={opp.id} value={opp.id}>{opp.title}</option>)}
        </select>
        <button 
          onClick={handleGenerate} 
          disabled={!selectedOpportunity || generatingState === 'generating'}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center disabled:opacity-50"
        >
          <SafeIcon icon={FiRefreshCw} className={`mr-2 ${generatingState === 'generating' ? 'animate-spin' : ''}`} />
          {generatingState === 'generating' ? 'Forging...' : 'Generate Concepts'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, i) => (
          <motion.div key={concept.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">{concept.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{concept.one_liner}</p>
            <div className="flex justify-between text-xs font-bold text-blue-600">
              <span>{concept.pricing_model}</span>
              <span>{concept.build_time_estimate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ConceptForge;