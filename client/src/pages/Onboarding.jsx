import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    goal: 'build muscle',
    fitnessLevel: 'beginner',
    daysPerWeek: '3',
    equipment: 'full gym'
  });
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f1ed]';
  const cardBg = isDark ? 'glass-card' : 'bg-white/80 backdrop-blur-sm border border-gray-200';
  const inputBg = isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';
  const buttonBg = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700';

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('fitai_profile', JSON.stringify(formData));
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 ${bgColor} transition-colors duration-300`}>
      <div className={`${cardBg} p-8 w-full max-w-lg rounded-lg transition-colors duration-300`}>
        <h2 className={`text-3xl font-bold mb-2 ${textColor}`}>Welcome to FitAI</h2>
        <p className={`${textMuted} mb-8`}>Let's personalize your fitness journey.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className={`block text-sm ${textMuted} mb-2`}>Fitness Goal</label>
            <select
              name="goal"
              className={`${inputBg} border text-white rounded p-2 w-full focus:outline-none focus:border-blue-500 transition`}
              value={formData.goal}
              onChange={handleChange}
            >
              <option value="lose weight">Lose Weight</option>
              <option value="build muscle">Build Muscle</option>
              <option value="improve endurance">Improve Endurance</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm ${textMuted} mb-2`}>Fitness Level</label>
            <select
              name="fitnessLevel"
              className={`${inputBg} border text-white rounded p-2 w-full focus:outline-none focus:border-blue-500 transition`}
              value={formData.fitnessLevel}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm ${textMuted} mb-2`}>Days Per Week</label>
            <input
              type="number"
              name="daysPerWeek"
              min="1"
              max="7"
              className={`${inputBg} border text-white rounded p-2 w-full focus:outline-none focus:border-blue-500 transition`}
              value={formData.daysPerWeek}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={`block text-sm ${textMuted} mb-2`}>Available Equipment</label>
            <select
              name="equipment"
              className={`${inputBg} border text-white rounded p-2 w-full focus:outline-none focus:border-blue-500 transition`}
              value={formData.equipment}
              onChange={handleChange}
            >
              <option value="none">None (Bodyweight)</option>
              <option value="dumbbells">Dumbbells Only</option>
              <option value="full gym">Full Gym</option>
            </select>
          </div>

          <button type="submit" className={`${buttonBg} text-white font-bold py-3 px-4 rounded mt-2 transition duration-200`}>
            Save Profile & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
