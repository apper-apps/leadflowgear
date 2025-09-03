import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import StatsOverview from "@/components/organisms/StatsOverview";
import PipelineBoard from "@/components/organisms/PipelineBoard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { leadService } from "@/services/api/leadService";
import { followUpService } from "@/services/api/followUpService";
import FollowUpModal from "@/components/organisms/FollowUpModal";
import NewProspectModal from "@/components/organisms/NewProspectModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
const PipelineView = () => {
const [leads, setLeads] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
const [selectedLead, setSelectedLead] = useState(null);
  const [showNewProspectModal, setShowNewProspectModal] = useState(false);
  const [addingLead, setAddingLead] = useState(false);
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [leadsData, followUpsData] = await Promise.all([
        leadService.getAll(),
        followUpService.getAll()
      ]);
      
      setLeads(leadsData);
      setFollowUps(followUpsData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load pipeline data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStageChange = async (leadId, newStage) => {
    try {
      await leadService.update(leadId, { stage: newStage });
      setLeads(prev => prev.map(lead => 
        lead.Id === leadId 
          ? { ...lead, stage: newStage, lastModified: Date.now() }
          : lead
      ));
    } catch (err) {
      console.error("Error updating lead stage:", err);
      toast.error("Failed to update lead stage");
    }
  };

  const handleFollowUp = (lead) => {
    setSelectedLead(lead);
    setShowFollowUpModal(true);
  };

  const handleScheduleFollowUp = async (followUpData) => {
    try {
      const newFollowUp = await followUpService.create({
        leadId: selectedLead.Id,
        ...followUpData
      });
      
      setFollowUps(prev => [...prev, newFollowUp]);
      setShowFollowUpModal(false);
      setSelectedLead(null);
      toast.success("Follow-up scheduled successfully!");
    } catch (err) {
      console.error("Error scheduling follow-up:", err);
      toast.error("Failed to schedule follow-up");
    }
};

const handleAddProspect = async (prospectData) => {
    try {
      setAddingLead(true);
      const newLead = await leadService.create({
        ...prospectData,
        stage: "cold"
      });
      
      setLeads(prev => [newLead, ...prev]);
      setShowNewProspectModal(false);
      toast.success(`${newLead.name} added to pipeline successfully!`);
    } catch (err) {
      console.error("Error adding prospect:", err);
      toast.error("Failed to add prospect. Please try again.");
    } finally {
      setAddingLead(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddProspect();
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Loading type="stats" />
        <Loading type="pipeline" />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (leads.length === 0) {
    return <Empty type="pipeline" />;
  }

  return (
<div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">
          Sales Pipeline
        </h1>
        <p className="text-gray-600">
          Manage your leads and track deal progress through each stage
        </p>
      </div>

      {/* LinkedIn Prospect Addition */}
<div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <ApperIcon name="UserPlus" className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-primary-800">Add New Prospect</h2>
          </div>
<Button
            onClick={() => setShowNewProspectModal(true)}
            className="leadflow-button bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-black font-medium px-6 py-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Prospect
          </Button>
        </div>
        <p className="text-sm text-primary-600">
          <ApperIcon name="Info" className="w-4 h-4 inline mr-1" />
          Add detailed prospect information including contact details, company info, and more. New prospects start in the "Cold Lead" stage.
        </p>
      </div>

      {showNewProspectModal && (
        <NewProspectModal
          isOpen={showNewProspectModal}
          onClose={() => setShowNewProspectModal(false)}
          onSubmit={handleAddProspect}
          loading={addingLead}
        />
      )}

      <StatsOverview leads={leads} followUps={followUps} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <PipelineBoard
          leads={leads}
          onStageChange={handleStageChange}
          onFollowUp={handleFollowUp}
        />
      </div>

      {showFollowUpModal && selectedLead && (
        <FollowUpModal
          lead={selectedLead}
          onSchedule={handleScheduleFollowUp}
          onClose={() => {
            setShowFollowUpModal(false);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
};

export default PipelineView;