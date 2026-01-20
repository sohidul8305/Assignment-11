import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  FaFileAlt, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaSortAmountDown,
  FaSearch,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPercent,
  FaUser,
  FaBuilding,
  FaHome,
  FaGraduationCap,
  FaCar,
  FaCreditCard,
  FaChartLine,
  FaExclamationTriangle
} from 'react-icons/fa';

const API = "https://loanmate-nine.vercel.app";

const Myapplication = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedLoans, setSelectedLoans] = useState([]);

  // Fetch user's loan applications
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['my-applications'],
    queryFn: async () => {
      // In real app, you would fetch by user ID
      const { data } = await axios.get(`${API}/applications`);
      return data.filter(app => app.borrowerEmail === localStorage.getItem('userEmail') || 
                                app.borrowerName === 'Ikram Hossain');
    },
  });

  // Fetch available loans
  const { data: loans = [] } = useQuery({
    queryKey: ['available-loans'],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/loans`);
      return data;
    },
  });

  // Filter and sort applications
  const filteredAndSortedApplications = applications
    .filter(app => {
      if (filterStatus === 'all') return true;
      return app.status === filterStatus;
    })
    .filter(app => {
      if (!searchTerm) return true;
      return (
        app.loanName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.loanId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.borrowerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.applicationDate || 0) - new Date(a.applicationDate || 0);
        case 'oldest':
          return new Date(a.applicationDate || 0) - new Date(b.applicationDate || 0);
        case 'amount-high':
          return (b.loanAmount || 0) - (a.loanAmount || 0);
        case 'amount-low':
          return (a.loanAmount || 0) - (b.loanAmount || 0);
        default:
          return 0;
      }
    });

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    disbursed: applications.filter(app => app.status === 'disbursed').length,
    totalAmount: applications.reduce((sum, app) => sum + (app.loanAmount || 0), 0)
  };

  // Handle application actions
  const handleViewDetails = (application) => {
    console.log('View details:', application);
    // Navigate to application details page
  };

  const handleEditApplication = (application) => {
    console.log('Edit application:', application);
    // Open edit modal or navigate to edit page
  };

  const handleWithdrawApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        await axios.delete(`${API}/applications/${applicationId}`);
        toast.success('Application withdrawn successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to withdraw application');
      }
    }
  };

  const handleDownloadDocuments = (application) => {
    // Generate and download application documents
    console.log('Download documents for:', application);
  };

  const handleSelectLoan = (loanId) => {
    setSelectedLoans(prev => 
      prev.includes(loanId) 
        ? prev.filter(id => id !== loanId)
        : [...prev, loanId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLoans.length === filteredAndSortedApplications.length) {
      setSelectedLoans([]);
    } else {
      setSelectedLoans(filteredAndSortedApplications.map(app => app._id));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedLoans.length === 0) {
      toast.error('Please select at least one application');
      return;
    }

    if (action === 'withdraw') {
      if (window.confirm(`Withdraw ${selectedLoans.length} selected applications?`)) {
        // Bulk withdraw logic
        selectedLoans.forEach(id => handleWithdrawApplication(id));
        setSelectedLoans([]);
      }
    }
  };

  // Get loan icon based on type
  const getLoanIcon = (loanType) => {
    switch (loanType?.toLowerCase()) {
      case 'business':
        return <FaBuilding className="text-blue-500" />;
      case 'personal':
        return <FaUser className="text-green-500" />;
      case 'home':
        return <FaHome className="text-purple-500" />;
      case 'education':
        return <FaGraduationCap className="text-yellow-500" />;
      case 'car':
        return <FaCar className="text-red-500" />;
      default:
        return <FaCreditCard className="text-gray-500" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge badge-success gap-1"><FaCheckCircle /> Approved</span>;
      case 'pending':
        return <span className="badge badge-warning gap-1"><FaClock /> Pending</span>;
      case 'rejected':
        return <span className="badge badge-error gap-1"><FaTimesCircle /> Rejected</span>;
      case 'disbursed':
        return <span className="badge badge-info gap-1"><FaMoneyBillWave /> Disbursed</span>;
      default:
        return <span className="badge badge-ghost">{status}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Loan Applications</h1>
          <p className="text-gray-600">Track and manage all your loan applications in one place</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/available">
            <button className="btn btn-primary gap-2">
              <FaCreditCard /> Apply for New Loan
            </button>
          </Link>
          <Link to="/calculator">
            <button className="btn btn-outline btn-primary gap-2">
              <FaChartLine /> Loan Calculator
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="card bg-white shadow">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <FaFileAlt className="text-blue-600" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-xs text-gray-500">All Applications</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <h3 className="text-2xl font-bold">{stats.pending}</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <FaClock className="text-yellow-600" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-xs text-gray-500">Under Review</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Approved</p>
                <h3 className="text-2xl font-bold">{stats.approved}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <FaCheckCircle className="text-green-600" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-xs text-gray-500">Successful</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Rejected</p>
                <h3 className="text-2xl font-bold">{stats.rejected}</h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <FaTimesCircle className="text-red-600" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-xs text-gray-500">Not Approved</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Disbursed</p>
                <h3 className="text-2xl font-bold">{stats.disbursed}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <FaMoneyBillWave className="text-purple-600" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-xs text-gray-500">Amount Received</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Amount</p>
                <h3 className="text-2xl font-bold">৳{stats.totalAmount.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <FaCreditCard className="text-indigo-600" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-xs text-gray-500">Applied For</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by loan name, ID, or borrower..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  className="select select-bordered w-full"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="disbursed">Disbursed</option>
                </select>
              </div>
            </div>

            {/* Sort */}
            <div>
              <div className="flex items-center gap-2">
                <FaSortAmountDown className="text-gray-400" />
                <select
                  className="select select-bordered w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="amount-high">Amount: High to Low</option>
                  <option value="amount-low">Amount: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={selectedLoans.length === filteredAndSortedApplications.length && filteredAndSortedApplications.length > 0}
                onChange={handleSelectAll}
                disabled={filteredAndSortedApplications.length === 0}
              />
              <span className="text-sm text-gray-600">
                {selectedLoans.length > 0 
                  ? `${selectedLoans.length} selected` 
                  : 'Select All'}
              </span>
            </div>
            
            {selectedLoans.length > 0 && (
              <div className="flex gap-2">
                <button 
                  onClick={() => handleBulkAction('withdraw')}
                  className="btn btn-error btn-sm gap-2"
                >
                  <FaTrash /> Withdraw Selected
                </button>
                <button 
                  onClick={() => setSelectedLoans([])}
                  className="btn btn-ghost btn-sm"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applications List */}
      {filteredAndSortedApplications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-bold mb-4">No Applications Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'No applications match your search criteria. Try adjusting your filters.'
              : 'You haven\'t applied for any loans yet.'}
          </p>
          <Link to="/available">
            <button className="btn btn-primary">
              Browse Available Loans
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedApplications.map((application) => (
            <div 
              key={application._id} 
              className={`card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                selectedLoans.includes(application._id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Checkbox for selection */}
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mt-1"
                        checked={selectedLoans.includes(application._id)}
                        onChange={() => handleSelectLoan(application._id)}
                      />
                      
                      {/* Loan Icon and Info */}
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">
                          {getLoanIcon(application.loanType)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {application.loanName || 'Unnamed Loan'}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {getStatusBadge(application.status)}
                            <span className="badge badge-outline">
                              <FaCalendarAlt className="mr-1" />
                              {new Date(application.applicationDate || Date.now()).toLocaleDateString()}
                            </span>
                            <span className="badge badge-outline">
                              ID: {application.loanId?.substring(0, 8) || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Loan Details */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Loan Amount</p>
                        <p className="font-bold text-lg">৳{application.loanAmount?.toLocaleString() || '0'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Interest Rate</p>
                        <p className="font-bold text-lg flex items-center gap-1">
                          <FaPercent className="text-sm" /> {application.interestRate || 'N/A'}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tenure</p>
                        <p className="font-bold text-lg">{application.tenure || 'N/A'} months</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Monthly Installment</p>
                        <p className="font-bold text-lg">৳{application.monthlyPayment?.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex flex-col md:items-end gap-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(application)}
                        className="btn btn-outline btn-sm gap-2"
                      >
                        <FaEye /> View
                      </button>
                      
                      {application.status === 'pending' && (
                        <button 
                          onClick={() => handleEditApplication(application)}
                          className="btn btn-outline btn-sm gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                      )}
                      
                      <button 
                        onClick={() => handleDownloadDocuments(application)}
                        className="btn btn-outline btn-sm gap-2"
                      >
                        <FaDownload /> Documents
                      </button>
                      
                      {application.status === 'pending' && (
                        <button 
                          onClick={() => handleWithdrawApplication(application._id)}
                          className="btn btn-error btn-sm gap-2"
                        >
                          <FaTrash /> Withdraw
                        </button>
                      )}
                    </div>

                    {/* Application Progress */}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-sm font-medium">
                        {new Date(application.updatedAt || application.applicationDate || Date.now()).toLocaleDateString()}
                      </p>
                      {application.status === 'pending' && (
                        <div className="flex items-center gap-1 text-yellow-600 text-sm mt-1">
                          <FaExclamationTriangle />
                          <span>Under review - Expected in 3-5 business days</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {application.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Additional Notes:</span> {application.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Tips */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="card-body">
          <h3 className="card-title text-blue-800">💡 Application Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex items-start gap-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaClock className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">Pending Applications</p>
                <p className="text-sm text-blue-600">Usually processed within 3-5 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="p-2 bg-green-100 rounded-full">
                <FaCheckCircle className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Approved Loans</p>
                <p className="text-sm text-green-600">Funds disbursed within 24 hours of approval</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="p-2 bg-yellow-100 rounded-full">
                <FaExclamationTriangle className="text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-yellow-800">Need Help?</p>
                <p className="text-sm text-yellow-600">Contact support for application queries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myapplication;