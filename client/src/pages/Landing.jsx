import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Zap, Target, ArrowRight } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Landing = () => {
  const { isDark } = useContext(ThemeContext);

  const bgGradient = isDark
    ? 'from-blue-900/20 to-[#0a0a0a]'
    : 'from-teal-100/40 to-[#f5f1ed]';
  const cardBg = isDark ? 'glass-card' : 'bg-white/80 backdrop-blur-sm border border-gray-200';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';
  const textHeading = isDark ? 'text-white' : 'text-gray-900';
  const buttonPrimary = isDark
    ? 'bg-blue-600 hover:bg-blue-700'
    : 'bg-teal-600 hover:bg-teal-700';
  const buttonSecondary = isDark
    ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
    : 'bg-white hover:bg-gray-50 border-gray-300';
  const sampleCardBg = isDark
    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700'
    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200';

  const samplePlan = [
    {
      day: 'Day 1',
      title: 'Upper Body Power',
      exercises: [
        { name: 'Bench Press', sets: '3x8' },
        { name: 'Pull-Ups', sets: '3x10' },
        { name: 'Overhead Press', sets: '3x8' },
        { name: 'Barbell Row', sets: '3x10' },
        { name: 'Triceps Dips', sets: '3x12' },
        { name: 'Bicep Curls', sets: '3x12' },
      ],
    },
    {
      day: 'Day 2',
      title: 'Lower Body Strength',
      exercises: [
        { name: 'Back Squat', sets: '4x6' },
        { name: 'Romanian Deadlift', sets: '3x8' },
        { name: 'Walking Lunges', sets: '3x12' },
        { name: 'Leg Press', sets: '3x10' },
        { name: 'Leg Curls', sets: '3x12' },
        { name: 'Calf Raises', sets: '4x15' },
      ],
    },
    {
      day: 'Day 3',
      title: 'Push Focus',
      exercises: [
        { name: 'Incline Bench Press', sets: '3x8' },
        { name: 'Dumbbell Shoulder Press', sets: '3x10' },
        { name: 'Chest Fly', sets: '3x12' },
        { name: 'Lateral Raises', sets: '3x15' },
        { name: 'Triceps Pushdowns', sets: '3x12' },
        { name: 'Cable Crossover', sets: '3x15' },
      ],
    },
    {
      day: 'Day 4',
      title: 'Pull Focus',
      exercises: [
        { name: 'Deadlifts', sets: '4x5' },
        { name: 'Pull-Ups', sets: '3x8' },
        { name: 'Seated Row', sets: '3x10' },
        { name: 'Face Pulls', sets: '3x15' },
        { name: 'Hammer Curls', sets: '3x12' },
        { name: 'Lat Pulldown', sets: '3x10' },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className={`flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-b ${bgGradient} transition-colors duration-300`}>
        <div className="mb-6 inline-block">
          <span className={`text-sm font-semibold tracking-widest uppercase ${isDark ? 'text-blue-400' : 'text-teal-600'}`}>
            AI Coaching That Adapts to You
          </span>
        </div>
        <h1 className={`text-5xl md:text-6xl font-bold tracking-tighter mb-6 ${textHeading}`}>
          Your AI-Powered Personal Trainer
        </h1>
        <p className={`text-lg md:text-xl ${textMuted} mb-10 max-w-2xl`}>
          Get personalized workout plans, real-time form feedback, and intelligent insights to help you train smarter and achieve your goals faster.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/generate" className={`${buttonPrimary} text-white font-bold py-3 px-8 rounded transition duration-200 flex items-center gap-2`}>
            Start Your Free Plan <ArrowRight size={20} />
          </Link>
          <button className={`${buttonSecondary} border font-bold py-3 px-8 rounded transition duration-200`}>
            See How It Works
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className={`py-20 px-6 max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-12 transition-colors duration-300`}>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg`}>
          <Zap className={isDark ? 'text-yellow-500' : 'text-yellow-600'} size={48} className="mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>Personalized Plans</h3>
          <p className={textMuted}>Built for your goals, fitness level, and time.</p>
        </div>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg`}>
          <Target className={isDark ? 'text-red-500' : 'text-red-600'} size={48} className="mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>Adaptive Coaching</h3>
          <p className={textMuted}>AI adjusts your plan as you progress and recover.</p>
        </div>
        <div className={`${cardBg} p-8 flex flex-col items-center text-center rounded-lg`}>
          <Dumbbell className={isDark ? 'text-green-500' : 'text-green-600'} size={48} className="mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>Stay Consistent</h3>
          <p className={textMuted}>Smart reminders and insights keep you on track.</p>
        </div>
      </section>

      {/* Sample AI Plan Section */}
      <section className={`py-20 px-6 max-w-7xl mx-auto w-full transition-colors duration-300`}>
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-2 ${textHeading}`}>Sample AI Plan</h2>
          <p className={`text-lg ${textMuted}`}>Here's a preview of a personalized 4-day workout plan generated by FitAI.</p>
        </div>

        <div className={`${sampleCardBg} border rounded-lg p-8 transition-colors duration-300`}>
          <div className="grid md:grid-cols-4 gap-6">
            {samplePlan.map((day, idx) => (
              <div key={idx} className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'} rounded-lg p-6 transition-colors duration-300`}>
                <div className={`text-sm font-bold ${isDark ? 'text-blue-400' : 'text-teal-600'} mb-2`}>
                  {day.day}
                </div>
                <h4 className={`text-lg font-bold mb-4 ${textHeading}`}>{day.title}</h4>
                <div className="space-y-3">
                  {day.exercises.map((ex, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <span className={`text-sm ${textMuted}`}>{ex.name}</span>
                      <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-teal-600'}`}>
                        {ex.sets}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-8 p-4 rounded ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-teal-50 border-teal-200'} border`}>
            <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-teal-700'}`}>
              ✨ Plans adapt based on your progress, recovery, and goals.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/generate" className={`${buttonPrimary} text-white font-bold py-3 px-8 rounded transition duration-200 inline-flex items-center gap-2`}>
            Generate My Plan <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <footer className={`mt-auto py-8 text-center ${textMuted} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-300`}>
        <p>© 2026 FitAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
