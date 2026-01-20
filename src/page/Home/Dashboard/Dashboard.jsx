import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaHome,
  FaCreditCard,
  FaCog,
  FaUserTie,
  FaPlusCircle,
  FaTasks,
  FaCheckCircle,
  FaUsers,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaFileAlt,
  FaBell,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaTimes,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import { NavLink, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Dashboard = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: ""
  });

  // ================= ROLE DETECTION =================
  const role = user?.email === "manager@loanmate.com"
    ? "manager"
    : user?.email === "admin@loanmate.com"
    ? "admin"
    : "borrower";

  // ================= FETCH DATA FOR CHARTS =================
  const { data: loanStats, isLoading: statsLoading } = useQuery({
    queryKey: ['loan-stats', role],
    queryFn: async () => {
      const { data } = await axios.get("https://loanmate-nine.vercel.app/loans");
      
      // Process data for charts based on role
      if (role === "borrower") {
        // Borrower stats - their own loan applications
        return {
          totalLoans: 3,
          approvedLoans: 2,
          pendingLoans: 1,
          totalAmount: 500000,
          monthlyData: [
            { month: 'Jan', amount: 100000 },
            { month: 'Feb', amount: 150000 },
            { month: 'Mar', amount: 200000 },
            { month: 'Apr', amount: 250000 },
            { month: 'May', amount: 300000 },
            { month: 'Jun', amount: 350000 },
          ],
          loanTypes: [
            { name: 'Personal', value: 40, color: '#8884d8' },
            { name: 'Business', value: 30, color: '#82ca9d' },
            { name: 'Education', value: 20, color: '#ffc658' },
            { name: 'Home', value: 10, color: '#ff8042' },
          ]
        };
      } else if (role === "manager") {
        // Manager stats - all loans they manage
        const businessLoans = data.filter(loan => loan.category === "Business").length;
        const personalLoans = data.filter(loan => loan.category === "Personal").length;
        
        return {
          totalLoans: data.length,
          approvedLoans: 8,
          pendingLoans: 4,
          totalAmount: 2500000,
          monthlyData: [
            { month: 'Jan', applications: 15, approved: 10 },
            { month: 'Feb', applications: 20, approved: 15 },
            { month: 'Mar', applications: 25, approved: 18 },
            { month: 'Apr', applications: 18, approved: 12 },
            { month: 'May', applications: 22, approved: 16 },
            { month: 'Jun', applications: 30, approved: 22 },
          ],
          loanTypes: [
            { name: 'Business', value: businessLoans, color: '#0088FE' },
            { name: 'Personal', value: personalLoans, color: '#00C49F' },
            { name: 'Education', value: 5, color: '#FFBB28' },
            { name: 'Home', value: 3, color: '#FF8042' },
          ]
        };
      } else {
        // Admin stats - all data
        return {
          totalUsers: 150,
          totalLoans: data.length,
          activeApplications: 25,
          totalRevenue: 5000000,
          monthlyData: [
            { month: 'Jan', users: 100, loans: 50, revenue: 500000 },
            { month: 'Feb', users: 120, loans: 60, revenue: 600000 },
            { month: 'Mar', users: 140, loans: 70, revenue: 700000 },
            { month: 'Apr', users: 150, loans: 80, revenue: 800000 },
            { month: 'May', users: 170, loans: 90, revenue: 900000 },
            { month: 'Jun', users: 200, loans: 100, revenue: 1000000 },
          ],
          userDistribution: [
            { name: 'Borrowers', value: 70, color: '#0088FE' },
            { name: 'Managers', value: 20, color: '#00C49F' },
            { name: 'Admins', value: 10, color: '#FFBB28' },
          ]
        };
      }
    },
    enabled: !loading && !!user
  });

  // ================= AUTO REDIRECT =================
  useEffect(() => {
    if (loading || !user) return;

    if (location.pathname === "/dashboard") {
      if (role === "admin") navigate("/dashboard/manage-users", { replace: true });
      else if (role === "manager") navigate("/dashboard/add-loan", { replace: true });
      else navigate("/dashboard/my-loans", { replace: true });
    }
  }, [role, loading, user, navigate, location.pathname]);

  // ================= PROFILE HANDLERS =================
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setEditedProfile({
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "+880 1234 567890",
      address: "123 Main Street, Dhaka, Bangladesh"
    });
  };

  const handleSaveProfile = () => {
    // Here you would save to backend
    console.log("Saving profile:", editedProfile);
    setIsEditingProfile(false);
    // Update user profile in Firebase
    // updateUserProfile({ displayName: editedProfile.name });
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditedProfile({
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      address: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // ================= OVERVIEW CARDS =================
  const renderOverviewCards = () => {
    if (role === "borrower") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Loans</p>
                  <h3 className="text-2xl font-bold">{loanStats?.totalLoans || 0}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaCreditCard className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-600 flex items-center">
                  <FaArrowUp className="mr-1" /> 2 Approved
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Approved Loans</p>
                  <h3 className="text-2xl font-bold">{loanStats?.approvedLoans || 0}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-600">Active</span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Loans</p>
                  <h3 className="text-2xl font-bold">{loanStats?.pendingLoans || 0}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaTasks className="text-yellow-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-yellow-600">Under Review</span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <h3 className="text-2xl font-bold">৳{loanStats?.totalAmount?.toLocaleString() || "0"}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaMoneyBillWave className="text-purple-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-600">Borrowed</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (role === "manager") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Loans</p>
                  <h3 className="text-2xl font-bold">{loanStats?.totalLoans || 0}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaCreditCard className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-600 flex items-center">
                  <FaArrowUp className="mr-1" /> +12% from last month
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Approved Loans</p>
                  <h3 className="text-2xl font-bold">{loanStats?.approvedLoans || 0}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-600">This month</span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Review</p>
                  <h3 className="text-2xl font-bold">{loanStats?.pendingLoans || 0}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaTasks className="text-yellow-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-yellow-600">Needs attention</span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <h3 className="text-2xl font-bold">৳{loanStats?.totalAmount?.toLocaleString() || "0"}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaMoneyBillWave className="text-purple-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-600">Managed</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Admin cards
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold">{loanStats?.totalUsers || 0}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaUsers className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-600 flex items-center">
                  <FaArrowUp className="mr-1" /> +20 this month
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Loans</p>
                  <h3 className="text-2xl font-bold">{loanStats?.totalLoans || 0}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FaCreditCard className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-600">Active loans</span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Applications</p>
                  <h3 className="text-2xl font-bold">{loanStats?.activeApplications || 0}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaTasks className="text-yellow-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-yellow-600">Pending review</span>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold">৳{loanStats?.totalRevenue?.toLocaleString() || "0"}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaMoneyBillWave className="text-purple-600 text-xl" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-600 flex items-center">
                  <FaArrowUp className="mr-1" /> +15% growth
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // ================= CHARTS =================
  const renderCharts = () => {
    if (role === "borrower") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart - Loan Amount Over Time */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Loan Amount Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loanStats?.monthlyData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`৳${value}`, "Amount"]} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart - Loan Type Distribution */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Loan Type Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loanStats?.loanTypes || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {loanStats?.loanTypes?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (role === "manager") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart - Applications vs Approved */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Applications vs Approved (Monthly)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loanStats?.monthlyData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                    <Bar dataKey="approved" fill="#82ca9d" name="Approved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart - Loan Categories */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Loan Category Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loanStats?.loanTypes || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {loanStats?.loanTypes?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Admin charts
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart - Growth Trends */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Platform Growth Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loanStats?.monthlyData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" strokeWidth={2} />
                    <Line type="monotone" dataKey="loans" stroke="#82ca9d" name="Loans" strokeWidth={2} />
                    <Line type="monotone" dataKey="revenue" stroke="#ffc658" name="Revenue" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart - User Distribution */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">User Role Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loanStats?.userDistribution || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {loanStats?.userDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Users"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // ================= DATA TABLES =================
  const renderDataTables = () => {
    // Sample data for tables
    const loanData = [
      { id: 1, name: "Personal Loan", amount: "৳100,000", status: "Approved", date: "2024-01-15" },
      { id: 2, name: "Business Loan", amount: "৳500,000", status: "Pending", date: "2024-01-20" },
      { id: 3, name: "Education Loan", amount: "৳200,000", status: "Approved", date: "2024-01-10" },
      { id: 4, name: "Home Loan", amount: "৳1,000,000", status: "Rejected", date: "2024-01-05" },
    ];

    const userData = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Borrower", status: "Active" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Borrower", status: "Active" },
      { id: 3, name: "Manager One", email: "manager@example.com", role: "Manager", status: "Active" },
      { id: 4, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" },
    ];

    return (
      <div className="card bg-white shadow-lg mb-8">
        <div className="card-body">
          <h3 className="card-title mb-4">
            {role === "borrower" ? "My Loan Applications" : 
             role === "manager" ? "Recent Loan Applications" : 
             "Recent User Activities"}
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  {role === "admin" ? (
                    <>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </>
                  ) : (
                    <>
                      <th>Loan ID</th>
                      <th>Loan Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {role === "admin" ? (
                  userData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === "Admin" ? "badge-primary" : user.role === "Manager" ? "badge-secondary" : "badge-accent"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-success">{user.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-xs btn-outline">View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  loanData.map((loan) => (
                    <tr key={loan.id}>
                      <td>#{loan.id}</td>
                      <td>{loan.name}</td>
                      <td>{loan.amount}</td>
                      <td>
                        <span className={`badge ${
                          loan.status === "Approved" ? "badge-success" :
                          loan.status === "Pending" ? "badge-warning" :
                          "badge-error"
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                      <td>{loan.date}</td>
                      <td>
                        <button className="btn btn-xs btn-outline">Details</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ================= PROFILE PAGE =================
  const renderProfilePage = () => (
    <div className="card bg-white shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h3 className="card-title">Profile Information</h3>
          {!isEditingProfile ? (
            <button onClick={handleEditProfile} className="btn btn-primary btn-sm">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSaveProfile} className="btn btn-success btn-sm">
                <FaSave className="mr-2" /> Save
              </button>
              <button onClick={handleCancelEdit} className="btn btn-error btn-sm">
                <FaTimes className="mr-2" /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="md:w-1/3 text-center">
            <div className="avatar mb-4">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                <img src={user?.photoURL || "https://i.ibb.co.com/7JZzH2B/default-avatar.png"} alt="Profile" />
              </div>
            </div>
            <h4 className="text-xl font-bold">{user?.displayName || "User"}</h4>
            <p className="text-gray-600">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-gray-400" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <span className="text-sm">Joined: Jan 2024</span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                ) : (
                  <p className="text-lg">{user?.displayName || "Not set"}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    disabled
                  />
                ) : (
                  <p className="text-lg">{user?.email}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                {isEditingProfile ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                ) : (
                  <p className="text-lg">+880 1234 567890</p>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                {isEditingProfile ? (
                  <textarea
                    name="address"
                    value={editedProfile.address}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-24"
                  />
                ) : (
                  <p className="text-lg">123 Main Street, Dhaka, Bangladesh</p>
                )}
              </div>
            </div>

            {/* Account Stats */}
            <div className="divider"></div>
            <h4 className="text-lg font-semibold mb-4">Account Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat">
                <div className="stat-title">Total Loans</div>
                <div className="stat-value">{loanStats?.totalLoans || 0}</div>
                <div className="stat-desc">All time</div>
              </div>
              <div className="stat">
                <div className="stat-title">Active Loans</div>
                <div className="stat-value">{loanStats?.approvedLoans || 0}</div>
                <div className="stat-desc">Currently active</div>
              </div>
              <div className="stat">
                <div className="stat-title">Pending</div>
                <div className="stat-value">{loanStats?.pendingLoans || 0}</div>
                <div className="stat-desc">Under review</div>
              </div>
              <div className="stat">
                <div className="stat-title">Success Rate</div>
                <div className="stat-value">85%</div>
                <div className="stat-desc">Loan approval</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ================= Borrower Links =================
  const borrowerLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/my-loans"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }
        >
          <FaCreditCard className="w-5 h-5 mr-3" /> My Loans
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }
        >
          <FaUserAlt className="w-5 h-5 mr-3" /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/applications"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }
        >
          <FaFileAlt className="w-5 h-5 mr-3" /> Applications
        </NavLink>
      </li>
    </>
  );

  // ================= Manager Links =================
  const managerLinks = (
    <>
      <li>
        <NavLink to="/dashboard/add-loan" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaPlusCircle className="w-5 h-5 mr-3" /> Add Loan
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-loans" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaTasks className="w-5 h-5 mr-3" /> Manage Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/pending-loans" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaTasks className="w-5 h-5 mr-3" /> Pending Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/approved-loans" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaCheckCircle className="w-5 h-5 mr-3" /> Approved Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="dashboard/analytics" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaChartBar className="w-5 h-5 mr-3" /> Analytics
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaUserAlt className="w-5 h-5 mr-3" /> Profile
        </NavLink>
      </li>
    </>
  );

  // ================= Admin Links =================
  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/manage-users" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaUsers className="w-5 h-5 mr-3" /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-loans" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaCreditCard className="w-5 h-5 mr-3" /> All Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/loan-applications" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaTasks className="w-5 h-5 mr-3" /> Loan Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/analytics" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaChartLine className="w-5 h-5 mr-3" /> Analytics
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/reports" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaChartPie className="w-5 h-5 mr-3" /> Reports
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
          }>
          <FaUserAlt className="w-5 h-5 mr-3" /> Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="navbar bg-white shadow-md sticky top-0 z-10 px-6">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              ☰
            </label>
          </div>
          <div className="flex-1">
            <div className="text-xl font-bold text-primary">LoanMate Dashboard</div>
            <div className="text-sm text-gray-500">
              Welcome back, <span className="font-semibold">{user?.displayName || "User"}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <FaBell className="text-xl" />
                  <span className="badge badge-sm badge-primary indicator-item">3</span>
                </div>
              </div>
              <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-white">
                <div className="card-body">
                  <span className="font-bold text-lg">Notifications</span>
                  <span className="text-info">You have 3 unread messages</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
              <div className="avatar online">
                <div className="w-8 h-8 rounded-full">
                  <img src={user?.photoURL || "https://i.ibb.co.com/7JZzH2B/default-avatar.png"} alt="Profile" />
                </div>
              </div>
              <div>
                <div className="font-semibold">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6 flex-grow">
          {/* Dashboard Overview (only on dashboard home) */}
          {location.pathname === "/dashboard/profile" ? (
            renderProfilePage()
          ) : location.pathname === "/dashboard" ? (
            <>
              {/* Welcome Banner */}
              <div className="mb-8 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h2>
                <p className="opacity-90">
                  {role === "borrower" 
                    ? "Track your loan applications, view status, and manage your profile."
                    : role === "manager"
                    ? "Manage loan applications, approve requests, and monitor performance."
                    : "Monitor platform analytics, manage users, and oversee operations."}
                </p>
              </div>

              {/* Overview Cards */}
              {renderOverviewCards()}

              {/* Charts */}
              {renderCharts()}

              {/* Data Tables */}
              {renderDataTables()}
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-72 min-h-full bg-base-100 border-r">
          {/* Brand */}
          <div className="mb-6 px-4">
            <h1 className="text-2xl font-bold text-primary">LoanMate</h1>
            <p className="text-sm text-gray-500">Financial Management</p>
          </div>

          {/* Navigation */}
          <ul className="space-y-1">
            {/* Home */}
            <li>
              <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <FaHome className="w-5 h-5 mr-3" /> Home
              </Link>
            </li>

            <div className="divider my-2"></div>

            {/* Dashboard Home */}
            <li>
              <NavLink to="/dashboard" end className={({ isActive }) =>
                `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`
              }>
                <FaChartBar className="w-5 h-5 mr-3" /> Dashboard Overview
              </NavLink>
            </li>

            {/* Role Based Links */}
            {role === "borrower" && borrowerLinks}
            {role === "manager" && managerLinks}
            {role === "admin" && adminLinks}

            <div className="divider my-2"></div>

            {/* Logout */}

          </ul>

          {/* User Info at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src={user?.photoURL || "https://i.ibb.co.com/7JZzH2B/default-avatar.png"} alt="Profile" />
                </div>
              </div>
              <div>
                <div className="font-semibold">{user?.displayName || "User"}</div>
                <div className="text-xs text-gray-500">
                  <span className={`badge ${role === "admin" ? "badge-primary" : role === "manager" ? "badge-secondary" : "badge-accent"} badge-sm`}>
                    {role}
                  </span>
                </div>
              </div>
            </div>
          </div>
              <li>
              <button 
                onClick={logOut} 
                className="flex items-center p-3 rounded-lg hover:bg-red-50 text-red-600 w-full text-left mb-10"
              >
                <FaSignOutAlt className="w-5 h-5 mr-3" /> Logout
              </button>
            </li>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;