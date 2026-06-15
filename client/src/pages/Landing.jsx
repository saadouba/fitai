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
    ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
    : 'bg-amber-700 hover:bg-amber-800 active:scale-95';
  const buttonSecondary = isDark
    ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 active:scale-95'
    : 'bg-white hover:bg-amber-50 border-amber-300 active:scale-95';
  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f3]';

  return (
    <div className={`flex flex-col min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Hero Section */}
      <header className={`flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-b ${bgGradient} transition-colors duration-300`}>
        <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <Dumbbell className={`${isDark ? 'text-blue-500' : 'text-amber-700'} transition-colors duration-300 hover:scale-110 transform`} size={48} />
          <h1 className={`text-5xl font-bold tracking-tighter ${textHeading} transition-colors duration-300`}>FitAI</h1>
        </div>
        <p className={`text-2xl ${textMuted} mb-8 max-w-2xl transition-colors duration-300 animate-in fade-in slide-in-from-top-4 duration-700 delay-100`}>
          Your AI-Powered Personal Trainer
        </p>
        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <Link 
            to="/generate" 
            className={`${buttonPrimary} text-white font-bold py-3 px-8 rounded transition duration-200 transform hover:shadow-lg hover:shadow-blue-500/50 ${isDark ? '' : 'hover:shadow-amber-700/50'} active:shadow-none`}
          >
            Get Started
          </Link>
          <Link 
            to="/auth" 
            className={`${buttonSecondary} border font-bold py-3 px-8 rounded transition duration-200 transform hover:shadow-lg ${isDark ? 'hover:shadow-gray-700/50' : 'hover:shadow-amber-200/50'} active:shadow-none`}
          >
            Login
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className={`py-20 px-6 max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-12 transition-colors duration-300`}>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isDark ? 'hover:shadow-blue-500/20' : 'hover:shadow-amber-200/50'} cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700`}>
          <Zap className={`${isDark ? 'text-yellow-500' : 'text-amber-600'} mb-4 transition-all duration-300 transform group-hover:scale-110 hover:scale-110`} size={48} />
          <h3 className={`text-xl font-bold mb-2 ${textHeading} transition-colors duration-300`}>AI Plans</h3>
          <p className={`${textMuted} transition-colors duration-300`}>Generate structured workout plans in seconds using state-of-the-art AI.</p>
        </div>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isDark ? 'hover:shadow-red-500/20' : 'hover:shadow-red-200/50'} cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100`}>
          <Target className={`${isDark ? 'text-red-500' : 'text-red-600'} mb-4 transition-all duration-300 transform hover:scale-110`} size={48} />
          <h3 className={`text-xl font-bold mb-2 ${textHeading} transition-colors duration-300`}>Track Progress</h3>
          <p className={`${textMuted} transition-colors duration-300`}>Keep all your workout plans in one place and stay consistent.</p>
        </div>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isDark ? 'hover:shadow-green-500/20' : 'hover:shadow-green-200/50'} cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200`}>
          <Dumbbell className={`${isDark ? 'text-green-500' : 'text-green-700'} mb-4 transition-all duration-300 transform hover:scale-110`} size={48} />
          <h3 className={`text-xl font-bold mb-2 ${textHeading} transition-colors duration-300`}>Personalized</h3>
          <p className={`${textMuted} transition-colors duration-300`}>Plans tailored specifically to your fitness level and available equipment.</p>
        </div>
      </section>

      <footer className={`mt-auto py-8 text-center ${textMuted} border-t ${isDark ? 'border-gray-800' : 'border-amber-200/50'} transition-colors duration-300`}>
        <p>© 2026 FitAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
