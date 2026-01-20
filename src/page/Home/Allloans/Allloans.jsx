import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { 
  FaMoneyBillWave, 
  FaClock, 
  FaStar, 
  FaCalendarAlt,
  FaPercent,
  FaTag,
  FaFilter,
  FaSortAmountDown,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaDollarSign,
  FaMapMarkerAlt,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";

const API = "https://loanmate-nine.vercel.app";

const ExploreLoans = () => {
  const { user } = useAuth();
  
  // ✅ 1. Search state
  const [searchTerm, setSearchTerm] = useState("");
  
  // ✅ 2. Filtering states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(10000000);
  const [minInterest, setMinInterest] = useState(0);
  const [maxInterest, setMaxInterest] = useState(20);
  const [location, setLocation] = useState("all");
  
  // ✅ 3. Sorting state
  const [sortBy, setSortBy] = useState("newest");
  
  // ✅ 4. Pagination state - 6 টি আইটেম প্রতি পৃষ্ঠা
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // ✅ 6 per page
  const [showAll, setShowAll] = useState(false);

  // ✅ Conditional Apply Rendering
  const showApplyButton = user?.email !== "manager@loanmate.com" && user?.email !== "admin@loanmate.com";

  // ✅ Fetch loans data
  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/loans`);
      return data;
    },
  });

  // ✅ Extract unique data for filters
  const categories = ["all", ...new Set(loans.map(loan => loan.category).filter(Boolean))];
  const locations = ["all", ...new Set(loans.map(loan => loan.location || "Online").filter(Boolean))];

  // ✅ Filter and sort loans with all criteria
  const filteredAndSortedLoans = useMemo(() => {
    let filtered = loans;

    // 🔍 1. Search filter
    if (searchTerm) {
      filtered = filtered.filter(loan =>
        loan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🏷️ 2. Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(loan => loan.category === selectedCategory);
    }

    // 💰 3. Amount range filter
    filtered = filtered.filter(loan => 
      loan.maxLimit >= minAmount && loan.maxLimit <= maxAmount
    );

    // 📈 4. Interest rate filter
    filtered = filtered.filter(loan => 
      loan.interest >= minInterest && loan.interest <= maxInterest
    );

    // 📍 5. Location filter
    if (location !== "all") {
      filtered = filtered.filter(loan => 
        (loan.location || "Online").toLowerCase() === location.toLowerCase()
      );
    }

    // 📊 6. Sorting
    switch (sortBy) {
      case "interest-low":
        return [...filtered].sort((a, b) => (a.interest || 0) - (b.interest || 0));
      case "interest-high":
        return [...filtered].sort((a, b) => (b.interest || 0) - (a.interest || 0));
      case "limit-high":
        return [...filtered].sort((a, b) => (b.maxLimit || 0) - (a.maxLimit || 0));
      case "limit-low":
        return [...filtered].sort((a, b) => (a.maxLimit || 0) - (b.maxLimit || 0));
      case "rating-high":
        return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "date-new":
        return [...filtered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case "date-old":
        return [...filtered].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      default:
        return filtered;
    }
  }, [loans, searchTerm, selectedCategory, minAmount, maxAmount, minInterest, maxInterest, location, sortBy]);

  // ✅ 4. Pagination calculation
  const totalItems = filteredAndSortedLoans.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = showAll 
    ? filteredAndSortedLoans 
    : filteredAndSortedLoans.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minAmount, maxAmount, minInterest, maxInterest, location, sortBy]);

  // ✅ Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // First pages
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Last pages
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle pages
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // ✅ Go to specific page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ✅ Generate random rating for demo
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  // ✅ Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Loans</h1>
          <p className="text-gray-600">Loading available loans...</p>
        </div>
        
        {/* Skeleton Filters */}
        <div className="mb-6 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* ✅ 3 columns for 6 items */}
          {[1,2,3,4,5,6].map(i => ( // ✅ 6 skeleton cards
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold mb-4">Error Loading Loans</h2>
          <p className="text-gray-600 mb-6">Unable to fetch loan data. Please try again later.</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Explore <span className="text-primary">Loan Options</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find the perfect loan solution with our advanced filtering and search tools
        </p>
      </div>

      {/* 🔍 1. SEARCH BAR */}
      <div className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search loans by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* 🎛️ 2. FILTERING SECTION */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-primary" />
          <h2 className="text-lg font-semibold">Filter Loans</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Field 1: Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Field 2: Amount Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxAmount}
                onChange={(e) => setMaxAmount(Number(e.target.value))}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Field 3: Interest Rate Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min %"
                value={minInterest}
                onChange={(e) => setMinInterest(Number(e.target.value))}
                min="0"
                max="30"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Max %"
                value={maxInterest}
                onChange={(e) => setMaxInterest(Number(e.target.value))}
                min="0"
                max="30"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Field 4: Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-1" />
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc === "all" ? "All Locations" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Field 5: Items Per Page */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items Per Page
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="6">6 per page</option> {/* ✅ Default is 6 */}
              <option value="12">12 per page</option>
              <option value="18">18 per page</option>
              <option value="24">24 per page</option>
            </select>
          </div>
        </div>

        {/* Category Chips for quick selection */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaTag className="inline mr-1 text-xs" />
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header with Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-600">
            Showing <span className="font-bold text-primary">
              {showAll ? totalItems : `${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, totalItems)}`}
            </span> of <span className="font-bold">{totalItems}</span> loans
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* 📊 3. SORTING OPTIONS */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaSortAmountDown className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest First</option>
              <option value="date-old">Oldest First</option>
              <option value="interest-low">Interest: Low to High</option>
              <option value="interest-high">Interest: High to Low</option>
              <option value="limit-low">Amount: Low to High</option>
              <option value="limit-high">Amount: High to Low</option>
              <option value="rating-high">Highest Rated</option>
            </select>
          </div>

          {/* Show All Toggle */}
          <button
            onClick={() => {
              setShowAll(!showAll);
              if (!showAll) setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showAll 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showAll ? "Show Pagination" : "Show All"}
          </button>
        </div>
      </div>

      {/* Loan Cards Grid - Updated for 6 items */}
      {currentItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow border">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-4">No Loans Found</h3>
          <p className="text-gray-600 mb-6">
            No loans match your search criteria. Try adjusting your filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setMinAmount(0);
              setMaxAmount(10000000);
              setMinInterest(0);
              setMaxInterest(20);
              setLocation("all");
              setSortBy("newest");
              setCurrentPage(1);
            }}
            className="btn btn-primary"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"> {/* ✅ 3 columns for 6 items */}
            {currentItems.map((loan) => (
              <div
                key={loan._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  {loan.image ? (
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <FaMoneyBillWave className="text-5xl text-primary/40" />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {loan.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                        {loan.category}
                      </span>
                    </div>
                  )}

                  {/* Interest Rate Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded flex items-center gap-1">
                      <FaPercent className="text-xs" />
                      {loan.interest || "0"}%
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {loan.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {loan.description || "Instant approval with minimal documentation"}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Max Amount:</span>
                      <span className="font-bold">৳{loan.maxLimit?.toLocaleString() || "0"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Processing:</span>
                      <span className="font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Rating:</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="font-medium">{getRandomRating()}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Location:</span>
                      <span className="font-medium">{loan.location || "Online"}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link to={`/loan-details/${loan._id}`} state={{ loans }}>
                      <button className="btn btn-primary w-full">
                        View Details
                      </button>
                    </Link>
                    
                    {showApplyButton && (
                      <Link to={`/loan-applications`}>
                        <button className="btn btn-outline btn-primary w-full">
                          Quick Apply
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📄 4. PAGINATION - Enhanced */}
          {!showAll && totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600">
                  Page <span className="font-bold text-primary">{currentPage}</span> of <span className="font-bold">{totalPages}</span> • 
                  <span className="text-primary font-bold ml-2">
                    {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
                  </span>
                </p>
              </div>
              
              <div className="flex items-center gap-1 mb-4 md:mb-0">
                {/* First Page Button */}
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  title="First Page"
                >
                  <FaAngleDoubleLeft />
                </button>

                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  title="Previous Page"
                >
                  <FaChevronLeft />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-primary text-white font-bold'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                ))}

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  title="Next Page"
                >
                  <FaChevronRight />
                </button>

                {/* Last Page Button */}
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  title="Last Page"
                >
                  <FaAngleDoubleRight />
                </button>
              </div>

              {/* Items Per Page Selector */}
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="6">6 per page</option>
                    <option value="12">12 per page</option>
                    <option value="18">18 per page</option>
                    <option value="24">24 per page</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Show All Button (when paginated) */}
          {!showAll && totalItems > itemsPerPage && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(true)}
                className="btn btn-outline btn-primary"
              >
                Show All {totalItems} Loans
              </button>
            </div>
          )}
        </>
      )}

      {/* Footer Note */}
      <div className="mt-12 text-center text-gray-600">
        <p>
          Need help choosing?{" "}
          <Link to="/contact" className="text-primary hover:underline font-medium">
            Contact our loan advisors
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ExploreLoans;