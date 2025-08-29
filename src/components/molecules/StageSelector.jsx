import React from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const stages = [
  { key: "cold", label: "Cold Lead", color: "cold", description: "New prospects not contacted yet" },
  { key: "hot", label: "Hot Lead", color: "hot", description: "Interested prospects actively engaging" },
  { key: "estimate", label: "Estimate Sent", color: "estimate", description: "Proposals sent, waiting for response" },
  { key: "closed", label: "Deal Closed", color: "closed", description: "Successfully converted customers" }
];

const StageSelector = ({ 
  selectedStage, 
  onStageSelect, 
  className,
  showDescriptions = true 
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {stages.map((stage) => (
        <div
          key={stage.key}
          onClick={() => onStageSelect(stage.key)}
          className={cn(
            "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
            "hover:border-primary-500 hover:shadow-md transform hover:scale-102",
            selectedStage === stage.key
              ? "border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 shadow-md"
              : "border-gray-200 bg-white hover:bg-gray-50"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant={stage.color} size="md">
                {stage.label}
              </Badge>
              {selectedStage === stage.key && (
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 animate-pulse" />
              )}
            </div>
          </div>
          {showDescriptions && (
            <p className="text-sm text-gray-600 mt-2">
              {stage.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StageSelector;