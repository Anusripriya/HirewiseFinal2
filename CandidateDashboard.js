import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import JobCard from '../components/JobCard';
import { 
  LogOut, 
  Search, 
  Filter, 
  User, 
  Briefcase, 
  CheckCircle,
  Clock,
  Star,
  Upload,
  FileText
} from 'lucide-react';

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { user, jobs, applications, logout, applyToJob, getCandidateApplications } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Get candidate's applications
  const candidateApplications = getCandidateApplications(user?.id);
  const appliedJobIds = candidateApplications.map(app => app.jobId);

  // Sample jobs if none exist
  useEffect(() => {
    if (jobs.length === 0) {
      // Add some sample jobs for demo
      const sampleJobs = [
        {
          id: '1',
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          department: 'Engineering',
          location: 'San Francisco, CA',
          type: 'full-time',
          experience: 'senior',
          salary: 120000,
          description: 'We are looking for a Senior Frontend Developer to join our team and build amazing user experiences.',
          skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
          createdAt: new Date().toISOString(),
          applications: []
        },
        {
          id: '2',
          title: 'Full Stack Engineer',
          company: 'StartupXYZ',
          department: 'Engineering',
          location: 'Remote',
          type: 'full-time',
          experience: 'mid',
          salary: 95000,
          description: 'Join our fast-growing startup as a Full Stack Engineer and help build the next generation of web applications.',
          skills: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS'],
          createdAt: new Date().toISOString(),
          applications: []
        },
        {
          id: '3',
          title: 'UI/UX Designer',
          company: 'DesignStudio',
          department: 'Design',
          location: 'New York, NY',
          type: 'full-time',
          experience: 'mid',
          salary: 85000,
          description: 'Create beautiful and intuitive user interfaces for our clients\' digital products.',
          skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
          createdAt: new Date().toISOString(),
          applications: []
        }
      ];
      
      // In a real app, this would be handled by the context initialization
      console.log('Sample jobs would be added here');
    }
  }, [jobs.length]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'applied' && appliedJobIds.includes(job.id)) ||
                         (filterType === 'not-applied' && !appliedJobIds.includes(job.id));
    
    return matchesSearch && matchesFilter;
  });

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleConfirmApplication = () => {
    if (selectedJob && user) {
      applyToJob(selectedJob.id, {
        id: user.id,
        name: user.name,
        email: user.email,
        resumeUrl: user.resumeUrl || '#'
      });
      setShowApplicationModal(false);
      setSelectedJob(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-600">Candidate Dashboard</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
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
                <p className="text-sm font-medium text-gray-600">Available Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{candidateApplications.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {candidateApplications.filter(app => app.status === 'applied').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Match</p>
                <p className="text-2xl font-bold text-gray-900">
                  {candidateApplications.length > 0 
                    ? Math.round(candidateApplications.reduce((sum, app) => sum + app.matchScore, 0) / candidateApplications.length)
                    : 0}%
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Jobs</option>
                  <option value="applied">Applied</option>
                  <option value="not-applied">Not Applied</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <JobCard
                  job={job}
                  onApply={handleApply}
                  applied={appliedJobIds.includes(job.id)}
                  matchScore={candidateApplications.find(app => app.jobId === job.id)?.matchScore}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Application</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to apply for <strong>{selectedJob.title}</strong> at {selectedJob.company}?
            </p>
            
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApplication}
                className="btn-primary"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CandidateDashboard;
