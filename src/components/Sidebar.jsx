import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiHome, FiRadar, FiTrendingUp, FiSearch, 
  FiLightbulb, FiCheckCircle, FiSettings, FiUser, FiX, FiActivity 
} = FiIcons;

const menuItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard', desc: 'Home' },
  { path: '/opportunity-radar', icon: FiRadar, label: 'Radar', desc: 'Scan Markets' },
  { path: '/niche-diver', icon: FiSearch, label: 'Deep Diver', desc: 'Vertical Analysis' },
  { path: '/value-curve', icon: FiTrendingUp, label: 'Value Curve', desc: 'Strategy Canvas' },
  { path: '/concept-forge', icon: FiLightbulb, label: 'Forge', desc: 'Concept Design' },
  { path: '/validation-lab', icon: FiCheckCircle, label: 'Lab', desc: 'Validation Signals' },
  { path: '/build-readiness', icon: FiSettings, label: 'Ready', desc: 'MVP Roadmap' },
];

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" 
            onClick={onClose} 
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -280 }}
        className="fixed top-0 left-0 z-50 w-72 h-full bg-white border-r border-slate-100 lg:static transition-transform duration-300 shadow-2xl lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <SafeIcon icon={FiActivity} className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">BlueOcean</span>
            </Link>
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-900"><SafeIcon icon={FiX} /></button>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
            <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Discovery Workflow</div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <SafeIcon icon={item.icon} className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-8 border-t border-slate-100">
            <Link 
              to="/profile" 
              className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-black text-slate-900 truncate">Indie Builder</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Settings</div>
              </div>
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

const AnimatePresence = motion.AnimatePresence;

export default Sidebar;