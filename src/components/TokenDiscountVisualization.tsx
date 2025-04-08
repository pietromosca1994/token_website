import { useState, useEffect } from "react";

export default function TokenDiscountVisualization() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  
  const targetTokenCount = 14750000;
  const discountPercentage = 50;
  const regularPrice = 0.10;
  const discountPrice = regularPrice * (1 - discountPercentage/100);
  const remainingTime = "04:23:57:12";
  
  // Animation for counter
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const increment = Math.ceil(targetTokenCount / (duration / interval));
    
    const timer = setInterval(() => {
      setTokenCount(prev => {
        if (prev + increment >= targetTokenCount) {
          clearInterval(timer);
          setAnimationComplete(true);
          return targetTokenCount;
        }
        return prev + increment;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-gray-900 bg-opacity-95 rounded-xl p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-5 rounded-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600 opacity-10 blur-3xl"></div>
      
      {/* Header section */}
      <div className="flex items-center mb-6 relative z-10">
        <div className="mr-3 bg-blue-600 bg-opacity-20 rounded-full p-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-4xl font-bold text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">50% Token Discount</span>
        </h2>
        <span className="ml-4 bg-gradient-to-r from-green-500 to-green-400 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">LIVE NOW</span>
      </div>
      
      {/* Description */}
      <p className="text-gray-300 mb-8 max-w-2xl relative z-10">
        Early investors receive EAGLE tokens at half the public sale price during Phase 1, with guaranteed allocation.
      </p>
      
      {/* Token stats and visualization */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Token counter card */}
        <div className="flex-1 bg-gray-800 bg-opacity-60 backdrop-blur-lg border border-blue-500 border-opacity-20 rounded-xl p-6 transition-all hover:border-opacity-40 hover:-translate-y-1 duration-300">
          <h3 className="text-4xl font-bold text-white mb-2">{tokenCount.toLocaleString()}</h3>
          <p className="text-gray-400 mb-3">Tokens Sold</p>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${(tokenCount / targetTokenCount) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Price comparison visualization */}
        <div className="flex-1 bg-gray-800 bg-opacity-60 backdrop-blur-lg border border-blue-500 border-opacity-20 rounded-xl p-6 transition-all hover:border-opacity-40 hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-4xl font-bold text-white mb-1">{discountPercentage}%</h3>
              <p className="text-gray-400">Discount</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Ends in</p>
              <p className="text-blue-400 font-mono">{remainingTime}</p>
            </div>
          </div>
          
          {/* Price comparison visualization */}
          <div className="relative flex items-center justify-between">
            <div className="w-16 md:w-24 h-16 md:h-24 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center relative">
              <span className="text-lg font-bold text-red-400 line-through">${regularPrice.toFixed(2)}</span>
              <div className={`absolute inset-0 border-2 border-red-400 rounded-full ${animationComplete ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}></div>
            </div>
            
            {/* Arrow */}
            <div className="flex-1 flex justify-center items-center px-4">
              <svg className="w-8 md:w-12 h-6 md:h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            <div className="w-16 md:w-24 h-16 md:h-24 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center relative">
              <span className="text-lg font-bold text-green-400">${discountPrice.toFixed(2)}</span>
              <div className={`absolute inset-0 border-2 border-green-400 rounded-full ${animationComplete ? 'scale-110 opacity-100' : 'scale-100 opacity-0'} transition-all duration-1000`}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Button */}
      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 max-w-md mx-auto">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Join Private Sale Now
      </button>
    </div>
  );
}