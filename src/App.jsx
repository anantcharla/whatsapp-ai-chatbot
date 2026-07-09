import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Chat from "./pages/Chat.jsx";
import Analytics from "./pages/Analytics.jsx";
import KnowledgeBase from "./pages/KnowledgeBase.jsx";
import Broadcast from "./pages/Broadcast.jsx";
import PromptManagement from "./pages/PromptManagement.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * App — top-level route table.
 * Public: /login
 * Protected (wrapped in DashboardLayout): dashboard, chat, analytics,
 * knowledge-base, broadcast, prompts, settings, profile.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/broadcast" element={<Broadcast />} />
        <Route path="/prompts" element={<PromptManagement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
