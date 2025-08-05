import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import LoginForm from '../components/LoginForm';
import { BarChart3, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would validate against backend
      if (formData.email && formData.password) {
        const adminData = {
          id: Date.now().toString(),
          name: formData.email.split('@')[0],
          email: formData.email,
          role: 'admin',
          permissions: ['all']
        };

        login(adminData, 'admin');
        navigate('/admin/dashboard');
      } else {
        setError('Please provide valid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Home</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Access the administrative dashboard</p>
        </motion.div>

        {/* Login Form */}
        <LoginForm
          title="Sign In as Admin"
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
          showSignupLink={false}
        />

        {/* Demo Credentials */}
        <motion.div
          className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h4 className="text-sm font-medium text-green-900 mb-2">Demo Credentials:</h4>
          <p className="text-sm text-green-700">
            Email: admin@demo.com<br />
            Password: demo123
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
