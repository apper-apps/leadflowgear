import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import PipelineView from "@/components/pages/PipelineView";
import FollowUpsView from "@/components/pages/FollowUpsView";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-200">
      <Layout>
        <Routes>
          <Route path="/" element={<PipelineView />} />
          <Route path="/pipeline" element={<PipelineView />} />
          <Route path="/followups" element={<FollowUpsView />} />
        </Routes>
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;