import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FollowUpItem from "@/components/organisms/FollowUpItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { followUpService } from "@/services/api/followUpService";
import { leadService } from "@/services/api/leadService";
import FollowUpModal from "@/components/organisms/FollowUpModal";
import { format, isToday, isBefore, startOfDay } from "date-fns";

const FollowUpsView = () => {
  const [followUps, setFollowUps] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [followUpsData, leadsData] = await Promise.all([
        followUpService.getAll(),
        leadService.getAll()
      ]);
      
      setFollowUps(followUpsData);
      setLeads(leadsData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load follow-ups. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCompleteFollowUp = async (followUpId) => {
    try {
      await followUpService.update(followUpId, { completed: true });
      setFollowUps(prev => prev.map(f => 
        f.Id === followUpId ? { ...f, completed: true } : f
      ));
      toast.success("Follow-up marked as complete!");
    } catch (err) {
      console.error("Error completing follow-up:", err);
      toast.error("Failed to complete follow-up");
    }
  };

  const handleReschedule = (followUp) => {
    const lead = leads.find(l => l.Id === followUp.leadId);
    setSelectedFollowUp({ ...followUp, lead });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = async (followUpData) => {
    try {
      await followUpService.update(selectedFollowUp.Id, followUpData);
      setFollowUps(prev => prev.map(f => 
        f.Id === selectedFollowUp.Id ? { ...f, ...followUpData } : f
      ));
      setShowRescheduleModal(false);
      setSelectedFollowUp(null);
      toast.success("Follow-up rescheduled successfully!");
    } catch (err) {
      console.error("Error rescheduling follow-up:", err);
      toast.error("Failed to reschedule follow-up");
    }
  };

  const getFilteredFollowUps = () => {
    const activeFollowUps = followUps.filter(f => !f.completed);
    
    switch (filter) {
      case "overdue":
        return activeFollowUps.filter(f => 
          isBefore(startOfDay(new Date(f.scheduledDate)), startOfDay(new Date()))
        );
      case "today":
        return activeFollowUps.filter(f => 
          isToday(new Date(f.scheduledDate))
        );
      case "upcoming":
        return activeFollowUps.filter(f => {
          const date = startOfDay(new Date(f.scheduledDate));
          const today = startOfDay(new Date());
          return !isBefore(date, today) && !isToday(new Date(f.scheduledDate));
        });
      case "completed":
        return followUps.filter(f => f.completed);
      default:
        return activeFollowUps;
    }
  };

  const filteredFollowUps = getFilteredFollowUps();

  const filters = [
    { key: "all", label: "All Active", count: followUps.filter(f => !f.completed).length },
    { key: "overdue", label: "Overdue", count: followUps.filter(f => !f.completed && isBefore(startOfDay(new Date(f.scheduledDate)), startOfDay(new Date()))).length },
    { key: "today", label: "Today", count: followUps.filter(f => !f.completed && isToday(new Date(f.scheduledDate))).length },
    { key: "upcoming", label: "Upcoming", count: followUps.filter(f => !f.completed && !isBefore(startOfDay(new Date(f.scheduledDate)), startOfDay(new Date())) && !isToday(new Date(f.scheduledDate))).length },
    { key: "completed", label: "Completed", count: followUps.filter(f => f.completed).length }
  ];

  if (loading) {
    return <Loading type="followups" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (followUps.length === 0) {
    return <Empty type="followups" action={() => window.location.href = "/pipeline"} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">
            Follow-ups
          </h1>
          <p className="text-gray-600">
            Stay on top of your scheduled follow-ups and never miss an opportunity
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {filters.map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === filterOption.key
                ? "bg-white text-primary-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50"
            }`}
          >
            {filterOption.label}
            {filterOption.count > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full">
                {filterOption.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Follow-ups List */}
      {filteredFollowUps.length > 0 ? (
        <div className="space-y-4">
          {filteredFollowUps
            .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
            .map((followUp) => {
              const lead = leads.find(l => l.Id === followUp.leadId);
              return (
                <FollowUpItem
                  key={followUp.Id}
                  followUp={followUp}
                  lead={lead}
                  onComplete={handleCompleteFollowUp}
                  onReschedule={handleReschedule}
                />
              );
            })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Clock" className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {filter === "all" ? "active" : filter} follow-ups
          </h3>
          <p className="text-gray-600">
            {filter === "completed" 
              ? "You haven't completed any follow-ups yet."
              : "You're all caught up! Great work staying on top of your leads."
            }
          </p>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedFollowUp && (
        <FollowUpModal
          lead={selectedFollowUp.lead}
          existingFollowUp={selectedFollowUp}
          onSchedule={handleRescheduleSubmit}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedFollowUp(null);
          }}
        />
      )}
    </div>
  );
};

export default FollowUpsView;