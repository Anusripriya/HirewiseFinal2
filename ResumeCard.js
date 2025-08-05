import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Eye, 
  Star, 
  User, 
  Mail, 
  Phone,
  Calendar,
  Award
} from 'lucide-react';

const ResumeCard = ({ 
  candidate, 
  matchScore, 
  onViewResume, 
  onDownloadResume, 
  showMatchScore = true,
  className = '' 
}) => {
  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      className={`card hover:shadow-xl transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {candidate.name ? candidate.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.email}</p>
          </div>
        </div>
        
        {showMatchScore && matchScore && (
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(matchScore)}`}>
            <Star className="w-4 h-4 mr-1" />
            {matchScore}% Match
          </div>
        )}
      </div>

      {/* Candidate Details */}
      <div className="space-y-3 mb-6">
        {candidate.phone && (
          <div className="flex items-center text-gray-600 text-sm">
            <Phone className="w-4 h-4 mr-2" />
            <span>{candidate.phone}</span>
          </div>
        )}
        
        {candidate.experience && (
          <div className="flex items-center text-gray-600 text-sm">
            <Award className="w-4 h-4 mr-2" />
            <span>{candidate.experience} Level Experience</span>
          </div>
        )}

        {candidate.appliedAt && (
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Applied on {formatDate(candidate.appliedAt)}</span>
          </div>
        )}

        {candidate.skills && candidate.skills.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 6 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  +{candidate.skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Resume Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Resume.pdf</p>
              <p className="text-sm text-gray-600">
                {candidate.resumeUrl ? 'Available' : 'Not uploaded'}
              </p>
            </div>
          </div>
          
          {candidate.resumeUrl && (
            <div className="flex items-center space-x-2">
              {onViewResume && (
                <motion.button
                  onClick={() => onViewResume(candidate)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
              )}
              
              {onDownloadResume && (
                <motion.button
                  onClick={() => onDownloadResume(candidate)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            candidate.status === 'applied' ? 'bg-blue-500' :
            candidate.status === 'reviewed' ? 'bg-yellow-500' :
            candidate.status === 'interviewed' ? 'bg-purple-500' :
            candidate.status === 'hired' ? 'bg-green-500' :
            'bg-gray-500'
          }`} />
          <span className="text-sm font-medium text-gray-700 capitalize">
            {candidate.status || 'Applied'}
          </span>
        </div>
        
        {showMatchScore && matchScore && (
          <div className="text-sm text-gray-600">
            Compatibility: {matchScore >= 80 ? 'Excellent' : matchScore >= 60 ? 'Good' : 'Fair'}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeCard;
