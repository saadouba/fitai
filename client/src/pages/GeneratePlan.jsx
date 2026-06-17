import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import axios from 'axios';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
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
  const inputBg = isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-amber-50 border-amber-300 text-gray-900';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-amber-900/70';
  const buttonBg = isDark ? 'bg-blue-600 hover:bg-blue-700 active:scale-95' : 'bg-amber-700 hover:bg-amber-800 active:scale-95';
  const selectBg = isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-amber-50 border-amber-300 text-gray-900';

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

  const markdownStyles = `
    prose prose-invert max-w-none
    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:${isDark ? 'text-blue-400' : 'text-amber-700'}
    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:${isDark ? 'text-blue-300' : 'text-amber-600'}
    [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:${isDark ? 'text-blue-200' : 'text-amber-500'}
    [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:${textMuted}
    [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-3 [&_ul]:${textMuted}
    [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-3 [&_ol]:${textMuted}
    [&_li]:mb-2 [&_li]:${textMuted}
    [&_strong]:font-bold [&_strong]:${isDark ? 'text-blue-300' : 'text-amber-600'}
    [&_em]:italic [&_em]:${isDark ? 'text-blue-200' : 'text-amber-500'}
    [&_code]:${isDark ? 'bg-gray-800 text-yellow-300' : 'bg-amber-100 text-amber-900'} [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm
  `;

  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 ${bgColor} transition-colors duration-300 min-h-screen`}>
      <button
        onClick={() => navigate('/')}
        className={`flex items-center gap-2 ${textMuted} hover:${textColor} mb-8 transition-all duration-200 transform hover:scale-105 active:scale-95`}
      >
        <ChevronLeft size={20} /> Back to Home
      </button>

      <h1 className={`text-4xl font-bold mb-8 ${textColor} transition-colors duration-300`}>Generate Your Workout Plan</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-1">
          <form onSubmit={handleGenerate} className={`${cardBg} p-8 flex flex-col gap-6 rounded-lg transition-all duration-300 sticky top-24`}>
            <div>
              <label className={`block text-sm font-semibold ${textMuted} uppercase tracking-wider mb-2 transition-colors duration-300`}>Fitness Goal</label>
              <select
                className={`${selectBg} border rounded p-3 w-full text-sm focus:outline-none focus:border-blue-500 transition-all duration-200 hover:border-blue-400`}
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              >
                <option value="lose weight">Lose Weight</option>
                <option value="build muscle">Build Muscle</option>
                <option value="improve endurance">Improve Endurance</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${textMuted} uppercase tracking-wider mb-2 transition-colors duration-300`}>Fitness Level</label>
              <select
                className={`${selectBg} border rounded p-3 w-full text-sm focus:outline-none focus:border-blue-500 transition-all duration-200 hover:border-blue-400`}
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${textMuted} uppercase tracking-wider mb-2 transition-colors duration-300`}>Days Per Week</label>
              <input
                type="number"
                min="1"
                max="7"
                className={`${inputBg} border rounded p-3 w-full text-sm focus:outline-none focus:border-blue-500 transition-all duration-200 hover:border-blue-400`}
                value={formData.daysPerWeek}
                onChange={(e) => setFormData({ ...formData, daysPerWeek: e.target.value })}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${textMuted} uppercase tracking-wider mb-2 transition-colors duration-300`}>Available Equipment</label>
              <select
                className={`${selectBg} border rounded p-3 w-full text-sm focus:outline-none focus:border-blue-500 transition-all duration-200 hover:border-blue-400`}
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              >
                <option value="none">None (Bodyweight)</option>
                <option value="dumbbells">Dumbbells Only</option>
                <option value="full gym">Full Gym</option>
              </select>
            </div>

            <button
              type="submit"
              className={`${buttonBg} text-white mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded font-semibold transition-all duration-200 transform hover:shadow-lg ${isDark ? 'hover:shadow-blue-500/50' : 'hover:shadow-amber-700/50'}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                'Generate Plan'
              )}
            </button>
          </form>
        </div>

        {/* Plan Display Section */}
        <div className="md:col-span-2">
          {plan ? (
            <div className={`${cardBg} p-8 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all duration-300`}>
              <div className="flex justify-between items-center mb-8 pb-6 border-b" style={{borderColor: isDark ? '#374151' : '#fcd34d'}}>
                <h2 className={`text-2xl font-bold ${textColor} transition-colors duration-300`}>Your Custom Workout Plan</h2>
                <button
                  onClick={handleSave}
                  className={`bg-green-600 hover:bg-green-700 active:scale-95 text-white px-6 py-2 rounded flex items-center gap-2 transition-all duration-200 transform hover:shadow-lg hover:shadow-green-600/50`}
                >
                  <Save size={20} /> Save Plan
                </button>
              </div>
              <div className={`${markdownStyles} overflow-y-auto max-h-[600px] pr-4`}>
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className={`text-3xl font-bold mb-4 mt-6 ${isDark ? 'text-blue-400' : 'text-amber-700'}`} {...props} />,
                    h2: ({node, ...props}) => <h2 className={`text-2xl font-bold mb-3 mt-5 ${isDark ? 'text-blue-300' : 'text-amber-600'}`} {...props} />,
                    h3: ({node, ...props}) => <h3 className={`text-xl font-bold mb-2 mt-4 ${isDark ? 'text-blue-200' : 'text-amber-500'}`} {...props} />,
                    p: ({node, ...props}) => <p className={`mb-3 leading-relaxed ${textMuted}`} {...props} />,
                    ul: ({node, ...props}) => <ul className={`list-disc list-inside mb-3 ${textMuted}`} {...props} />,
                    ol: ({node, ...props}) => <ol className={`list-decimal list-inside mb-3 ${textMuted}`} {...props} />,
                    li: ({node, ...props}) => <li className={`mb-2 ${textMuted}`} {...props} />,
                    strong: ({node, ...props}) => <strong className={`font-bold ${isDark ? 'text-blue-300' : 'text-amber-600'}`} {...props} />,
                    em: ({node, ...props}) => <em className={`italic ${isDark ? 'text-blue-200' : 'text-amber-500'}`} {...props} />,
                    code: ({node, ...props}) => <code className={`${isDark ? 'bg-gray-800 text-yellow-300' : 'bg-amber-100 text-amber-900'} px-2 py-1 rounded text-sm`} {...props} />,
                  }}
                >
                  {plan}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className={`${cardBg} p-12 border-2 border-dashed ${isDark ? 'border-gray-800' : 'border-amber-300/50'} flex flex-col items-center justify-center text-center h-full rounded-lg transition-all duration-300 min-h-[400px]`}>
              <div className={`w-20 h-20 ${isDark ? 'bg-gray-900' : 'bg-amber-100'} rounded-full flex items-center justify-center mb-6`}>
                <Loader2 className={loading ? "animate-spin text-blue-500" : `${isDark ? 'text-gray-700' : 'text-amber-300'}`} size={40} />
              </div>
              <p className={`${textMuted} text-lg mb-2 transition-colors duration-300`}>
                {loading ? "Our AI is crafting your perfect workout plan..." : "Fill out the form and click generate to see your custom workout plan here."}
              </p>
              <p className={`${textMuted} text-sm transition-colors duration-300`}>
                {!loading && "Your plan will include exercises, sets, reps, and rest periods tailored to your needs."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePlan;
