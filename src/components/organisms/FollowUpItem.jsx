import React from "react";
import { cn } from "@/utils/cn";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format, isAfter, isToday, isBefore, startOfDay } from "date-fns";

const FollowUpItem = ({ 
  followUp, 
  lead, 
  onComplete, 
  onReschedule, 
  className 
}) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const getUrgency = (date) => {
    const today = startOfDay(new Date());
    const followUpDate = startOfDay(new Date(date));
    
    if (isBefore(followUpDate, today)) return "overdue";
    if (isToday(new Date(date))) return "today";
    return "upcoming";
  };

  const getUrgencyStyles = (urgency) => {
    const styles = {
      overdue: "border-l-red-500 bg-gradient-to-r from-red-50 to-red-25",
      today: "border-l-accent-500 bg-gradient-to-r from-accent-50 to-accent-25",
      upcoming: "border-l-primary-500 bg-gradient-to-r from-primary-50 to-primary-25"
    };
    return styles[urgency] || styles.upcoming;
  };

  const urgency = getUrgency(followUp.scheduledDate);

  return (
    <div className={cn(
      "bg-white rounded-lg p-4 shadow-card border-l-4 hover:shadow-card-hover transition-all duration-200",
      getUrgencyStyles(urgency),
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Avatar
            src={lead?.photoUrl}
            alt={lead?.name || "Unknown"}
            fallback={lead ? getInitials(lead.name) : "?"}
            size="md"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">
                {lead?.name || "Unknown Lead"}
              </h4>
              {urgency === "overdue" && (
                <Badge variant="accent" size="xs">
                  Overdue
                </Badge>
              )}
              {urgency === "today" && (
                <Badge variant="accent" size="xs">
                  Today
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {lead?.jobTitle} at {lead?.company}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
                {format(new Date(followUp.scheduledDate), "MMM dd, yyyy 'at' h:mm a")}
              </span>
            </div>
            {followUp.notes && (
              <p className="text-sm text-gray-700 mt-2 bg-white bg-opacity-50 rounded p-2">
                {followUp.notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReschedule(followUp)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="Calendar" className="w-4 h-4" />
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => onComplete(followUp.Id)}
          >
            <ApperIcon name="Check" className="w-4 h-4 mr-1" />
            Complete
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => lead && window.open(lead.linkedInUrl, "_blank")}
            className="text-primary-600 hover:text-primary-700"
          >
            <ApperIcon name="ExternalLink" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpItem;