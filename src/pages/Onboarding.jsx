import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../supabase/supabase';

const { 
  FiChevronRight, FiChevronLeft, FiTarget, FiZap, 
  FiCode, FiClock, FiDollarSign, FiCheck, FiInfo 
} = FiIcons;

const Onboarding = ({ userProfile, setUserProfile }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 5;

  const techStackOptions = [
    { id: 'nextjs', name: 'Next.js' }, { id: 'react', name: 'React' },
    { id: 'typescript', name: 'TypeScript' }, { id: 'python', name: 'Python' },
    { id: 'supabase', name: 'Supabase' }, { id: 'node', name: 'Node.js' }
  ];

  const interestOptions = [
    'Legal Tech', 'FinTech', 'HealthTech', 'Agency Tools', 'AI/ML', 'SaaS'
  ];

  const handleNext = () => step < totalSteps ? setStep(s => s + 1) : finishOnboarding();
  const handleBack = () => step > 1 && setStep(s => s - 1);

  const updateProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleItem = (field, item) => {
    const current = userProfile[field] || [];
    const updated = current.includes(item) 
      ? current.filter(i => i !== item) 
      : [...current, item];
    updateProfile(field, updated);
  };

  const finishOnboarding = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles_1740480000000').upsert({
          id: user.id,
          full_name: userProfile.name,
          experience_level: userProfile.experience,
          tech_stack: userProfile.techStack,
          weekly_hours: userProfile.weeklyHours,
          budget: userProfile.budget,
          interests: userProfile.interests,
          updated_at: new Date()
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Step {step} of {totalSteps}</span>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="min-h-[350px] flex flex-col"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4">
                    <SafeIcon icon={FiTarget} className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight">Welcome to the <span className="text-blue-500">Blue Ocean</span> Discovery.</h2>
                  <p className="text-slate-400 leading-relaxed">
                    Most founders build in "Red Oceans"—crowded markets with bloody competition. We're here to help you find uncontested market space where competition is irrelevant.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3">
                    <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-xs text-blue-300/80 font-medium">We'll start by analyzing your unique advantages to match you with the right opportunities.</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-white">What's your building experience?</h3>
                  <div className="grid gap-4">
                    {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => updateProfile('experience', lvl)}
                        className={`p-5 rounded-2xl border text-left transition-all ${userProfile.experience === lvl ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:border-slate-500'}`}
                      >
                        <div className="font-black uppercase text-[10px] tracking-widest mb-1">{lvl}</div>
                        <div className="text-sm font-bold">{lvl === 'beginner' ? 'New to SaaS' : lvl === 'intermediate' ? 'Built & Launched Projects' : 'Experienced Founder'}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-white">Select your technical edge.</h3>
                  <p className="text-slate-400 text-sm">We match opportunities to what you can actually build.</p>
                  <div className="flex flex-wrap gap-3">
                    {techStackOptions.map((tech) => (
                      <button
                        key={tech.id}
                        onClick={() => toggleItem('techStack', tech.id)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border ${userProfile.techStack.includes(tech.id) ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-700/30 border-slate-600 text-slate-400'}`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-black text-white">Your Resources.</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Weekly Building Hours</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" min="5" max="60" step="5"
                          value={userProfile.weeklyHours}
                          onChange={(e) => updateProfile('weeklyHours', parseInt(e.target.value))}
                          className="flex-1 accent-blue-500"
                        />
                        <span className="text-2xl font-black text-white w-12">{userProfile.weeklyHours}h</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Initial Launch Budget ($)</label>
                      <div className="relative">
                        <SafeIcon icon={FiDollarSign} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                          type="number"
                          value={userProfile.budget}
                          onChange={(e) => updateProfile('budget', parseInt(e.target.value))}
                          className="w-full bg-slate-700/30 border border-slate-600 rounded-2xl py-4 pl-12 pr-6 text-white font-bold focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-white">Final Step: Market Interests.</h3>
                  <p className="text-slate-400 text-sm">Select domains you're curious about or have expertise in.</p>
                  <div className="flex flex-wrap gap-3">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleItem('interests', interest)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border ${userProfile.interests.includes(interest) ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-700/30 border-slate-600 text-slate-400'}`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-700/50">
            <button 
              onClick={handleBack}
              className={`flex items-center text-slate-500 font-bold hover:text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <SafeIcon icon={FiChevronLeft} className="mr-2" /> Back
            </button>
            <button 
              onClick={handleNext}
              disabled={loading}
              className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-900/40 flex items-center hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <>
                  {step === totalSteps ? 'Launch Dashboard' : 'Continue'}
                  <SafeIcon icon={step === totalSteps ? FiZap : FiChevronRight} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;