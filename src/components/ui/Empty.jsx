import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No data available",
  description = "Get started by adding your first item.",
  icon = "Database",
  action,
  actionLabel = "Get Started",
  className,
  type = "default"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "leads":
        return {
          title: "No leads yet",
          description: "Start building your pipeline by adding leads from LinkedIn profiles.",
          icon: "Users",
          actionLabel: "Browse LinkedIn"
        };
      case "followups":
        return {
          title: "No follow-ups scheduled",
          description: "Stay on top of your leads by scheduling follow-up reminders.",
          icon: "Clock",
          actionLabel: "View Pipeline"
        };
      case "pipeline":
        return {
          title: "Empty pipeline",
          description: "Your sales pipeline is empty. Start by adding leads from LinkedIn.",
          icon: "BarChart3",
          actionLabel: "Add First Lead"
        };
      default:
        return { title, description, icon, actionLabel };
    }
  };

  const content = getEmptyContent();

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4", className)}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-80">
          <ApperIcon name={content.icon} className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {content.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {content.description}
        </p>
        
        {action && (
          <Button
            variant="primary"
            size="lg"
            onClick={action}
            icon="Plus"
            className="mb-6"
          >
            {content.actionLabel}
          </Button>
        )}
        
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
          <div className="flex items-start space-x-3">
            <ApperIcon name="Lightbulb" className="w-5 h-5 text-primary-600 mt-0.5" />
            <div className="text-left">
              <h4 className="text-sm font-medium text-primary-900 mb-1">
                Quick Start Tips
              </h4>
              {type === "leads" && (
                <p className="text-sm text-primary-700">
                  Visit LinkedIn profiles and use the "Add Lead" button to quickly capture prospect information.
                </p>
              )}
              {type === "followups" && (
                <p className="text-sm text-primary-700">
                  Click the clock icon on any lead card to schedule a follow-up reminder.
                </p>
              )}
              {type === "pipeline" && (
                <p className="text-sm text-primary-700">
                  Organize your prospects through Cold Lead → Hot Lead → Estimate Sent → Deal Closed stages.
                </p>
              )}
              {type === "default" && (
                <p className="text-sm text-primary-700">
                  Use the navigation menu to explore different sections of your CRM.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;