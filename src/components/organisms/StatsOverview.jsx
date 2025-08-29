import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatsOverview = ({ leads, followUps, className }) => {
  const totalLeads = leads.length;
  const closedDeals = leads.filter(lead => lead.stage === "closed").length;
  const pendingFollowUps = followUps.filter(f => !f.completed).length;
  const conversionRate = totalLeads > 0 ? Math.round((closedDeals / totalLeads) * 100) : 0;

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: "Users",
      color: "from-primary-500 to-primary-600",
      change: "+12%"
    },
    {
      label: "Closed Deals",
      value: closedDeals,
      icon: "CheckCircle",
      color: "from-success-500 to-success-600",
      change: "+8%"
    },
    {
      label: "Pending Follow-ups",
      value: pendingFollowUps,
      icon: "Clock",
      color: "from-accent-500 to-accent-600",
      change: "-3"
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: "TrendingUp",
      color: "from-purple-500 to-purple-600",
      change: "+5%"
    }
  ];

  return (
    <div className={cn("grid grid-cols-4 gap-6", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-card border border-gray-100 hover:shadow-card-hover transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-sm font-medium",
                  stat.change.startsWith("+") ? "text-success-600" : "text-accent-600"
                )}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  vs last month
                </span>
              </div>
            </div>
            <div className={cn(
              "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center",
              stat.color
            )}>
              <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;