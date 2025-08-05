import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  BarChart3, 
  Brain, 
  Target, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Homepage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Role-based Dashboards",
      description: "Tailored interfaces for Candidates, Recruiters, and Admins"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Resume Upload & Tracking",
      description: "Easy resume management and application tracking system"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Job Parsing",
      description: "Intelligent job description analysis and auto-fill capabilities"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Candidate Matching",
      description: "Advanced algorithms for optimal candidate-job matching"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Canvas View",
      description: "Dynamic job visualization and candidate tracking"
    }
  ];

  const loginButtons = [
    {
      title: "Candidate Login",
      description: "Find your dream job",
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700",
      path: "/candidate/login",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "AR Recruiter Login",
      description: "Discover top talent",
      color: "from-purple-500 to-purple-600",
      hoverColor: "from-purple-600 to-purple-700",
      path: "/recruiter/login",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: "Admin Login",
      description: "Manage the platform",
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-600 to-green-700",
      path: "/admin/login",
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HireWise
              </h1>
              <p className="text-sm text-gray-600">Smart Recruitment Platform</p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          AI-Powered Role-based
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Recruitment Platform
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Revolutionize your hiring process with intelligent candidate matching, 
          AI-powered job parsing, and comprehensive analytics. Built for the modern workforce.
        </motion.p>

        {/* Login Buttons */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {loginButtons.map((button, index) => (
            <motion.button
              key={button.title}
              onClick={() => navigate(button.path)}
              className={`group relative overflow-hidden bg-gradient-to-r ${button.color} hover:${button.hoverColor} text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  {button.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{button.title}</h3>
                <p className="text-sm opacity-90 mb-4">{button.description}</p>
                <ArrowRight className="w-5 h-5 mx-auto group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="text-center mb-16">
          <motion.h3 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            Platform Features
          </motion.h3>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Everything you need for modern recruitment in one powerful platform
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">Available</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h5 className="text-2xl font-bold">HireWise</h5>
          </div>
          <p className="text-gray-400 mb-4">
            Built for Hexawire Hackathon - Revolutionizing Recruitment with AI
          </p>
          <p className="text-sm text-gray-500">
            © 2024 HireWise. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Homepage;
