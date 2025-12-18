import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

const LoanDetails = ({ user }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const allLoans = location.state?.loans || [];

  // Current loan
  const loan = allLoans.find((l) => l._id === id);

  if (!loan) return <div className="text-center mt-10">Loan not found!</div>;

  const navigateToLoanDetails = (loanId) => {
    navigate(`/loan-details/${loanId}`, { state: { loans: allLoans } });
    window.scrollTo(0, 0);
  };

  const LoanCardStructure = ({ loanData, isCurrent = false, onClickHandler }) => (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border p-6 ${
        isCurrent ? "mb-6 border-blue-500" : "hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      }`}
      onClick={onClickHandler}
    >
      {loanData.image && (
        <img
          src={loanData.image}
          alt={loanData.title}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
      )}
      <h2 className={`text-2xl font-bold mb-2 ${isCurrent ? "text-blue-700" : "text-gray-900"}`}>
        {loanData.title}
      </h2>
      <p className="text-gray-700 mb-2">{loanData.shortDesc}</p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Category:</span> {loanData.category}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Interest:</span> {loanData.interest}%
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Max Limit:</span> ৳{loanData.maxLimit}
      </p>

      {/* EMI Plans */}
      <div className="text-gray-600 mb-4">
        <span className="font-semibold">Available EMI Plans:</span>
        {loanData.emiPlans?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 mt-1">
            {loanData.emiPlans.map((plan, index) => (
              <li key={index}>{plan}</li>
            ))}
          </ul>
        ) : (
          <span className="ml-2">Not available</span>
        )}
      </div>

      {/* Features */}
      {loanData.features?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {loanData.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Apply Now button */}
<Link
  to="/loan-application-form"
  state={{
    email: user?.email,          // optional (email auth থেকেও আসে)
    title: loan.title,
    interest: loan.interest,
  }}
>
  <button className="w-full h-12 mt-4 bg-blue-600 text-white font-semibold hover:bg-blue-700">
    Apply Now
  </button>
</Link>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Loan Details</h1>

      {/* Current Loan */}
      <LoanCardStructure loanData={loan} isCurrent={true} />
    </div>
  );
};

export default LoanDetails;
