import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { 
  FaMoneyBillWave, 
  FaClock, 
  FaStar, 
  FaCalendarAlt, 
  FaPercent,
  FaArrowRight,
  FaFilter,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

// API call
const fetchLoans = async () => {
  const res = await axios.get("https://loanmate-nine.vercel.app/loans");
  return res.data;
};

const Available = () => {
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const loansPerPage = 6; // ✅ Changed from 4 to 6

  const {
    data: loans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["available-loans"],
    queryFn: fetchLoans,
  });

  // Apply filters
  useEffect(() => {
    let filtered = [...loans];
    
    if (activeFilter === "low-interest") {
      filtered = filtered.sort((a, b) => (a.interest || 0) - (b.interest || 0));
    } else if (activeFilter === "high-limit") {
      filtered = filtered.sort((a, b) => (b.maxLimit || 0) - (a.maxLimit || 0));
    } else if (activeFilter === "business") {
      filtered = filtered.filter(loan => loan.category?.toLowerCase().includes("business"));
    } else if (activeFilter === "personal") {
      filtered = filtered.filter(loan => loan.category?.toLowerCase().includes("personal"));
    }
    
    setFilteredLoans(filtered);
  }, [loans, activeFilter]);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-error mb-4">Error Loading Loans</h2>
          <p className="text-base-content/70 mb-6">Unable to fetch loan data. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);
  const startIndex = currentPage * loansPerPage;
  const endIndex = startIndex + loansPerPage;
  const currentLoans = filteredLoans.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Go to specific page
  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate random rating for demo
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        // First pages
        for (let i = 0; i < 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        // Last pages
        pageNumbers.push(0);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 4; i < totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle pages
        pageNumbers.push(0);
        pageNumbers.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages - 1);
      }
    }
    
    return pageNumbers;
  };

  return (
    <section className="py-16 md:py-24 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">POPULAR LOANS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            Available <span className="text-primary">Loan Options</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
            Choose from our curated selection of popular loan products with competitive rates
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => {
              setActiveFilter("all");
              setCurrentPage(0);
            }}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "all"
                ? 'bg-primary text-white shadow-lg'
                : 'bg-base-200 hover:bg-base-300'
            }`}
          >
            <FaFilter className="text-sm" />
            All Loans
          </button>
          <button
            onClick={() => {
              setActiveFilter("low-interest");
              setCurrentPage(0);
            }}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "low-interest"
                ? 'bg-primary text-white shadow-lg'
                : 'bg-base-200 hover:bg-base-300'
            }`}
          >
            <FaPercent className="text-sm" />
            Low Interest
          </button>
          <button
            onClick={() => {
              setActiveFilter("high-limit");
              setCurrentPage(0);
            }}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "high-limit"
                ? 'bg-primary text-white shadow-lg'
                : 'bg-base-200 hover:bg-base-300'
            }`}
          >
            <FaMoneyBillWave className="text-sm" />
            High Limit
          </button>
          <button
            onClick={() => {
              setActiveFilter("business");
              setCurrentPage(0);
            }}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "business"
                ? 'bg-primary text-white shadow-lg'
                : 'bg-base-200 hover:bg-base-300'
            }`}
          >
            💼 Business
          </button>
          <button
            onClick={() => {
              setActiveFilter("personal");
              setCurrentPage(0);
            }}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "personal"
                ? 'bg-primary text-white shadow-lg'
                : 'bg-base-200 hover:bg-base-300'
            }`}
          >
            👤 Personal
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-base-content/70">
            Showing <span className="font-bold text-primary">{startIndex + 1}-{Math.min(endIndex, filteredLoans.length)}</span> of <span className="font-bold text-primary">{filteredLoans.length}</span> loans
            {activeFilter !== "all" && ` (${activeFilter.replace("-", " ")})`}
          </p>
          
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-base-content/70">Show:</span>
            <select 
              value={loansPerPage}
              onChange={(e) => {
                // If you want to make it dynamic
                // setLoansPerPage(Number(e.target.value));
                // setCurrentPage(0);
              }}
              className="select select-bordered select-sm"
            >
              <option value="6">6 per page</option>
              <option value="12">12 per page</option>
              <option value="24">24 per page</option>
            </select>
          </div>
        </div>

        {/* Loan Cards Grid - Updated to show 6 cards properly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentLoans.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-base-200 rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4">No Loans Found</h3>
              <p className="text-base-content/70 mb-6">No loans match your filter criteria</p>
              <button
                onClick={() => setActiveFilter("all")}
                className="btn btn-primary"
              >
                Show All Loans
              </button>
            </div>
          ) : (
            currentLoans.map((loan) => (
              <div
                key={loan._id}
                className="bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 card-hover"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  {loan.image ? (
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <FaMoneyBillWave className="text-6xl text-primary/50" />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {loan.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full">
                        {loan.category}
                      </span>
                    </div>
                  )}

                  {/* Interest Rate Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold rounded-full flex items-center gap-1">
                      <FaPercent className="text-xs" />
                      {loan.interest || "0"}%
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2">
                    {loan.title || "Loan Title"}
                  </h3>

                  {/* Short Description */}
                  <p className="text-base-content/70 mb-4 line-clamp-2 text-sm">
                    {loan.shortDesc || "Get instant approval with minimal documentation"}
                  </p>

                  {/* Meta Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Max Limit */}
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary" />
                      <div>
                        <p className="text-xs text-base-content/60">Max Amount</p>
                        <p className="font-bold">৳{loan.maxLimit?.toLocaleString() || "0"}</p>
                      </div>
                    </div>

                    {/* Processing Time */}
                    <div className="flex items-center gap-2">
                      <FaClock className="text-primary" />
                      <div>
                        <p className="text-xs text-base-content/60">Processing</p>
                        <p className="font-bold">24-48 hrs</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <div>
                        <p className="text-xs text-base-content/60">Rating</p>
                        <div className="flex items-center gap-1">
                          <span className="font-bold">{getRandomRating()}</span>
                          <span className="text-xs text-base-content/60">/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Date Added */}
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary" />
                      <div>
                        <p className="text-xs text-base-content/60">Added</p>
                        <p className="font-bold">Recently</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={`/available-details/${loan._id}`} state={{ loan }}>
                    <button className="btn btn-primary w-full rounded-xl flex items-center justify-center gap-2 group">
                      <span>View Details</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            {/* Page Info */}
            <div className="text-base-content/70">
              Page <span className="font-bold">{currentPage + 1}</span> of <span className="font-bold">{totalPages}</span>
            </div>
            
            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="btn btn-circle btn-outline btn-sm disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              
              <div className="flex gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        currentPage === pageNum
                          ? 'bg-primary text-white font-bold'
                          : 'bg-base-200 hover:bg-base-300'
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  )
                ))}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="btn btn-circle btn-outline btn-sm disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
            
            {/* Items Per Page (Optional) */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/70">Items per page:</span>
              <span className="font-bold">{loansPerPage}</span>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-6">
              Need a Custom Loan Solution?
            </h3>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
              Can't find what you're looking for? Our loan specialists can create a personalized solution for your unique needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/all-loans">
                <button className="btn btn-primary btn-lg rounded-full px-8">
                  View All Loans
                </button>
              </Link>
              <Link to="/contact">
                <button className="btn btn-outline btn-lg rounded-full px-8">
                  Contact Advisor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Available;