"use client"
import React, { useEffect, useState } from 'react';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';

export default function NotFoundPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate floating elements
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setFloatingElements(elements);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen pt-32 pb-10 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#292a2d' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-blue-400 opacity-20 rounded-full animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />

      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 max-w-2xl mx-auto transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 animate-bounce">
            4
            <span className="inline-block animate-pulse text-blue-400">0</span>
            4
          </h1>
          
          {/* Glowing Effect */}
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-blue-400 opacity-20 blur-lg animate-pulse">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 animate-fade-in">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn!
          </p>
        </div>



        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={handleGoHome}
            className="group bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/25 flex items-center space-x-2"
          >
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            <span>Go Home</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="group bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5 group-hover:animate-bounce" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={handleRefresh}
            className="group bg-transparent border-2 border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Fun Suggestion */}
        <div className="mt-12 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-300 text-sm">
            💡 <span className="font-medium">Pro tip:</span> Try checking the URL for typos.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}