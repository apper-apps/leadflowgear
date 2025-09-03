import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const StageColumn = ({ 
  stage, 
  leads, 
  isDragOver, 
  onDragOver, 
  onDrop, 
  onDragLeave,
  renderLead 
}) => {
const getStageIcon = (stageKey) => {
    const icons = {
      cold: "Snowflake",
      hot: "Flame",
      nurturing: "UserCheck",
      estimate: "FileText",
      negotiating: "Handshake",
      closed: "CheckCircle"
    };
    return icons[stageKey] || "Circle";
  };

  return (
    <div
      className={cn(
        "pipeline-column bg-white rounded-xl p-4 shadow-card border-2 border-dashed border-transparent",
        isDragOver && "drag-over"
      )}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center",
            stage.color
          )}>
            <ApperIcon name={getStageIcon(stage.key)} className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{stage.label}</h3>
            <Badge variant="default" size="xs">
              {stage.count} leads
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-3 min-h-[300px]">
        {leads.length > 0 ? (
          leads.map(renderLead)
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className={cn(
              "w-16 h-16 rounded-full bg-gradient-to-r mb-4 flex items-center justify-center opacity-20",
              stage.color
            )}>
              <ApperIcon name={getStageIcon(stage.key)} className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-500 mb-2">No leads in this stage</p>
            <p className="text-xs text-gray-400">
              Drag leads here or add new ones
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StageColumn;