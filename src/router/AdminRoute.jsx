import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const role =
    user?.email === "admin@loanmate.com"
      ? "admin"
      : user?.email === "manager@loanmate.com"
      ? "manager"
      : "borrower";

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;
