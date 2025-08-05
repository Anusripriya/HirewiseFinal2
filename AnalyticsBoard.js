import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Filter,
  Download,
  Eye,
  Star,
  Calendar,
  Search
} from 'lucide-react';

const AnalyticsBoard = ({ jobs = [], applications = [], candidates = [] }) => {
  const [filters, setFilters] = useState({
    domain: '',
    skills: '',
    status: '',
    dateRange: '30'
  });

  // Calculate analytics
  const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const totalCandidates = candidates.length;
  const avgMatchScore = applications.length > 0 
    ? Math.round(applications.reduce((sum, app) => sum + (app.matchScore || 0), 0) / applications.length)
    : 0;

  const stats = [
    {
      title: 'Total Jobs',
      value: totalJobs,
      icon: <Briefcase className="w-8 h-8" />,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Applications',
      value: totalApplications,
      icon: <Users className="w-8 h-8" />,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      title: 'Candidates',
      value: totalCandidates,
      icon: <Users className="w-8 h-8" />,
      color: 'bg-purple-500',
      change: '+8%'
    },
    {
      title: 'Avg Match Score',
      value: `${avgMatchScore}%`,
      icon: <Star className="w-8 h-8" />,
      color: 'bg-yellow-500',
      change: '+5%'
    }
  ];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.domain && !job.department?.toLowerCase().includes(filters.domain.toLowerCase())) {
      return false;
    }
    if (filters.skills && !job.skills?.some(skill => 
      skill.toLowerCase().includes(filters.skills.toLowerCase())
    )) {
      return false;
    }
    if (filters.status && job.status !== filters.status) {
      return false;
    }
    return true;
  });

  const generateReport = () => {
    const reportData = {
      totalJobs,
      totalApplications,
      totalCandidates,
      avgMatchScore,
      topSkills: getTopSkills(),
      jobsByDepartment: getJobsByDepartment(),
      applicationTrends: getApplicationTrends()
    };
    
    // In a real app, this would generate and download a PDF/Excel report
    console.log('Generated Report:', reportData);
    alert('Report generated! Check console for details.');
  };

  const getTopSkills = () => {
    const skillCount = {};
    jobs.forEach(job => {
      job.skills?.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });
    return Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([skill, count]) => ({ skill, count }));
  };

  const getJobsByDepartment = () => {
    const deptCount = {};
    jobs.forEach(job => {
      const dept = job.department || 'Other';
      deptCount[dept] = (deptCount[dept] || 0) + 1;
    });
    return Object.entries(deptCount).map(([dept, count]) => ({ dept, count }));
  };

  const getApplicationTrends = () => {
    // Mock trend data
    return [
      { date: '2024-01-01', applications: 45 },
      { date: '2024-01-02', applications: 52 },
      { date: '2024-01-03', applications: 38 },
      { date: '2024-01-04', applications: 61 },
      { date: '2024-01-05', applications: 49 }
    ];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <motion.button
          onClick={generateReport}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-5 h-5" />
          <span>Generate Report</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain/Department
            </label>
            <input
              type="text"
              name="domain"
              value={filters.domain}
              onChange={handleFilterChange}
              className="input-field"
              placeholder="e.g., Engineering"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
              className="input-field"
              placeholder="e.g., React"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills Chart */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills in Demand</h3>
          <div className="space-y-3">
            {getTopSkills().map((item, index) => (
              <div key={item.skill} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(item.count / Math.max(...getTopSkills().map(s => s.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Jobs by Department */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Department</h3>
          <div className="space-y-3">
            {getJobsByDepartment().map((item, index) => (
              <div key={item.dept} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.dept}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(item.count / Math.max(...getJobsByDepartment().map(d => d.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Filtered Jobs Table */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Filtered Jobs ({filteredJobs.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredJobs.length} of {totalJobs} jobs
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {job.department || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.applications?.length || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' :
                      job.status === 'closed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsBoard;
