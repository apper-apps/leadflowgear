import React from "react";
import ApperIcon from "@/components/ApperIcon";
import TabNavigation from "@/components/molecules/TabNavigation";

const Header = ({ followUpCount = 0 }) => {
  const tabs = [
    { 
      path: "/pipeline", 
      label: "Pipeline", 
      icon: "BarChart3" 
    },
    { 
      path: "/followups", 
      label: "Follow-ups", 
      icon: "Clock",
      badge: followUpCount > 0 ? followUpCount : null
    }
  ];

  return (
    <header className="bg-gradient-to-r from-white to-surface-100 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Users" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  LeadFlow
                </h1>
                <p className="text-xs text-gray-500">LinkedIn CRM Extension</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <TabNavigation tabs={tabs} />
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Sales Pipeline</p>
              <p className="text-xs text-gray-500">Manage your leads</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;