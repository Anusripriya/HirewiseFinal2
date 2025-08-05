import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import AnalyticsBoard from '../components/AnalyticsBoard';
import CreateVacancyForm from '../components/CreateVacancyForm';
import { 
  LogOut, 
  Plus, 
  BarChart3, 
  Users, 
  Briefcase, 
  TrendingUp,
  Eye,
  Settings,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, jobs, applications, candidates, logout, addJob } = useApp();
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateJob = async (jobData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add job
      const newJob = addJob({
        ...jobData,
        createdBy: user.id,
        createdByName: user.name
      });

      setShowCreateJobModal(false);
      console.log('Job created by admin:', newJob);
    } catch (err) {
      setError('Failed to create job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCanvas = () => {
    navigate('/admin/canvas');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate stats
  const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const totalCandidates = candidates.length;
  const avgMatchScore = applications.length > 0 
    ? Math.round(applications.reduce((sum, app) => sum + (app.matchScore || 0), 0) / applications.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleViewCanvas}
                className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-5 h-5" />
                <span>Canvas View</span>
              </motion.button>
              
              <motion.button
                onClick={() => setShowCreateJobModal(true)}
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                <span>Create Job Vacancy</span>
              </motion.button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% this month</span>
                </div>
              </div>
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+18% this month</span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{totalCandidates}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8% this month</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Match Score</p>
                <p className="text-2xl font-bold text-gray-900">{avgMatchScore}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5% this month</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              onClick={() => setShowCreateJobModal(true)}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-700">Create Job Vacancy</p>
                <p className="text-sm text-gray-500">Add a new job posting</p>
              </div>
            </motion.button>
            
            <motion.button
              onClick={handleViewCanvas}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-700">Canvas View</p>
                <p className="text-sm text-gray-500">Real-time job visualization</p>
              </div>
            </motion.button>
            
            <motion.button
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-700">Platform Settings</p>
                <p className="text-sm text-gray-500">Configure system settings</p>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Analytics Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <AnalyticsBoard 
            jobs={jobs}
            applications={applications}
            candidates={candidates}
          />
        </motion.div>
      </div>

      {/* Create Job Modal */}
      {showCreateJobModal && (
        <CreateVacancyForm
          onSubmit={handleCreateJob}
          onClose={() => setShowCreateJobModal(false)}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
