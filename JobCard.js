import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Briefcase, 
  Star,
  Calendar,
  Eye,
  ExternalLink
} from 'lucide-react';

const JobCard = ({ job, onApply, onViewDetails, showApplyButton = true, applied = false, matchScore = null }) => {
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

  const getExperienceColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-blue-100 text-blue-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="card hover:shadow-2xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Briefcase className="w-4 h-4 mr-2" />
            <span className="font-medium">{job.company || 'HireWise Company'}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{job.location || 'Remote'}</span>
            <span className="mx-2">•</span>
            <Calendar className="w-4 h-4 mr-1" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
        </div>
        
        {matchScore && (
          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <Star className="w-4 h-4 mr-1" />
            {matchScore}% Match
          </div>
        )}
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {job.experience && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getExperienceColor(job.experience)}`}>
              {job.experience} Level
            </span>
          )}
          {job.department && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {job.department}
            </span>
          )}
          {job.type && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {job.type}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {job.description || 'No description available'}
        </p>

        {job.skills && job.skills.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 5 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  +{job.skills.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {job.salary && (
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{formatSalary(job.salary)}</span>
            </div>
          )}
          {job.applications && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{job.applications.length} applicants</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {onViewDetails && (
            <motion.button
              onClick={() => onViewDetails(job)}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-sm">View</span>
            </motion.button>
          )}
          
          {showApplyButton && (
            <motion.button
              onClick={() => onApply(job)}
              disabled={applied}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                applied
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
              whileHover={!applied ? { scale: 1.05 } : {}}
              whileTap={!applied ? { scale: 0.95 } : {}}
            >
              {applied ? (
                <>
                  <span>Applied</span>
                </>
              ) : (
                <>
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
