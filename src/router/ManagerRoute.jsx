import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const role =
    user?.email === "manager@loanmate.com" ? "manager" : "borrower";

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (role !== "manager") {
    return <Navigate to="/dashboard/my-loans" replace />;
  }

  return children;
};

export default ManagerRoute;
