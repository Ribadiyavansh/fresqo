import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/admin/contexts/AuthContext';
import Sidebar from '@/admin/components/Sidebar';
import Header from '@/admin/components/Header';
import Login from '@/admin/pages/Login';
import Dashboard from '@/admin/pages/Dashboard';
import Orders from '@/admin/pages/Orders';
import Products from '@/admin/pages/Products';
import Customers from '@/admin/pages/Customers';
import Analytics from '@/admin/pages/Analytics';
import AdminManagement from '@/admin/pages/AdminManagement';
import Settings from '@/admin/pages/Settings';
import './App.css';
import type { AdminRole } from '@/admin/types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: AdminRole }> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

// Main Layout Component
const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex bg-fresqo-offwhite">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block relative z-20">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Sidebar - Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
            <Sidebar isCollapsed={false} onToggle={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 flex flex-col min-w-0 bg-gray-50`}
      >
        <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:px-6 lg:px-8 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="SUPER_ADMIN">
                  <AdminManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// App Content with Router
const AdminRoutes: React.FC = () => {
  // Use local useAuth hook, assuming it's inside AuthProvider
  // But we need to wrap Routes in AuthProvider *before* using useAuth?
  // No, AdminRoutes wraps everything in AuthProvider.
  // But to use `useAuth` inside a component, that component must be child of Provider.
  // So we need a component inside.
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
};

const AdminContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login onLogin={() => { }} />
          )
        }
      />
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}

export default AdminRoutes;
