import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * ProtectedRoute — guards authenticated pages. Since auth here is dummy,
 * this simply checks for a user object in AuthContext/localStorage.
 * 🔌 BACKEND HOOK: swap `isAuthenticated` check for real token validation.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
