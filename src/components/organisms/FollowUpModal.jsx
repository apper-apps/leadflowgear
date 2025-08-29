import React, { useState } from "react";
import { addDays, startOfToday } from "date-fns";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import DatePicker from "@/components/molecules/DatePicker";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import { cn } from "@/utils/cn";

const FollowUpModal = ({ 
  lead, 
  existingFollowUp = null, 
  onSchedule, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    scheduledDate: existingFollowUp?.scheduledDate 
      ? new Date(existingFollowUp.scheduledDate)
      : addDays(startOfToday(), 1),
    notes: existingFollowUp?.notes || ""
  });
  const [submitting, setSubmitting] = useState(false);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.scheduledDate) {
      return;
    }

    setSubmitting(true);
    try {
      await onSchedule({
        scheduledDate: formData.scheduledDate.getTime(),
        notes: formData.notes.trim(),
        completed: false
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {existingFollowUp ? "Reschedule Follow-up" : "Schedule Follow-up"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </button>
          </div>

          {/* Lead Info */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Avatar
                src={lead.photoUrl}
                alt={lead.name}
                fallback={getInitials(lead.name)}
                size="md"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-600">{lead.jobTitle}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Schedule Date & Time"
              required
            >
              <DatePicker
                value={formData.scheduledDate}
                onChange={(date) => setFormData(prev => ({ ...prev, scheduledDate: date }))}
                placeholder="Select follow-up date and time"
                minDate={startOfToday()}
              />
            </FormField>

            <FormField
              label="Notes (Optional)"
            >
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any notes or reminders for this follow-up..."
                rows={3}
                className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </FormField>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={submitting}
                className="flex-1"
              >
                {existingFollowUp ? "Reschedule" : "Schedule"} Follow-up
              </Button>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-6 p-4 bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg border border-accent-200">
            <div className="flex items-start space-x-3">
              <ApperIcon name="Lightbulb" className="w-5 h-5 text-accent-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-accent-900 mb-1">
                  Follow-up Tips
                </h4>
                <ul className="text-sm text-accent-700 space-y-1">
                  <li>• Schedule within 24-48 hours for hot leads</li>
                  <li>• Add personalized notes from your conversation</li>
                  <li>• Set reminders for important milestones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpModal;