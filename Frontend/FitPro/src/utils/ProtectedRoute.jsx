import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // ❌ Admin should NOT access user pages
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // ✅ Normal user allowed
  return children;
}
