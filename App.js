import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './contexts/AppContext';

// Import pages
import Homepage from './pages/Homepage';
import CandidateLogin from './pages/CandidateLogin';
import CandidateSignup from './pages/CandidateSignup';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterLogin from './pages/RecruiterLogin';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CanvasJobDisplay from './pages/CanvasJobDisplay';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userRole } = useApp();
  
  if (!user || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Main App Router Component
const AppRouter = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PageTransition>
              <Homepage />
            </PageTransition>
          } />
          
          {/* Candidate Routes */}
          <Route path="/candidate/login" element={
            <PageTransition>
              <CandidateLogin />
            </PageTransition>
          } />
          <Route path="/candidate/signup" element={
            <PageTransition>
              <CandidateSignup />
            </PageTransition>
          } />
          <Route path="/candidate/dashboard" element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <PageTransition>
                <CandidateDashboard />
              </PageTransition>
            </ProtectedRoute>
          } />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/login" element={
            <PageTransition>
              <RecruiterLogin />
            </PageTransition>
          } />
          <Route path="/recruiter/dashboard" element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <PageTransition>
                <RecruiterDashboard />
              </PageTransition>
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin/canvas" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PageTransition>
                <CanvasJobDisplay />
              </PageTransition>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

// Main App Component
function App() {
  return (
    <AppProvider>
      <div className="App min-h-screen bg-gray-50">
        <AppRouter />
      </div>
    </AppProvider>
  );
}

export default App;
