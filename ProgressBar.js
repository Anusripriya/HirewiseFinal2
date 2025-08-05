import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const ProgressBar = ({ steps, currentStep = 0, className = '' }) => {
  const defaultSteps = [
    'JD Uploaded',
    'Profiles Ranked',
    'Emails Sent'
  ];

  const progressSteps = steps || defaultSteps;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {progressSteps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </motion.div>
              <motion.p
                className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                  index <= currentStep ? 'text-primary-600' : 'text-gray-500'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                {step}
              </motion.p>
            </div>
            
            {index < progressSteps.length - 1 && (
              <motion.div
                className="flex-1 mx-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="relative">
                  <div className="h-0.5 bg-gray-300 w-full" />
                  <motion.div
                    className="h-0.5 bg-primary-600 absolute top-0 left-0"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: index < currentStep ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  />
                </div>
                <div className="flex justify-center mt-1">
                  <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${
                    index < currentStep ? 'text-primary-600' : 'text-gray-300'
                  }`} />
                </div>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Progress percentage */}
      <motion.div
        className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (progressSteps.length - 1)) * 100}%` }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>
      
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Progress</span>
        <span>{Math.round((currentStep / (progressSteps.length - 1)) * 100)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
