import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const LoanDetails = ({ user }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const allLoans = location.state?.loans || [];

  // Current loan
  const loan = allLoans.find((l) => l._id === id);

  if (!loan) return <div className="text-center mt-10">Loan not found!</div>;

  const handleApply = () => {
    if (!user) return navigate("/login");
    if (user.role === "Admin" || user.role === "Manager") {
      alert("Admins or Managers cannot apply.");
      return;
    }
    navigate(`/apply-loan/${loan._id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Loan Details</h1>

      {/* Current Loan */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border p-6 mb-6">
        {loan.image && (
          <img
            src={loan.image}
            alt={loan.title}
            className="w-full h-64 object-cover mb-4 rounded-md"
          />
        )}
        <h2 className="text-2xl font-bold mb-2">{loan.title}</h2>
        <p className="text-gray-700 mb-2">{loan.shortDesc}</p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Category:</span> {loan.category}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Interest:</span> {loan.interest}%
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Max Limit:</span> ৳{loan.maxLimit}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Available EMI Plans:</span> {loan.emiPlans?.join(", ")}
        </p>
        {loan.features?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {loan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Apply Now Button */}
        <button
          onClick={handleApply}
          className="w-full h-12 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LoanDetails;
