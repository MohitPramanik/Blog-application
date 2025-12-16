import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user:', err);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call - replace with actual API endpoint
      const mockUsers: { [key: string]: User } = {
        'user@example.com': {
          id: '1',
          username: 'John Doe',
          email: 'user@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (mockUsers[email] && password === 'password') {
        const userData = mockUsers[email];
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'mock-token-' + userData.id);
      } else {
        setError('Invalid credentials');
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Mock API call - replace with actual API endpoint
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newUser: User = {
        id: String(Math.random()),
        username,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'mock-token-' + newUser.id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Merge and persist locally (mocking an API)
      const updated = { ...(user || {}), ...data } as User;
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      // simulate api delay
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    updateProfile,
    logout,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
