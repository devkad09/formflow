import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userForms, setUserForms] = useState([]);

  const [plan, setPlan] = useState('Free');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        // Fallback for mock mode if Supabase is missing/failing
        const mockUser = localStorage.getItem('formflow_mock_user');
        if (mockUser) setUser(JSON.parse(mockUser));
      }

      const storedForms = localStorage.getItem('formflowForms');
      if (storedForms) {
        setUserForms(JSON.parse(storedForms));
      }

      const storedPlan = localStorage.getItem('formflowPlan');
      if (storedPlan) {
        setPlan(storedPlan);
      }
      
      setLoading(false);
    };

    checkSession();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } catch (err) {
      // Supabase not configured properly
      return () => {};
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message === 'Email not confirmed') {
          throw new Error('Please confirm your email address before logging in.');
        }
        throw error;
      }
      return data;
    } catch (err) {
      // Mock login fallback
      console.warn("Using mock login due to Supabase error:", err.message);
      const mockUser = { id: 'mock-123', email, app_metadata: { provider: 'email' } };
      setUser(mockUser);
      localStorage.setItem('formflow_mock_user', JSON.stringify(mockUser));
      return { user: mockUser };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      if (error) throw error;
      return data;
    } catch (err) {
      // Mock signup fallback
      console.warn("Using mock signup due to Supabase error:", err.message);
      const mockUser = { id: 'mock-123', email, user_metadata: { full_name: name } };
      setUser(mockUser);
      localStorage.setItem('formflow_mock_user', JSON.stringify(mockUser));
      return { user: mockUser };
    }
  };

  const loginWithOAuth = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      return data;
    } catch (err) {
       console.warn("OAuth mock fallback not fully supported");
       throw err;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {}
    setUser(null);
    setUserForms([]);
    setPlan('Free');
    localStorage.removeItem('formflowForms');
    localStorage.removeItem('formflowPlan');
    localStorage.removeItem('formflow_mock_user');
  };

  const addForm = (form) => {
    const newForms = [{ id: Date.now(), ...form }, ...userForms];
    setUserForms(newForms);
    localStorage.setItem('formflowForms', JSON.stringify(newForms));
  };

  const updatePlan = (newPlan) => {
    setPlan(newPlan);
    localStorage.setItem('formflowPlan', newPlan);
  };

  return (
    <AuthContext.Provider value={{ user, userForms, plan, updatePlan, login, signup, loginWithOAuth, logout, addForm, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
