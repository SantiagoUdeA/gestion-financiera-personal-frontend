'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthResponse } from '@/types/auth';

interface AuthContextType {
  user: AuthResponse | null;
  token: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const data: AuthResponse = JSON.parse(stored);
      setUser(data);
      setToken(data.token);
    }
  }, []);

  const login = (data: AuthResponse) => {
    localStorage.setItem('auth', JSON.stringify(data));
    localStorage.setItem('token', data.token);
    setUser(data);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
