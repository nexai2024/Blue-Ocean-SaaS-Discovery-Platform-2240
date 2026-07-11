import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';
import { aiService } from '../services/aiService';

const { 
  FiTrendingUp, FiPlus, FiTarget,
  FiX, FiLightbulb, FiArrowRight,
  FiRefreshCw, FiAlertCircle
} = FiIcons;

function ValueCurveDesigner() {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState('');
  const [competitors, setCompetitors] = useState(['Clio', 'SimpleLegal']);
  const [newCompetitor, setNewCompetitor] = useState('');
  const [valueDimensions, setValueDimensions] = useState([
    { name: 'Price Efficiency', yourProduct: 9, comp1: 3, comp2: 2, action: 'raise', importance: 'high' },
    { name: 'Ease of Use', yourProduct: 8, comp1: 6, comp2: 4, action: 'raise', importance: 'high' },
    { name: 'Feature Bloat', yourProduct: 3, comp1: 8, comp2: 9, action: 'reduce', importance: 'medium' },
    { name: 'Onboarding Speed', yourProduct: 9, comp1: 4, comp2: 3, action: 'raise', importance: 'high' },
    { name: 'AI Automation', yourProduct: 10, comp1: 2, comp2: 1, action: 'create', importance: 'high' },
    { name: 'Enterprise Integrations', yourProduct: 2, comp1: 9, comp2: 8, action: 'eliminate', importance: 'low' }
  ]);
  const [aiAdvice, setAiAdvice] = useState(null);
  const [adviceLoading, setAdviceLoading] = useState(false);
  const [adviceError, setAdviceError] = useState(null);

  useEffect(() => {
    const fetchOpps = async () => {
      const { data } = await supabase
        .from('opportunities_1740480000000')
        .select('*')
        .order('created_at', { ascending: false });
      if (data?.length) {
        setOpportunities(data);
        setSelectedOpportunity(data[0].id);
      }
    };
    fetchOpps();
  }, []);

  const chartOption = useMemo(() => ({
    title: { text: 'Blue Ocean Strategy Canvas', textStyle: { fontSize: 14, color: '#64748b' } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['Your SaaS', ...competitors], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: valueDimensions.map(d => d.name),
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: { type: 'value', min: 0, max: 10, splitLine: { lineStyle: { type: 'dashed' } } },
    series: [
      {
        name: 'Your SaaS',
        type: 'line',
        data: valueDimensions.map(d => d.yourProduct),
        symbolSize: 10,
        lineStyle: { width: 4, color: '#3b82f6' },
        itemStyle: { color: '#3b82f6' }
      },
      ...competitors.map((c, i) => ({
        name: c,
        type: 'line',
        data: valueDimensions.map(d => d[`comp${i + 1}`] || 5),
        lineStyle: { type: 'dashed', width: 2 },
        symbol: 'circle'
      }))
    ]
  }), [valueDimensions, competitors]);

  const handleRequestAdvice = async () => {
    setAdviceLoading(true);
    setAdviceError(null);
    setAiAdvice(null);

    try {
      const result = await aiService.getStrategyAdvice(valueDimensions, competitors);
      setAiAdvice(result);
    } catch (err) {
      setAdviceError(err.message);
    } finally {
      setAdviceLoading(false);
    }
  };

  const addCompetitor = () => {
    const trimmed = newCompetitor.trim();
    if (trimmed && !competitors.includes(trimmed)) {
      setCompetitors(prev => [...prev, trimmed]);
      setNewCompetitor('');
    }
  };

  const removeCompetitor = (index) => {
    setCompetitors(prev => prev.filter((_, i) => i !== index));
  };

  const updateDimension = (index, field, value) => {
    const updated = [...valueDimensions];
    updated[index][field] = value;
    setValueDimensions(updated);
  };

  const selectedOpp = opportunities.find(o => o.id === selectedOpportunity);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="w-8 h-8 mr-3 text-blue-600" />
            Value Curve Designer
          </h1>
          <p className="text-slate-600">Map your differentiation strategy vs the competition.</p>
        </div>
      </div>

      {/* Opportunity Selector */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Opportunity</label>
            <select
              value={selectedOpportunity}
              onChange={(e) => setSelectedOpportunity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select an opportunity...</option>
              {opportunities.map(opp => (
                <option key={opp.id} value={opp.id}>{opp.title} — {opp.niche}</option>
              ))}
            </select>
            {selectedOpp && (
              <p className="text-xs text-gray-500 mt-2">{selectedOpp.blue_ocean_angle}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitors</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
                placeholder="Add competitor..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={addCompetitor}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
              </button>
            </div>
            {competitors.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {competitors.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                    {c}
                    <button onClick={() => removeCompetitor(i)} className="hover:text-red-500 transition-colors">
                      <SafeIcon icon={FiX} className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <ReactECharts option={chartOption} style={{ height: '400px' }} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4">Dimension</th>
                  <th className="text-center p-4">You</th>
                  <th className="text-center p-4">Comp 1</th>
                  <th className="text-center p-4">Comp 2</th>
                  <th className="text-center p-4">Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {valueDimensions.map((d, i) => (
                  <tr key={i}>
                    <td className="p-4 font-medium">{d.name}</td>
                    <td className="p-4 text-center">
                      <input type="number" min="0" max="10" value={d.yourProduct} 
                        onChange={(e) => updateDimension(i, 'yourProduct', parseInt(e.target.value) || 0)}
                        className="w-12 text-center border rounded p-1" />
                    </td>
                    <td className="p-4 text-center">
                      <input type="number" min="0" max="10" value={d.comp1} 
                        onChange={(e) => updateDimension(i, 'comp1', parseInt(e.target.value) || 0)}
                        className="w-12 text-center border rounded p-1" />
                    </td>
                    <td className="p-4 text-center">
                      <input type="number" min="0" max="10" value={d.comp2} 
                        onChange={(e) => updateDimension(i, 'comp2', parseInt(e.target.value) || 0)}
                        className="w-12 text-center border rounded p-1" />
                    </td>
                    <td className="p-4 text-center">
                      <select value={d.action} onChange={(e) => updateDimension(i, 'action', e.target.value)}
                        className="text-xs border rounded p-1">
                        <option value="raise">Raise</option>
                        <option value="reduce">Reduce</option>
                        <option value="eliminate">Eliminate</option>
                        <option value="create">Create</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI Strategy Advisor - Now dynamic */}
          <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <SafeIcon icon={FiLightbulb} className="mr-2" /> AI Strategy Advisor
            </h3>

            {adviceError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-white text-sm flex items-center">
                <SafeIcon icon={FiAlertCircle} className="mr-2 flex-shrink-0" /> {adviceError}
              </div>
            )}

            {aiAdvice ? (
              <div className="space-y-3 mb-4">
                <p className="text-blue-100 text-sm leading-relaxed">
                  &ldquo;{aiAdvice.advice}&rdquo;
                </p>
                {aiAdvice.recommendedMoves && aiAdvice.recommendedMoves.length > 0 && (
                  <div className="space-y-2">
                    {aiAdvice.recommendedMoves.map((move, i) => (
                      <div key={i} className="p-2.5 bg-blue-500/30 rounded-lg">
                        <div className="text-xs font-bold uppercase tracking-wider mb-0.5">
                          {move.action} — {move.dimension}
                        </div>
                        <div className="text-xs text-blue-100">{move.reason}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : !adviceLoading && !adviceError ? (
              <p className="text-blue-100 text-sm mb-4">
                Click below to receive AI-powered Blue Ocean strategy recommendations based on your value curve and competitors.
              </p>
            ) : null}

            {adviceLoading && (
              <div className="flex items-center justify-center py-4 mb-4">
                <SafeIcon icon={FiRefreshCw} className="w-5 h-5 animate-spin text-white mr-2" />
                <span className="text-sm text-blue-100">Analyzing strategy...</span>
              </div>
            )}

            <button
              onClick={handleRequestAdvice}
              disabled={adviceLoading}
              className="w-full py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              {adviceLoading ? 'Consulting AI...' : aiAdvice ? 'Refresh AI Advice' : 'Request AI Strategy'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">Positioning Statement</h3>
            <div className="p-4 bg-slate-50 rounded-lg text-xs leading-relaxed italic text-slate-700">
              &ldquo;For small law firms who struggle with manual compliance, our SaaS provides 100% automated AI monitoring, unlike Clio which requires manual data entry.&rdquo;
            </div>
            <button className="mt-4 w-full flex items-center justify-center py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
              Refine in Concept Forge <SafeIcon icon={FiArrowRight} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ValueCurveDesigner;
