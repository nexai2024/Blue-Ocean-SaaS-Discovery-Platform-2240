import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    experience: 'intermediate',
    techStack: ['nextjs', 'typescript', 'prisma', 'postgres'],
    weeklyHours: 20,
    budget: 1000,
    interests: [],
    avoidDomains: []
  });

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userProfile={userProfile}
        />
        
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          } lg:ml-64`}>
            <div className="p-6">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route 
                    path="/dashboard" 
                    element={<Dashboard userProfile={userProfile} />} 
                  />
                  <Route 
                    path="/opportunity-radar" 
                    element={<OpportunityRadar userProfile={userProfile} />} 
                  />
                  <Route 
                    path="/value-curve" 
                    element={<ValueCurveDesigner />} 
                  />
                  <Route 
                    path="/niche-diver" 
                    element={<NicheDeepDiver userProfile={userProfile} />} 
                  />
                  <Route 
                    path="/concept-forge" 
                    element={<ConceptForge userProfile={userProfile} />} 
                  />
                  <Route 
                    path="/validation-lab" 
                    element={<ValidationLab />} 
                  />
                  <Route 
                    path="/build-readiness" 
                    element={<BuildReadiness userProfile={userProfile} />} 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <UserProfile 
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                      />
                    } 
                  />
                </Routes>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;