import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import { followUpService } from "@/services/api/followUpService";

const Layout = ({ children }) => {
  const [followUpCount, setFollowUpCount] = useState(0);

  useEffect(() => {
    const loadFollowUps = async () => {
      try {
        const followUps = await followUpService.getAll();
        const pendingCount = followUps.filter(f => !f.completed).length;
        setFollowUpCount(pendingCount);
      } catch (error) {
        console.error("Error loading follow-ups:", error);
      }
    };

    loadFollowUps();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-200">
      <Header followUpCount={followUpCount} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;