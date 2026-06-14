import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import axios from 'axios';
import { LogOut, Plus, Dumbbell, Calendar } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f1ed]';
  const cardBg = isDark ? 'glass-card' : 'bg-white/80 backdrop-blur-sm border border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';
  const buttonBg = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700';

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      } else {
        setUser(user);
        fetchPlans(user.id);
      }
    };
    checkUser();
  }, [navigate]);

  const fetchPlans = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/plans?userId=${userId}`);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return (
    <div className={`flex items-center justify-center min-h-screen ${bgColor} transition-colors duration-300`}>
      <p className={textColor}>Loading...</p>
    </div>
  );

  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 ${bgColor} transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className={`text-3xl font-bold ${textColor}`}>Welcome, {user?.email?.split('@')[0]}!</h1>
          <p className={textMuted}>Ready for your next workout?</p>
        </div>
        <div className="flex gap-4">
          <Link to="/generate" className={`${buttonBg} text-white flex items-center gap-2 px-6 py-2 rounded transition duration-200`}>
            <Plus size={20} /> Generate New Plan
          </Link>
          <button onClick={handleLogout} className={`${isDark ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-300'} border text-white flex items-center gap-2 px-6 py-2 rounded transition duration-200`}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>Your Saved Plans</h2>

      {plans.length === 0 ? (
        <div className={`${cardBg} p-12 text-center rounded-lg transition-colors duration-300`}>
          <Dumbbell className={`w-16 h-16 ${isDark ? 'text-gray-700' : 'text-gray-400'} mx-auto mb-4`} />
          <p className={`${textMuted} text-lg mb-6`}>You haven't generated any plans yet.</p>
          <Link to="/generate" className={`${isDark ? 'text-blue-500' : 'text-teal-600'} hover:underline`}>
            Create your first AI workout plan →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={`${cardBg} p-6 flex flex-col rounded-lg transition-colors duration-300`}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className={isDark ? 'text-blue-500' : 'text-teal-600'} size={20} />
                <h3 className={`text-xl font-bold truncate ${textColor}`}>{plan.plan_name}</h3>
              </div>
              <p className={`${textMuted} text-sm mb-4 line-clamp-3`}>
                {plan.plan_content}
              </p>
              <div className={`mt-auto pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center transition-colors duration-300`}>
                <span className={`text-xs ${textMuted}`}>
                  {new Date(plan.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => alert('Plan details coming soon!')}
                  className={`${isDark ? 'text-blue-500' : 'text-teal-600'} text-sm font-medium hover:underline`}
                >
                  View Full Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
