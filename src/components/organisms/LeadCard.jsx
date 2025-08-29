import React from "react";
import { cn } from "@/utils/cn";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const LeadCard = ({ 
  lead, 
  onDragStart, 
  onDragEnd, 
  onStageChange, 
  onFollowUp, 
  isDragging,
  className 
}) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const getStageVariant = (stage) => {
    const variants = {
      cold: "cold",
      hot: "hot", 
      estimate: "estimate",
      closed: "closed"
    };
    return variants[stage] || "default";
  };

  const stageActions = [
    { stage: "cold", label: "Mark Cold", icon: "Snowflake" },
    { stage: "hot", label: "Mark Hot", icon: "Flame" },
    { stage: "estimate", label: "Estimate Sent", icon: "FileText" },
    { stage: "closed", label: "Close Deal", icon: "CheckCircle" }
  ];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={cn(
        "lead-card bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 shadow-card border border-gray-100",
        isDragging && "dragging",
        className
      )}
    >
      <div className="flex items-start space-x-3 mb-3">
        <Avatar
          src={lead.photoUrl}
          alt={lead.name}
          fallback={getInitials(lead.name)}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">
            {lead.name}
          </h4>
          <p className="text-sm text-gray-600 truncate">
            {lead.jobTitle}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {lead.company}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <Badge variant={getStageVariant(lead.stage)} size="sm">
          {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
        </Badge>
        <span className="text-xs text-gray-400">
          {format(new Date(lead.dateAdded), "MMM dd")}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFollowUp(lead)}
          className="text-primary-600 hover:text-primary-700 p-1"
        >
          <ApperIcon name="Clock" className="w-4 h-4" />
        </Button>

        <div className="flex space-x-1">
          {stageActions
            .filter(action => action.stage !== lead.stage)
            .slice(0, 2)
            .map((action) => (
              <Button
                key={action.stage}
                variant="ghost"
                size="sm"
                onClick={() => onStageChange(action.stage)}
                className="text-gray-600 hover:text-gray-900 p-1"
                title={action.label}
              >
                <ApperIcon name={action.icon} className="w-3 h-3" />
              </Button>
            ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(lead.linkedInUrl, "_blank")}
          className="text-primary-600 hover:text-primary-700 p-1"
        >
          <ApperIcon name="ExternalLink" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LeadCard;