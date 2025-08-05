import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import CreateVacancyForm from '../components/CreateVacancyForm';
import ProgressBar from '../components/ProgressBar';
import ResumeCard from '../components/ResumeCard';
import { 
  LogOut, 
  Plus, 
  Briefcase, 
  Users, 
  TrendingUp, 
  FileText,
  Eye,
  Download,
  Mail,
  Star
} from 'lucide-react';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { user, jobs, applications, logout, addJob, getJobApplications } = useApp();
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get recruiter's jobs (in real app, filter by recruiter ID)
  const recruiterJobs = jobs;
  const totalApplications = applications.length;

  const handleCreateJob = async (jobData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add job
      const newJob = addJob({
        ...jobData,
        recruiterId: user.id,
        recruiterName: user.name,
        company: user.company || jobData.company
      });

      setShowCreateJobModal(false);
      console.log('Job created:', newJob);
    } catch (err) {
      setError('Failed to create job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResume = (candidate) => {
    // In real app, this would open resume viewer
    alert(`Viewing resume for ${candidate.name}`);
  };

  const handleDownloadResume = (candidate) => {
    // In real app, this would download the resume
    alert(`Downloading resume for ${candidate.name}`);
  };

  const handleSendEmail = (jobId) => {
    // In real app, this would send emails to top candidates
    alert('Emails sent to top candidates!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getJobProgress = (job) => {
    const applications = getJobApplications(job.id);
    if (applications.length === 0) return 0;
    if (applications.length > 0 && applications.length < 5) return 1;
    return 2; // Emails sent stage
  };

  const getTopCandidates = (jobId) => {
    const jobApplications = getJobApplications(jobId);
    return jobApplications
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 3);
  };

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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-600">AR Recruiter Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowCreateJobModal(true)}
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                <span>Create Job</span>
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
        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{recruiterJobs.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Match Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalApplications > 0 
                    ? Math.round(applications.reduce((sum, app) => sum + (app.matchScore || 0), 0) / totalApplications)
                    : 0}%
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </motion.div>

        {/* Jobs Overview */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
          
          {recruiterJobs.length > 0 ? (
            recruiterJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {getJobApplications(job.id).length} applications
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {job.jdFile ? 'JD Uploaded' : 'No JD'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSendEmail(job.id)}
                      className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      <span className="text-sm">Send Emails</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <ProgressBar currentStep={getJobProgress(job)} />
                </div>

                {/* Top Candidates */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Top 3 Matched Candidates
                  </h4>
                  
                  {getTopCandidates(job.id).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {getTopCandidates(job.id).map((application) => (
                        <ResumeCard
                          key={application.id}
                          candidate={{
                            id: application.candidateId,
                            name: application.candidateName,
                            email: application.candidateEmail,
                            resumeUrl: application.resumeUrl,
                            appliedAt: application.appliedAt,
                            status: application.status
                          }}
                          matchScore={application.matchScore}
                          onViewResume={handleViewResume}
                          onDownloadResume={handleDownloadResume}
                          className="h-full"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">No applications yet</p>
                      <p className="text-sm text-gray-500">Share this job to get candidates!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="card text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
              <p className="text-gray-600 mb-6">Create your first job posting to start recruiting!</p>
              <button
                onClick={() => setShowCreateJobModal(true)}
                className="btn-primary"
              >
                Create Your First Job
              </button>
            </motion.div>
          )}
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

export default RecruiterDashboard;
