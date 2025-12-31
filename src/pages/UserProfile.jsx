/* Adding OpenAI Key Setting to Profile */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiKey, FiSave, FiCheckCircle } = FiIcons;

function UserProfile({ userProfile, setUserProfile }) {
  const [openAIKey, setOpenAIKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    localStorage.setItem('openai_api_key', openAIKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold flex items-center">
        <SafeIcon icon={FiUser} className="mr-3 text-blue-600" /> Settings & Profile
      </h1>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
          <SafeIcon icon={FiKey} className="mr-2 text-orange-500" /> AI Configuration
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Enter your OpenAI API Key to enable real-time market research and concept generation. 
          Your key is stored locally in your browser.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">OpenAI Secret Key</label>
            <input 
              type="password" 
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm"
            />
          </div>
          <button 
            onClick={saveSettings}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center hover:bg-blue-700 transition-all"
          >
            {saved ? <SafeIcon icon={FiCheckCircle} className="mr-2" /> : <SafeIcon icon={FiSave} className="mr-2" />}
            {saved ? 'Key Saved' : 'Save API Key'}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
        <div className="text-sm text-blue-800 leading-relaxed">
          <strong>How to get a key:</strong> Visit <a href="https://platform.openai.com/api-keys" target="_blank" className="underline font-bold">OpenAI Dashboard</a>, create a secret key, and paste it here. We recommend using <strong>GPT-4</strong> for best results in market analysis.
        </div>
      </div>
    </motion.div>
  );
}

export default UserProfile;