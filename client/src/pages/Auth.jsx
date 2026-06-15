import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Dumbbell } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f3]';
  const cardBg = isDark ? 'glass-card' : 'bg-white/60 backdrop-blur-sm border border-amber-200/50';
  const inputBg = isDark ? 'bg-gray-900 border-gray-700' : 'bg-amber-50 border-amber-300';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-amber-900/70';
  const buttonBg = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-700 hover:bg-amber-800';

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for confirmation link!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 ${bgColor} transition-colors duration-300`}>
      <div className={`${cardBg} p-8 w-full max-w-md rounded-lg transition-colors duration-300`}>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Dumbbell className={isDark ? 'text-blue-500' : 'text-amber-700'} size={32} />
          <h2 className={`text-3xl font-bold ${textColor}`}>FitAI</h2>
        </div>

        <h3 className={`text-xl font-semibold mb-6 text-center ${textColor}`}>
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h3>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div>
            <label className={`block text-sm ${textMuted} mb-1`}>Email</label>
            <input
              type="email"
              className={`${inputBg} border text-white rounded p-2 w-full focus:outline-none focus:border-blue-500 transition`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-sm ${textMuted} mb-1`}>Password</label>
            <input
              type="password"
              className={`${inputBg} border text-white rounded p-2 w-full focus:outline-none focus:border-blue-500 transition`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className={`${buttonBg} text-white font-bold py-2 px-4 rounded mt-2 transition duration-200`} disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className={`mt-6 text-center ${textMuted}`}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={`${isDark ? 'text-blue-500' : 'text-amber-700'} hover:underline font-medium`}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
