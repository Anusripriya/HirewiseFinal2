import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Wand2, 
  Save, 
  X,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Briefcase
} from 'lucide-react';

const CreateVacancyForm = ({ onSubmit, onClose, isLoading, error }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    department: '',
    location: '',
    type: 'full-time',
    experience: '',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
    jdFile: null
  });
  const [isParsingJD, setIsParsingJD] = useState(false);
  const [jdParsed, setJdParsed] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'jdFile') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleJDUpload = async (file) => {
    if (!file) return;
    
    setIsParsingJD(true);
    
    // Simulate AI parsing delay
    setTimeout(() => {
      // Mock AI-parsed data
      const mockParsedData = {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Inc.',
        department: 'Engineering',
        location: 'San Francisco, CA',
        type: 'full-time',
        experience: 'senior',
        salary: '120000',
        description: 'We are seeking a talented Senior Full Stack Developer to join our dynamic engineering team. You will be responsible for developing and maintaining web applications using modern technologies.',
        responsibilities: 'Develop and maintain web applications\nCollaborate with cross-functional teams\nWrite clean, maintainable code\nParticipate in code reviews\nMentor junior developers',
        requirements: 'Bachelor\'s degree in Computer Science or related field\n5+ years of experience in full stack development\nStrong problem-solving skills\nExcellent communication skills',
        skills: 'JavaScript, React, Node.js, Python, SQL, MongoDB, AWS, Git'
      };
      
      setFormData(prev => ({
        ...prev,
        ...mockParsedData
      }));
      setIsParsingJD(false);
      setJdParsed(true);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      salary: formData.salary ? parseInt(formData.salary) : null
    };
    onSubmit(jobData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create Job Vacancy</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* JD Upload Section */}
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            AI-Powered Job Description Parser
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="file"
                name="jdFile"
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.files[0]) {
                    handleJDUpload(e.target.files[0]);
                  }
                }}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="jd-upload"
              />
              <label
                htmlFor="jd-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-200"
              >
                <Upload className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-blue-700">
                  {formData.jdFile ? formData.jdFile.name : 'Upload Job Description (PDF, DOC, TXT)'}
                </span>
              </label>
            </div>
            
            {isParsingJD && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Wand2 className="w-5 h-5 animate-spin" />
                <span>AI Parsing...</span>
              </div>
            )}
            
            {jdParsed && (
              <div className="flex items-center space-x-2 text-green-600">
                <FileText className="w-5 h-5" />
                <span>Parsed Successfully!</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Company name"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Engineering"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (2-5 years)</option>
                <option value="senior">Senior Level (5-10 years)</option>
                <option value="expert">Expert Level (10+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="e.g., 120000"
                />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe the role and what the candidate will be doing..."
              required
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Responsibilities
            </label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="List the main responsibilities (one per line)..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="List the requirements and qualifications..."
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., JavaScript, React, Node.js, Python"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Create Job</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateVacancyForm;
