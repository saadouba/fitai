import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const bgColor = isDark ? 'bg-[#0a0a0a] border-gray-800' : 'bg-[#faf8f3] border-amber-200/50';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const buttonBg = isDark ? 'bg-gray-900 text-white border-gray-700 hover:bg-gray-800' : 'bg-white text-gray-900 border-amber-300 hover:bg-amber-50';
  const signUpBg = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-700 hover:bg-amber-800';

  return (
    <nav className={`${bgColor} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 transform hover:scale-105 active:scale-95"
        >
          <Dumbbell className={`${isDark ? 'text-blue-500' : 'text-amber-700'} transition-colors duration-300 hover:scale-110`} size={28} />
          <span className={`text-2xl font-bold ${textColor} transition-colors duration-300`}>FitAI</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/auth"
            className={`${buttonBg} border px-4 py-2 rounded transition-all duration-200 transform hover:shadow-md active:scale-95`}
          >
            Login
          </Link>
          <Link
            to="/auth"
            className={`${signUpBg} text-white px-6 py-2 rounded font-medium transition-all duration-200 transform hover:shadow-lg active:scale-95`}
          >
            Sign Up
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded transition-all duration-300 transform hover:scale-110 active:scale-95 ${isDark ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800 hover:shadow-lg hover:shadow-yellow-400/30' : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-400/30'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
