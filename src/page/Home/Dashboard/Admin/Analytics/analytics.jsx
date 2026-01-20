// src/components/Dashboard/Analytics.jsx
import React from 'react';
import { FaChartBar, FaChartLine, FaChartPie, FaUsers, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Sample data for analytics
  const monthlyData = [
    { month: 'Jan', applications: 15, approved: 10, revenue: 500000 },
    { month: 'Feb', applications: 20, approved: 15, revenue: 750000 },
    { month: 'Mar', applications: 25, approved: 18, revenue: 900000 },
    { month: 'Apr', applications: 18, approved: 12, revenue: 600000 },
    { month: 'May', applications: 22, approved: 16, revenue: 800000 },
    { month: 'Jun', applications: 30, approved: 22, revenue: 1100000 },
  ];

  const loanTypeData = [
    { name: 'Personal', value: 40, color: '#8884d8' },
    { name: 'Business', value: 30, color: '#82ca9d' },
    { name: 'Education', value: 20, color: '#ffc658' },
    { name: 'Home', value: 10, color: '#ff8042' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor loan performance and metrics</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: Today, 10:30 AM
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Applications</p>
                <h3 className="text-2xl font-bold">130</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaCreditCard className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-green-600">+12% from last month</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Approval Rate</p>
                <h3 className="text-2xl font-bold">78%</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaChartLine className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-600">Industry avg: 72%</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">৳4.65M</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FaMoneyBillWave className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-green-600">+18% growth</span>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Borrowers</p>
                <h3 className="text-2xl font-bold">89</h3>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FaUsers className="text-orange-600 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-600">+5 this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">Monthly Trends</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, "Value"]} />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} name="Applications" />
                  <Line type="monotone" dataKey="approved" stroke="#82ca9d" strokeWidth={2} name="Approved" />
                  <Line type="monotone" dataKey="revenue" stroke="#ffc658" strokeWidth={2} name="Revenue (৳)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">Applications vs Approved</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
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
      </div>

      {/* Pie Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">Loan Type Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loanTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {loanTypeData.map((entry, index) => (
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

        {/* Recent Activity Table */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">Recent Activity</h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Today, 10:30</td>
                    <td>New loan application received</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                  </tr>
                  <tr>
                    <td>Today, 09:45</td>
                    <td>Loan application approved</td>
                    <td><span className="badge badge-success">Approved</span></td>
                  </tr>
                  <tr>
                    <td>Yesterday, 16:20</td>
                    <td>Loan disbursed to borrower</td>
                    <td><span className="badge badge-info">Disbursed</span></td>
                  </tr>
                  <tr>
                    <td>Yesterday, 14:10</td>
                    <td>New borrower registered</td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                  <tr>
                    <td>Jan 15, 11:30</td>
                    <td>Monthly report generated</td>
                    <td><span className="badge badge-info">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-4">Export Reports</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">
              <FaChartBar className="mr-2" /> Export PDF Report
            </button>
            <button className="btn btn-secondary">
              <FaChartLine className="mr-2" /> Export Excel Data
            </button>
            <button className="btn btn-accent">
              <FaChartPie className="mr-2" /> Generate Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;