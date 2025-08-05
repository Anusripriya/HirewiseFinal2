import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import SignupForm from '../components/SignupForm';
import { Users, ArrowLeft } from 'lucide-react';

const CandidateSignup = () => {
  const navigate = useNavigate();
  const { login, dispatch, ActionTypes } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create candidate data
      const candidateData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        experience: formData.experience,
        resumeUrl: formData.resumeFile ? URL.createObjectURL(formData.resumeFile) : null,
        resumeFile: formData.resumeFile,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      // Add candidate to context
      dispatch({ type: ActionTypes.ADD_CANDIDATE, payload: candidateData });

      // Log in the user
      login(candidateData, 'candidate');
      navigate('/candidate/dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/candidate/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join HireWise</h1>
          <p className="text-gray-600">Create your candidate profile and start your job search</p>
        </motion.div>

        {/* Signup Form */}
        <SignupForm
          onSubmit={handleSignup}
          isLoading={isLoading}
          error={error}
          onLoginClick={handleLoginClick}
        />
      </div>
    </div>
  );
};

export default CandidateSignup;
