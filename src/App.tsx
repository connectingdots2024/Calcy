import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppAuth } from './hooks/useAppAuth';
import { auth } from './firebase';
import Layout from './components/Layout';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Bookkeeping from './pages/Bookkeeping';
import Invoicing from './pages/Invoicing';
import Payroll from './pages/Payroll';
import Accounting from './pages/Accounting';
import Clients from './pages/Clients';
import Documents from './pages/Documents';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import AdminDashboard from './pages/AdminDashboard';
import LilliputAgent from './components/LilliputAgent';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, loading] = useAppAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
};

export default function App() {
  return (
    <Router>
      <LilliputAgent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/bookkeeping" element={
          <ProtectedRoute>
            <Bookkeeping />
          </ProtectedRoute>
        } />

        <Route path="/invoicing" element={
          <ProtectedRoute>
            <Invoicing />
          </ProtectedRoute>
        } />

        <Route path="/payroll" element={
          <ProtectedRoute>
            <Payroll />
          </ProtectedRoute>
        } />

        <Route path="/accounting" element={
          <ProtectedRoute>
            <Accounting />
          </ProtectedRoute>
        } />

        <Route path="/clients" element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } />

        <Route path="/documents" element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        } />

        <Route path="/subscription" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />

        <Route path="/pricing" element={
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback for other routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
