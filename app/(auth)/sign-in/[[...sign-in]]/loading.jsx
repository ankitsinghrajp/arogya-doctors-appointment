
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#292a2d] flex items-center justify-center z-50">
      <div className="relative">
        {/* Main spinner */}
        <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        
        {/* Optional: Add a subtle pulse effect */}
        <div className="absolute inset-0 w-12 h-12 border-4 border-gray-700 rounded-full animate-pulse opacity-30"></div>
      </div>
      
      {/* Optional loading text */}
      <div className="absolute mt-20 text-gray-400 text-sm font-medium tracking-wide">
        Loading...
      </div>
    </div>
  );
};

export default Loading;