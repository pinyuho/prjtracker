import React from "react";

const LoadAnimation = () => {
  return (
    <div className="relative flex h-20 flex-row">
      <div className="animation-delay-0 absolute -left-8 m-1 h-10 w-10 animate-bounce p-4">
        <div className="h-2 w-2 rounded-full bg-gray-500 "></div>
      </div>
      <div className="absolute -left-4 m-1 h-10 w-10 animate-bounce p-4 animation-delay-100">
        <div className="h-2 w-2 rounded-full bg-gray-600 "></div>
      </div>
      <div className="absolute left-0 m-1 h-10 w-10 animate-bounce p-4 animation-delay-200">
        <div className="h-2 w-2 rounded-full bg-gray-700 "></div>
      </div>
    </div>
  );
};

export default LoadAnimation;
