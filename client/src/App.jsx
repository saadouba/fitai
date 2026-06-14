import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import GeneratePlan from './pages/GeneratePlan';

function AppContent() {
  const { isDark } = useContext(ThemeContext);

  const bgColor = isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#f5f1ed] text-gray-900';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<GeneratePlan />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
