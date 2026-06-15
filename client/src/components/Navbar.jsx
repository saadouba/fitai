import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const bgColor = isDark ? 'bg-[#0a0a0a] border-gray-800' : 'bg-[#faf8f3] border-amber-200/50';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const buttonBg = isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-amber-300';
  const signUpBg = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-700 hover:bg-amber-800';

  return (
    <nav className={`${bgColor} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className={isDark ? 'text-blue-500' : 'text-amber-700'} size={28} />
          <span className={`text-2xl font-bold ${textColor}`}>FitAI</span>
        </Link>

        <div className="flex items-center gap-4">
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

          <button
            onClick={toggleTheme}
            className={`p-2 rounded transition ${isDark ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
