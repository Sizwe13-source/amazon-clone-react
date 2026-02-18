import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
