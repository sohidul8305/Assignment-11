import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoanDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const allLoans = location.state?.loans || [];
  const loan = allLoans.find((l) => l._id === id);

  if (!loan) return <div className="text-center mt-10">Loan not found!</div>;

  const showApplyButton =
    user?.email !== "manager@loanmate.com" && user?.email !== "admin@loanmate.com";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Loan Details</h1>
      <div className="bg-white rounded-xl shadow-md border p-6">
        {loan.image && <img src={loan.image} alt={loan.title} className="w-full h-48 object-cover mb-4 rounded-md" />}
        <h2 className="text-2xl font-bold mb-2">{loan.title}</h2>
        <p className="text-gray-700 mb-2">{loan.shortDesc}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Category:</span> {loan.category}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Interest:</span> {loan.interest}%</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Max Limit:</span> ৳{loan.maxLimit}</p>

        {loan.emiPlans?.length > 0 && (
          <div className="text-gray-600 mb-4">
            <span className="font-semibold">Available EMI Plans:</span>
            <ul className="list-disc list-inside text-gray-700 mt-1">
              {loan.emiPlans.map((plan, idx) => <li key={idx}>{plan}</li>)}
            </ul>
          </div>
        )}

        {loan.features?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {loan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}

        {showApplyButton && (
          <Link
            to="/loan-applications"
            state={{ email: user?.email, title: loan.title, interest: loan.interest }}
          >
            <button className="w-full h-12 mt-4 font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700">
              Apply Now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoanDetails;
