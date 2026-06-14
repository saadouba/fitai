import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  const loginAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem('fitai_guest_mode', 'true');
  };

  const logout = async () => {
    if (!isGuest) {
      await supabase.auth.signOut();
    }
    setIsGuest(false);
    localStorage.removeItem('fitai_guest_mode');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, loading, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
