import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200/30 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-neural-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="mt-4 text-center">
          <p className="text-primary-300 text-sm font-medium">Initializing DreamScope...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;