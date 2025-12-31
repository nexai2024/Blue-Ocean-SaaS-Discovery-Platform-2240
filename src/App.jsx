import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import supabase from './supabase/supabase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import OpportunityRadar from './pages/OpportunityRadar';
import ValueCurveDesigner from './pages/ValueCurveDesigner';
import NicheDeepDiver from './pages/NicheDeepDiver';
import ConceptForge from './pages/ConceptForge';
import ValidationLab from './pages/ValidationLab';
import BuildReadiness from './pages/BuildReadiness';
import UserProfile from './pages/UserProfile';
import Onboarding from './pages/Onboarding';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Indie Builder',
    experience: 'intermediate',
    techStack: [],
    weeklyHours: 20,
    budget: 1000,
    interests: [],
    avoidDomains: []
  });

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles_1740480000000')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUserProfile({
            name: profile.full_name || 'Indie Builder',
            experience: profile.experience_level,
            techStack: profile.tech_stack || [],
            weeklyHours: profile.weekly_hours,
            budget: profile.budget,
            interests: profile.interests || [],
            avoidDomains: profile.avoid_domains || []
          });
          // If profile exists but no tech stack, consider it needing onboarding
          if (!profile.tech_stack || profile.tech_stack.length === 0) {
            setNeedsOnboarding(true);
          }
        } else {
          setNeedsOnboarding(true);
        }
      }
      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) setNeedsOnboarding(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          {/* Onboarding Route - Standalone Page */}
          <Route path="/onboarding" element={
            <Onboarding userProfile={userProfile} setUserProfile={setUserProfile} />
          } />

          {/* Main App Layout */}
          <Route path="/*" element={
            needsOnboarding ? <Navigate to="/onboarding" replace /> : (
              <>
                <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} userProfile={userProfile} />
                <div className="flex">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-64`}>
                    <div className="p-6">
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard userProfile={userProfile} />} />
                          <Route path="/opportunity-radar" element={<OpportunityRadar userProfile={userProfile} />} />
                          <Route path="/value-curve" element={<ValueCurveDesigner />} />
                          <Route path="/niche-diver" element={<NicheDeepDiver userProfile={userProfile} />} />
                          <Route path="/concept-forge" element={<ConceptForge userProfile={userProfile} />} />
                          <Route path="/validation-lab" element={<ValidationLab />} />
                          <Route path="/build-readiness" element={<BuildReadiness userProfile={userProfile} />} />
                          <Route path="/profile" element={<UserProfile userProfile={userProfile} setUserProfile={setUserProfile} />} />
                        </Routes>
                      </AnimatePresence>
                    </div>
                  </main>
                </div>
              </>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;