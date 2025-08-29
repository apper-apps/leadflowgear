import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LeadCard from "@/components/organisms/LeadCard";
import StageColumn from "@/components/organisms/StageColumn";
import { cn } from "@/utils/cn";

const PipelineBoard = ({ leads, onStageChange, onFollowUp, className }) => {
  const [draggedLead, setDraggedLead] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const stages = [
    { key: "cold", label: "Cold Lead", color: "from-blue-500 to-blue-600", count: 0 },
    { key: "hot", label: "Hot Lead", color: "from-red-500 to-red-600", count: 0 },
    { key: "estimate", label: "Estimate Sent", color: "from-yellow-500 to-yellow-600", count: 0 },
    { key: "closed", label: "Deal Closed", color: "from-green-500 to-green-600", count: 0 }
  ];

  // Count leads in each stage
  const stagesWithCounts = stages.map(stage => ({
    ...stage,
    count: leads.filter(lead => lead.stage === stage.key).length
  }));

  const handleDragStart = (lead) => {
    setDraggedLead(lead);
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, stageKey) => {
    e.preventDefault();
    setDragOverColumn(stageKey);
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedLead && draggedLead.stage !== newStage) {
      onStageChange(draggedLead.Id, newStage);
      toast.success(`${draggedLead.name} moved to ${stages.find(s => s.key === newStage)?.label}`);
    }
    
    setDraggedLead(null);
  };

  return (
    <div className={cn("grid grid-cols-4 gap-6 h-full", className)}>
      {stagesWithCounts.map((stage) => (
        <StageColumn
          key={stage.key}
          stage={stage}
          leads={leads.filter(lead => lead.stage === stage.key)}
          isDragOver={dragOverColumn === stage.key}
          onDragOver={(e) => handleDragOver(e, stage.key)}
          onDrop={(e) => handleDrop(e, stage.key)}
          onDragLeave={() => setDragOverColumn(null)}
          renderLead={(lead) => (
            <LeadCard
              key={lead.Id}
              lead={lead}
              onDragStart={() => handleDragStart(lead)}
              onDragEnd={handleDragEnd}
              onStageChange={(newStage) => onStageChange(lead.Id, newStage)}
              onFollowUp={() => onFollowUp(lead)}
              isDragging={draggedLead?.Id === lead.Id}
            />
          )}
        />
      ))}
    </div>
  );
};

export default PipelineBoard;