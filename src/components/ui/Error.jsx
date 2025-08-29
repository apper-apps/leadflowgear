import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4", className)}>
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <div className="flex justify-center space-x-3">
            <Button
              variant="primary"
              onClick={onRetry}
              icon="RefreshCw"
            >
              Try Again
            </Button>
          </div>
        )}
        
        <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
          <p className="text-sm text-red-700">
            <ApperIcon name="Info" className="w-4 h-4 inline mr-2" />
            If this problem persists, please check your internet connection or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;