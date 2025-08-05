import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import ResumeCard from '../components/ResumeCard';
import { 
  ArrowLeft, 
  Briefcase, 
  Users, 
  FileText, 
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Filter,
  Search,
  Eye,
  Download
} from 'lucide-react';

const CanvasJobDisplay = () => {
  const navigate = useNavigate();
  const { jobs, applications, getJobApplications } = useApp();
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Auto-select first job if none selected
  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJob]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getJobStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return `$${salary.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const selectedJobApplications = selectedJob ? getJobApplications(selectedJob.id) : [];

  const handleViewResume = (candidate) => {
    alert(`Viewing resume for ${candidate.name}`);
  };

  const handleDownloadResume = (candidate) => {
    alert(`Downloading resume for ${candidate.name}`);
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Dashboard</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Canvas Job Display</h1>
                  <p className="text-sm text-gray-600">Real-time job and candidate visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Jobs Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Job Postings</h2>
                <span className="text-sm text-gray-500">{filteredJobs.length} jobs</span>
              </div>

              {/* Search and Filter */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Jobs List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedJob?.id === job.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {job.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getJobStatusColor(job.status || 'active')}`}>
                        {job.status || 'active'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {getJobApplications(job.id).length} applicants
                      </span>
                      <span>{formatDate(job.createdAt)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Job Details and Candidates */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {selectedJob ? (
              <div className="space-y-6">
                {/* Job Details Card */}
                <div className="card">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h1>
                          <p className="text-gray-600">{selectedJob.company}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{selectedJob.location || 'Remote'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span>{formatSalary(selectedJob.salary)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDate(selectedJob.createdAt)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FileText className="w-4 h-4 mr-2" />
                          <span>{selectedJob.jdFile ? 'JD Available' : 'No JD'}</span>
                        </div>
                      </div>
                      
                      {selectedJob.description && (
                        <p className="text-gray-700 mb-4">{selectedJob.description}</p>
                      )}
                      
                      {selectedJob.skills && selectedJob.skills.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedJob.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getJobStatusColor(selectedJob.status || 'active')}`}>
                        {selectedJob.status || 'active'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Candidates Section */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Applied Candidates ({selectedJobApplications.length})
                    </h2>
                    
                    {selectedJobApplications.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-1" />
                        <span>
                          Avg Match: {Math.round(selectedJobApplications.reduce((sum, app) => sum + (app.matchScore || 0), 0) / selectedJobApplications.length)}%
                        </span>
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedJobApplications.length > 0 ? (
                      <motion.div
                        key="candidates-grid"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {selectedJobApplications
                          .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
                          .map((application, index) => (
                            <motion.div
                              key={application.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <ResumeCard
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
                              />
                            </motion.div>
                          ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="no-candidates"
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-600">
                          Candidates will appear here as they apply to this job.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <motion.div
                className="card text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job selected</h3>
                <p className="text-gray-600">
                  Select a job from the sidebar to view its details and candidates.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CanvasJobDisplay;
