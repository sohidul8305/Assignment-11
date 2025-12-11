// Loandetails.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

const Loandetails = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loan = location.state?.loan;

  if (!loan) return <div className="text-center mt-10">Loan not found!</div>;

  const handleApply = () => {
    if (!user) navigate("/login");
    else if (user.role === "Admin" || user.role === "Manager")
      alert("Admins or Managers cannot apply for loans.");
    else navigate(`/apply-loan/${loan._id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border p-6">
        <img src={loan.image} alt={loan.title} className="w-full h-64 object-cover mb-4 rounded-md" />
        <h1 className="text-3xl font-bold mb-4">{loan.title}</h1>
        <p className="text-gray-700 mb-2">{loan.
shortDesc}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Category:</span> {loan.category}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Interest Rate:</span> {loan.interest}%</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Max Limit:</span> ৳{loan.maxLimit}</p>
        <p className="text-gray-600 mb-4"><span className="font-semibold">Available EMI Plans:</span> {loan.emiPlans?.join(", ")}</p>
        {loan.features?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Features:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {loan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}
<Link
  to="/loan-application-form" 
  state={{ 
    loanInfo: { 
      title: loan.title, 
      interest: loan.interest 
    } 
  }}
>
  <button className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
    Apply Now
  </button>
</Link>


      </div>
    </div>
  );
};

export default Loandetails;
