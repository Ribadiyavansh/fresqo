import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Admin, AdminRole } from '@/admin/types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: Admin | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRole: AdminRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Admin | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would be an API call
    if (email === 'admin@fresqo.com' && password === 'admin123') {
      const mockUser: Admin = {
        id: 'A1',
        name: 'Super Admin',
        email: 'admin@fresqo.com',
        role: 'SUPER_ADMIN',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastLogin: new Date().toISOString(),
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    } else if (email === 'ops@fresqo.com' && password === 'ops') {
      const mockUser: Admin = {
        id: 'A2',
        name: 'Operations Manager',
        email: 'ops@fresqo.com',
        role: 'OPERATIONS_ADMIN',
        isActive: true,
        createdAt: '2024-01-05T00:00:00Z',
        lastLogin: new Date().toISOString(),
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const hasPermission = useCallback((requiredRole: AdminRole): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    return user.role === requiredRole;
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
