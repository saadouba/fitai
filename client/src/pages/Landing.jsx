import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Zap, Target } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Landing = () => {
  const { isDark } = useContext(ThemeContext);

  const bgGradient = isDark
    ? 'from-blue-900/20 to-[#0a0a0a]'
    : 'from-amber-100/30 to-[#faf8f3]';
  const cardBg = isDark ? 'glass-card' : 'bg-white/60 backdrop-blur-sm border border-amber-200/50';
  const textMuted = isDark ? 'text-gray-400' : 'text-amber-900/70';
  const textHeading = isDark ? 'text-white' : 'text-gray-900';
  const buttonPrimary = isDark
    ? 'bg-blue-600 hover:bg-blue-700'
    : 'bg-amber-700 hover:bg-amber-800';
  const buttonSecondary = isDark
    ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
    : 'bg-white hover:bg-amber-50 border-amber-300';
  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f3]';

  return (
    <div className={`flex flex-col min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Hero Section */}
      <header className={`flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-b ${bgGradient} transition-colors duration-300`}>
        <div className="flex items-center gap-2 mb-6">
          <Dumbbell className={isDark ? 'text-blue-500' : 'text-amber-700'} size={48} />
          <h1 className={`text-5xl font-bold tracking-tighter ${textHeading}`}>FitAI</h1>
        </div>
        <p className={`text-2xl ${textMuted} mb-8 max-w-2xl`}>
          Your AI-Powered Personal Trainer
        </p>
        <div className="flex gap-4">
          <Link to="/generate" className={`${buttonPrimary} text-white font-bold py-3 px-8 rounded transition duration-200`}>
            Get Started
          </Link>
          <Link to="/auth" className={`${buttonSecondary} border font-bold py-3 px-8 rounded transition duration-200`}>
            Login
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className={`py-20 px-6 max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-12 transition-colors duration-300`}>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg transition-colors duration-300`}>
          <Zap className={isDark ? 'text-yellow-500' : 'text-amber-600'} size={48} className="mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>AI Plans</h3>
          <p className={textMuted}>Generate structured workout plans in seconds using state-of-the-art AI.</p>
        </div>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg transition-colors duration-300`}>
          <Target className={isDark ? 'text-red-500' : 'text-red-600'} size={48} className="mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>Track Progress</h3>
          <p className={textMuted}>Keep all your workout plans in one place and stay consistent.</p>
        </div>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg transition-colors duration-300`}>
          <Dumbbell className={isDark ? 'text-green-500' : 'text-green-700'} size={48} className="mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>Personalized</h3>
          <p className={textMuted}>Plans tailored specifically to your fitness level and available equipment.</p>
        </div>
      </section>

      <footer className={`mt-auto py-8 text-center ${textMuted} border-t ${isDark ? 'border-gray-800' : 'border-amber-200/50'} transition-colors duration-300`}>
        <p>© 2026 FitAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
