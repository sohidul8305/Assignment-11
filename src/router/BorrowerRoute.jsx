import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BorrowerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const role =
    user?.email === "manager@loanmate.com" ? "manager" : "borrower";

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (role !== "borrower") {
    return <Navigate to="/dashboard/add-loan" replace />;
  }

  return children;
};

export default BorrowerRoute;
