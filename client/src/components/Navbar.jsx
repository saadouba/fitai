import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { user, isGuest, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleContinueAsGuest = () => {
    const { loginAsGuest } = useContext(AuthContext);
    loginAsGuest();
    navigate('/generate');
  };

  const bgColor = isDark ? 'bg-[#0a0a0a] border-gray-800' : 'bg-[#f5f1ed] border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const buttonBg = isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300';
  const signUpBg = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700';

  return (
    <nav className={`${bgColor} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className={isDark ? 'text-blue-500' : 'text-teal-600'} size={28} />
          <span className={`text-2xl font-bold ${textColor}`}>FitAI</span>
        </Link>

        <div className="flex items-center gap-4">
          {user || isGuest ? (
            <>
              <Link to="/dashboard" className={`${textColor} hover:opacity-75 transition`}>
                Dashboard
              </Link>
              <button
                onClick={logout}
                className={`${buttonBg} border px-4 py-2 rounded transition`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleContinueAsGuest}
                className={`${buttonBg} border px-4 py-2 rounded transition`}
              >
                Continue as Guest
              </button>
              <Link
                to="/auth"
                className={`${buttonBg} border px-4 py-2 rounded transition`}
              >
                Login
              </Link>
              <Link
                to="/auth"
                className={`${signUpBg} text-white px-6 py-2 rounded font-medium transition`}
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className={`p-2 rounded transition ${isDark ? 'bg-gray-900 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
