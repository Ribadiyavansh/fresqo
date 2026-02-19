import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Landing from '@/pages/Landing';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';

import AdminRoutes from '@/admin/App';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Routes - The AdminRoutes component handles sub-routes */}
      {/* Note: AdminRoutes defines /login and /* (dashboard etc) */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 404 - Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
