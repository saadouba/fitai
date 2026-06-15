import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import axios from 'axios';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const GeneratePlan = () => {
  const [formData, setFormData] = useState({
    goal: 'build muscle',
    fitnessLevel: 'beginner',
    daysPerWeek: '3',
    equipment: 'full gym'
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f3]';
  const cardBg = isDark ? 'glass-card' : 'bg-white/60 backdrop-blur-sm border border-amber-200/50';
  const inputBg = isDark ? 'bg-gray-900 border-gray-700' : 'bg-amber-50 border-amber-300';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-amber-900/70';
  const buttonBg = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-700 hover:bg-amber-800';

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const savedProfile = localStorage.getItem('fitai_profile');
      if (savedProfile) {
        setFormData(JSON.parse(savedProfile));
      }
    };
    checkUser();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/generate-plan`, {
        ...formData,
        userId: user?.id || 'guest'
      });
      setPlan(response.data.planContent);
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!plan || !user) {
      alert('You must be logged in to save plans. Please sign up!');
      navigate('/auth');
      return;
    }
    try {
      const planName = `${formData.goal.charAt(0).toUpperCase() + formData.goal.slice(1)} Plan - ${new Date().toLocaleDateString()}`;
      await axios.post(`${API_URL}/api/save-plan`, {
        userId: user.id,
        planContent: plan,
        planName: planName
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save plan.');
    }
  };

  return (
    <div className={`max-w-4xl mx-auto px-6 py-12 ${bgColor} transition-colors duration-300 min-h-screen`}>
      <button
        onClick={() => navigate('/')}
        className={`flex items-center gap-2 ${textMuted} hover:${textColor} mb-8 transition`}
      >
        <ChevronLeft size={20} /> Back to Home
      </button>

      <h1 className={`text-3xl font-bold mb-8 ${textColor}`}>Generate Workout Plan</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <form onSubmit={handleGenerate} className={`${cardBg} p-6 flex flex-col gap-4 rounded-lg transition-colors duration-300`}>
            <div>
              <label className={`block text-xs ${textMuted} uppercase tracking-wider mb-1`}>Goal</label>
              <select
                className={`${inputBg} border text-white rounded p-2 w-full text-sm focus:outline-none focus:border-blue-500 transition`}
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              >
                <option value="lose weight">Lose Weight</option>
                <option value="build muscle">Build Muscle</option>
                <option value="improve endurance">Improve Endurance</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs ${textMuted} uppercase tracking-wider mb-1`}>Level</label>
              <select
                className={`${inputBg} border text-white rounded p-2 w-full text-sm focus:outline-none focus:border-blue-500 transition`}
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs ${textMuted} uppercase tracking-wider mb-1`}>Days/Week</label>
              <input
                type="number"
                min="1"
                max="7"
                className={`${inputBg} border text-white rounded p-2 w-full text-sm focus:outline-none focus:border-blue-500 transition`}
                value={formData.daysPerWeek}
                onChange={(e) => setFormData({ ...formData, daysPerWeek: e.target.value })}
              />
            </div>
            <div>
              <label className={`block text-xs ${textMuted} uppercase tracking-wider mb-1`}>Equipment</label>
              <select
                className={`${inputBg} border text-white rounded p-2 w-full text-sm focus:outline-none focus:border-blue-500 transition`}
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              >
                <option value="none">None</option>
                <option value="dumbbells">Dumbbells</option>
                <option value="full gym">Full Gym</option>
              </select>
            </div>
            <button
              type="submit"
              className={`${buttonBg} text-white mt-2 flex items-center justify-center gap-2 py-2 rounded transition duration-200`}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Generate'}
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          {plan ? (
            <div className={`${cardBg} p-8 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors duration-300`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${textColor}`}>Your Custom Plan</h2>
                <button
                  onClick={handleSave}
                  className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition`}
                >
                  <Save size={18} /> Save Plan
                </button>
              </div>
              <div className={`prose prose-invert max-w-none whitespace-pre-wrap ${textMuted} leading-relaxed`}>
                {plan}
              </div>
            </div>
          ) : (
            <div className={`${cardBg} p-12 border-dashed border-2 ${isDark ? 'border-gray-800' : 'border-amber-300/50'} flex flex-col items-center justify-center text-center h-full rounded-lg transition-colors duration-300`}>
              <div className={`w-16 h-16 ${isDark ? 'bg-gray-900' : 'bg-amber-100'} rounded-full flex items-center justify-center mb-4`}>
                <Loader2 className={loading ? "animate-spin text-blue-500" : `${isDark ? 'text-gray-700' : 'text-amber-300'}`} size={32} />
              </div>
              <p className={textMuted}>
                {loading ? "Our AI is crafting your perfect workout plan..." : "Fill out the form and click generate to see your custom workout plan here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePlan;
