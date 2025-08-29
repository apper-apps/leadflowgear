import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const TabNavigation = ({ tabs, className }) => {
  return (
    <nav className={cn("flex space-x-1 bg-gray-100 p-1 rounded-lg", className)}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
            "hover:bg-white hover:shadow-sm",
            isActive
              ? "bg-white text-primary-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <ApperIcon name={tab.icon} className="w-4 h-4 mr-2" />
          {tab.label}
          {tab.badge && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full">
              {tab.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default TabNavigation;