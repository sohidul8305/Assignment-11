import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  FaFilePdf, 
  FaFileExcel, 
  FaPrint, 
  FaDownload, 
  FaFilter,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaMoneyBillWave,
  FaUsers,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowUp,
  FaArrowDown,
  FaSearch
} from 'react-icons/fa';
import { 
  LineChart, Line, 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const API = "https://loanmate-nine.vercel.app";

const Reports = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [exporting, setExporting] = useState(false);

  // Fetch loans data
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ['loans'],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/loans`);
      return data;
    },
  });

  // Fetch applications data
  const { data: applications = [] } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/applications`);
      return data;
    },
  });

  // Filter data based on date range
  const filteredData = loans.filter(loan => {
    const loanDate = new Date(loan.createdAt || new Date());
    return loanDate >= startDate && loanDate <= endDate;
  });

  const filteredApplications = applications.filter(app => {
    const appDate = new Date(app.applicationDate || new Date());
    return appDate >= startDate && appDate <= endDate;
  });

  // Calculate statistics
  const stats = {
    totalLoans: filteredData.length,
    totalAmount: filteredData.reduce((sum, loan) => sum + (loan.maxLimit || 0), 0),
    totalApplications: filteredApplications.length,
    approvedApplications: filteredApplications.filter(app => app.status === 'approved').length,
    pendingApplications: filteredApplications.filter(app => app.status === 'pending').length,
    rejectedApplications: filteredApplications.filter(app => app.status === 'rejected').length,
    approvalRate: filteredApplications.length > 0 
      ? ((filteredApplications.filter(app => app.status === 'approved').length / filteredApplications.length) * 100).toFixed(1)
      : 0
  };

  // Monthly data for charts
  const monthlyData = () => {
    const months = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const monthYear = `${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
      const monthLoans = filteredData.filter(loan => {
        const loanDate = new Date(loan.createdAt);
        return loanDate.getMonth() === currentDate.getMonth() && 
               loanDate.getFullYear() === currentDate.getFullYear();
      });
      
      const monthApplications = filteredApplications.filter(app => {
        const appDate = new Date(app.applicationDate);
        return appDate.getMonth() === currentDate.getMonth() && 
               appDate.getFullYear() === currentDate.getFullYear();
      });

      months.push({
        month: monthYear,
        loans: monthLoans.length,
        applications: monthApplications.length,
        amount: monthLoans.reduce((sum, loan) => sum + (loan.maxLimit || 0), 0),
        approved: monthApplications.filter(app => app.status === 'approved').length
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months;
  };

  // Loan type distribution
  const loanTypeData = () => {
    const types = {};
    filteredData.forEach(loan => {
      const type = loan.category || 'Other';
      types[type] = (types[type] || 0) + 1;
    });
    
    return Object.entries(types).map(([name, value]) => ({
      name,
      value,
      color: getColorForType(name)
    }));
  };

  const getColorForType = (type) => {
    const colors = {
      'Personal': '#0088FE',
      'Business': '#00C49F',
      'Education': '#FFBB28',
      'Home': '#FF8042',
      'Other': '#8884d8'
    };
    return colors[type] || '#8884d8';
  };

  // Export to PDF
  const exportToPDF = () => {
    setExporting(true);
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('LoanMate - Reports', 14, 22);
    
    // Date range
    doc.setFontSize(12);
    doc.text(`Report Period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`, 14, 32);
    
    // Stats table
    doc.autoTable({
      startY: 40,
      head: [['Metric', 'Value']],
      body: [
        ['Total Loans', stats.totalLoans],
        ['Total Amount', `৳${stats.totalAmount.toLocaleString()}`],
        ['Total Applications', stats.totalApplications],
        ['Approved', stats.approvedApplications],
        ['Pending', stats.pendingApplications],
        ['Rejected', stats.rejectedApplications],
        ['Approval Rate', `${stats.approvalRate}%`]
      ],
    });

    // Loans table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Loan ID', 'Title', 'Category', 'Amount', 'Interest Rate', 'Date']],
      body: filteredData.map(loan => [
        loan._id?.substring(0, 8) || 'N/A',
        loan.title?.substring(0, 20) || 'N/A',
        loan.category || 'N/A',
        `৳${loan.maxLimit?.toLocaleString() || '0'}`,
        `${loan.interest || '0'}%`,
        new Date(loan.createdAt).toLocaleDateString()
      ])
    });

    doc.save(`loanmate-report-${new Date().toISOString().split('T')[0]}.pdf`);
    setExporting(false);
  };

  // Export to Excel
  const exportToExcel = () => {
    setExporting(true);
    
    // Create worksheets
    const statsWs = XLSX.utils.json_to_sheet([
      { Metric: 'Total Loans', Value: stats.totalLoans },
      { Metric: 'Total Amount', Value: `৳${stats.totalAmount.toLocaleString()}` },
      { Metric: 'Total Applications', Value: stats.totalApplications },
      { Metric: 'Approved Applications', Value: stats.approvedApplications },
      { Metric: 'Pending Applications', Value: stats.pendingApplications },
      { Metric: 'Rejected Applications', Value: stats.rejectedApplications },
      { Metric: 'Approval Rate', Value: `${stats.approvalRate}%` }
    ]);

    const loansWs = XLSX.utils.json_to_sheet(filteredData.map(loan => ({
      'Loan ID': loan._id?.substring(0, 8),
      Title: loan.title,
      Category: loan.category,
      'Max Amount': `৳${loan.maxLimit?.toLocaleString()}`,
      'Interest Rate': `${loan.interest}%`,
      Description: loan.description?.substring(0, 100),
      'Created Date': new Date(loan.createdAt).toLocaleDateString()
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, statsWs, "Statistics");
    XLSX.utils.book_append_sheet(wb, loansWs, "Loans");

    XLSX.writeFile(wb, `loanmate-report-${new Date().toISOString().split('T')[0]}.xlsx`);
    setExporting(false);
  };

  // Print report
  const printReport = () => {
    window.print();
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
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive reports and insights for your loan management</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={exportToPDF} 
            disabled={exporting}
            className="btn btn-error btn-outline gap-2"
          >
            <FaFilePdf /> PDF
          </button>
          <button 
            onClick={exportToExcel} 
            disabled={exporting}
            className="btn btn-success btn-outline gap-2"
          >
            <FaFileExcel /> Excel
          </button>
          <button 
            onClick={printReport}
            className="btn btn-info btn-outline gap-2"
          >
            <FaPrint /> Print
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">
            <FaFilter className="mr-2" /> Filter Reports
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className="label">
                <span className="label-text">Start Date</span>
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  className="input input-bordered w-full pl-10"
                  maxDate={endDate}
                />
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="label">
                <span className="label-text">End Date</span>
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  className="input input-bordered w-full pl-10"
                  minDate={startDate}
                  maxDate={new Date()}
                />
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Report Type */}
            <div>
              <label className="label">
                <span className="label-text">Report Type</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="overview">Overview</option>
                <option value="detailed">Detailed</option>
                <option value="financial">Financial</option>
                <option value="performance">Performance</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="label">
                <span className="label-text">Search</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search loans..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Loans</p>
                <h3 className="text-2xl font-bold">{stats.totalLoans}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaCreditCard className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 flex items-center">
                <FaArrowUp className="mr-1" /> +12% from last period
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Amount</p>
                <h3 className="text-2xl font-bold">৳{stats.totalAmount.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-600">Managed funds</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Applications</p>
                <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaUsers className="text-yellow-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-600">{stats.approvedApplications} Approved</span>
                <span className="text-yellow-600">{stats.pendingApplications} Pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Approval Rate</p>
                <h3 className="text-2xl font-bold">{stats.approvalRate}%</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FaChartBar className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-green-600">Above target (75%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Monthly Trends */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">
              <FaChartLine className="mr-2" /> Monthly Trends
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Count']} />
                  <Legend />
                  <Line type="monotone" dataKey="loans" stroke="#8884d8" strokeWidth={2} name="Loans" />
                  <Line type="monotone" dataKey="applications" stroke="#82ca9d" strokeWidth={2} name="Applications" />
                  <Line type="monotone" dataKey="approved" stroke="#ffc658" strokeWidth={2} name="Approved" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart - Monthly Amount */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">
              <FaChartBar className="mr-2" /> Loan Amount by Month
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`৳${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" name="Amount (৳)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Loan Types */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">
              <FaChartPie className="mr-2" /> Loan Type Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loanTypeData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {loanTypeData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">Application Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <p className="font-medium">Approved</p>
                    <p className="text-sm text-gray-500">{stats.approvedApplications} applications</p>
                  </div>
                </div>
                <span className="badge badge-success">{stats.approvalRate}% rate</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-yellow-500 text-xl" />
                  <div>
                    <p className="font-medium">Pending</p>
                    <p className="text-sm text-gray-500">{stats.pendingApplications} applications</p>
                  </div>
                </div>
                <span className="badge badge-warning">Under review</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaTimesCircle className="text-red-500 text-xl" />
                  <div>
                    <p className="font-medium">Rejected</p>
                    <p className="text-sm text-gray-500">{stats.rejectedApplications} applications</p>
                  </div>
                </div>
                <span className="badge badge-error">Needs attention</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Loans Table */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title">Loan Details</h3>
            <span className="text-sm text-gray-500">
              Showing {filteredData.length} of {loans.length} total loans
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Interest</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .filter(loan => 
                    searchTerm === '' || 
                    loan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    loan.category?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(loan => (
                    <tr key={loan._id}>
                      <td className="font-mono text-xs">{loan._id?.substring(0, 8)}...</td>
                      <td>
                        <div className="font-medium">{loan.title}</div>
                        <div className="text-xs text-gray-500">{loan.description?.substring(0, 50)}...</div>
                      </td>
                      <td>
                        <span className="badge badge-outline">{loan.category}</span>
                      </td>
                      <td className="font-bold">৳{loan.maxLimit?.toLocaleString()}</td>
                      <td>
                        <span className="badge badge-success">{loan.interest}%</span>
                      </td>
                      <td>
                        {new Date(loan.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button className="btn btn-xs btn-outline">
                          <FaDownload /> Export
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Export Status */}
      {exporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center gap-3">
              <div className="loading loading-spinner loading-lg"></div>
              <div>
                <p className="font-medium">Generating Report...</p>
                <p className="text-sm text-gray-500">Please wait while we prepare your report</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;