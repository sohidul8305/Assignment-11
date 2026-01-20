import React, { useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { 
  FaStar, 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaFileAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaShareAlt,
  FaDownload
} from "react-icons/fa";

const LoanDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const allLoans = location.state?.loans || [];
  const loan = allLoans.find((l) => l._id === id);

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4">Loan Not Found</h2>
          <p className="text-gray-600 mb-6">The requested loan could not be found.</p>
          <button
            onClick={() => navigate("/all-loans")}
            className="btn btn-primary"
          >
            Browse Loans
          </button>
        </div>
      </div>
    );
  }

  const showApplyButton = user?.email !== "manager@loanmate.com" && user?.email !== "admin@loanmate.com";

  // Mock images for gallery
  const loanImages = [
    loan.image || "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  // Mock reviews
  const reviews = [
    { rating: 5, comment: "Great service, quick approval!", user: "Rajesh K.", date: "2 weeks ago" },
    { rating: 4, comment: "Good interest rates.", user: "Priya S.", date: "1 month ago" }
  ];

  // Related loans
  const relatedLoans = allLoans
    .filter(l => l._id !== id && l.category === loan.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {loan.category}
                </span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="font-medium">4.5</span>
                  <span className="text-gray-500 text-sm">(12 reviews)</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{loan.title}</h1>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-3">
                {loanImages.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt={`${loan.title} ${idx + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-6">
                {["overview", "specs", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 font-medium text-sm md:text-base ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === "overview" ? "Overview" : 
                     tab === "specs" ? "Specifications" : "Reviews"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {loan.shortDesc || "Get quick funding with competitive rates and flexible repayment options."}
                    </p>
                  </div>

                  {loan.features?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {loan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {loan.emiPlans?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">EMI Plans</h3>
                      <div className="bg-base-200 rounded-xl p-4">
                        <div className="space-y-2">
                          {loan.emiPlans.map((plan, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span>{plan}</span>
                              <span className="font-semibold">Available</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === "specs" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-base-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaMoneyBillWave className="text-primary" />
                        <h4 className="font-semibold">Interest Rate</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary">{loan.interest}%</p>
                    </div>

                    <div className="bg-base-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaMoneyBillWave className="text-primary" />
                        <h4 className="font-semibold">Max Amount</h4>
                      </div>
                      <p className="text-2xl font-bold">৳{loan.maxLimit?.toLocaleString()}</p>
                    </div>

                    <div className="bg-base-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCalendarAlt className="text-primary" />
                        <h4 className="font-semibold">Processing Time</h4>
                      </div>
                      <p className="text-lg font-semibold">24-48 hours</p>
                    </div>

                    <div className="bg-base-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaFileAlt className="text-primary" />
                        <h4 className="font-semibold">Documents</h4>
                      </div>
                      <p className="text-lg font-semibold">Minimal</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Eligibility Criteria</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Age: 21-65 years</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Minimum income: ৳25,000/month</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Credit score: 650+</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Employment: 1+ years</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar key={idx} className="fill-current" />
                          ))}
                        </div>
                        <span className="font-bold">4.5/5</span>
                      </div>
                      <p className="text-gray-500 text-sm">Based on 12 reviews</p>
                    </div>
                    <button className="btn btn-primary btn-sm">Write Review</button>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-bold text-xs">{review.user.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-semibold">{review.user}</p>
                              <div className="flex items-center gap-1">
                                <div className="flex text-yellow-500">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} className="w-3 h-3 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-base-100 border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="text-2xl font-bold text-primary">{loan.interest}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Max Amount</span>
                  <span className="text-xl font-bold">৳{loan.maxLimit?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Processing</span>
                  <span className="font-semibold">24-48 hours</span>
                </div>
              </div>

              {showApplyButton ? (
                <Link
                  to="/loan-applications"
                  state={{ email: user?.email, title: loan.title, interest: loan.interest }}
                >
                  <button className="btn btn-primary w-full mb-3">
                    Apply Now
                  </button>
                </Link>
              ) : (
                <button className="btn btn-primary w-full mb-3" disabled>
                  Apply Now
                </button>
              )}

              <div className="flex gap-2">
                <button className="btn btn-outline flex-1 gap-2">
                  <FaDownload />
                  Download
                </button>
                <button className="btn btn-outline flex-1 gap-2">
                  <FaShareAlt />
                  Share
                </button>
              </div>
            </div>

            {/* Related Loans */}
            {relatedLoans.length > 0 && (
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Similar Loans</h3>
                <div className="space-y-4">
                  {relatedLoans.map((related) => (
                    <Link
                      key={related._id}
                      to={`/loan-details/${related._id}`}
                      state={{ loans: allLoans }}
                      className="block hover:bg-base-200 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FaMoneyBillWave className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{related.title}</p>
                          <p className="text-xs text-gray-500">
                            {related.interest}% • ৳{related.maxLimit?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Approval Rate</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Customer Support</span>
                  <span className="font-semibold">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Disbursement</span>
                  <span className="font-semibold">Fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;