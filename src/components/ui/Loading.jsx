import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, type = "pipeline" }) => {
  if (type === "pipeline") {
    return (
      <div className={cn("grid grid-cols-4 gap-6", className)}>
        {Array.from({ length: 4 }).map((_, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {/* Column header skeleton */}
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                </div>
              </div>
              
              {/* Lead card skeletons */}
              {Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map((_, cardIndex) => (
                <div key={cardIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-3">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                      <div className="h-3 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                      <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "followups") {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-card border-l-4 border-l-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  <div className="h-3 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  <div className="h-3 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className={cn("grid grid-cols-4 gap-6", className)}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default loading spinner
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      <span className="ml-3 text-sm text-gray-600">Loading...</span>
    </div>
  );
};

export default Loading;