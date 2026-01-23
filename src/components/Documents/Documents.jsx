import React, { useState, useEffect } from 'react';
import { 
  FaBook, FaCogs, FaDatabase, FaShieldAlt, 
  FaCreditCard, FaBell, FaChartBar, FaReact, 
  FaNodeJs, FaKey, FaFileAlt, FaCode,
  FaServer, FaMobileAlt, FaCloud, FaBolt,
  FaRocket, FaLock, FaUsers, FaPalette,
  FaSun, FaMoon, FaTerminal, FaChevronRight,
  FaPlayCircle, FaCopy, FaCheck, FaExpandAlt,
  FaDatabase as FaDb, FaExchangeAlt, FaCodeBranch,
  FaGlobe, FaChartLine, FaNetworkWired, FaCubes,
  FaShapes, FaCube, FaLayerGroup, FaProjectDiagram
} from 'react-icons/fa';
import { 
  SiExpress, SiMongodb, SiJsonwebtokens, 
  SiStripe, SiReactrouter, SiTailwindcss,
  SiJavascript, SiRedux, SiSocketdotio,
  SiPostman, SiVercel, SiNetlify,
  SiAxios, SiMongoose
} from 'react-icons/si';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Features with detailed information
  const features = [
    {
      id: 1,
      icon: <FaBook className="text-3xl" />,
      title: "Loan Application Management",
      description: "Users can submit loan requests with required documents and personal details.",
      details: [
        "Dynamic form with real-time validation",
        "Document upload with preview",
        "Application progress tracking",
        "Auto-save draft functionality"
      ],
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-400/10"
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Loan Verification System",
      description: "Admins can verify borrower details, documents, and credit history.",
      details: [
        "Multi-level verification workflow",
        "Document authenticity check",
        "Credit score integration",
        "Verification history log"
      ],
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-400/10"
    },
    {
      id: 3,
      icon: <FaCogs className="text-3xl" />,
      title: "Approval Workflow",
      description: "Multi-level approval system with automated eligibility checks.",
      details: [
        "Custom approval chains",
        "Auto-rejection rules",
        "Priority queue for urgent applications",
        "Approval delegation system"
      ],
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-400/10"
    },
    {
      id: 4,
      icon: <FaCreditCard className="text-3xl" />,
      title: "EMI Management",
      description: "Track EMI schedules, repayment status, and payment history.",
      details: [
        "Dynamic EMI calculator",
        "Auto-debit scheduling",
        "Late fee calculation",
        "Payment reminder system"
      ],
      color: "from-orange-500 to-yellow-400",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-yellow-400/10"
    },
    {
      id: 5,
      icon: <FaDatabase className="text-3xl" />,
      title: "User Management",
      description: "Manage borrowers, managers, and admin roles with granular access control.",
      details: [
        "Role-based permissions",
        "Activity monitoring",
        "Session management",
        "Audit trail logging"
      ],
      color: "from-red-500 to-orange-400",
      bgColor: "bg-gradient-to-br from-red-500/10 to-orange-400/10"
    },
    {
      id: 6,
      icon: <FaBell className="text-3xl" />,
      title: "Smart Notifications",
      description: "Email & SMS notifications for application status, EMIs, and overdue payments.",
      details: [
        "Custom notification templates",
        "Scheduled notifications",
        "Notification preferences",
        "Real-time alerts"
      ],
      color: "from-indigo-500 to-purple-400",
      bgColor: "bg-gradient-to-br from-indigo-500/10 to-purple-400/10"
    }
  ];

  // Technology stack with icons
  const techStack = {
    frontend: [
      { name: "React.js", icon: <FaReact />, color: "text-blue-500", bg: "bg-blue-500/10" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-teal-500", bg: "bg-teal-500/10" },
      { name: "React Router", icon: <SiReactrouter />, color: "text-red-500", bg: "bg-red-500/10" },
      { name: "Context API", icon: <FaCodeBranch />, color: "text-purple-500", bg: "bg-purple-500/10" },
      { name: "Axios", icon: <SiAxios />, color: "text-indigo-500", bg: "bg-indigo-500/10" }
    ],
    backend: [
      { name: "Node.js", icon: <FaNodeJs />, color: "text-green-600", bg: "bg-green-500/10" },
      { name: "Express.js", icon: <SiExpress />, color: "text-gray-700", bg: "bg-gray-500/10" },
      { name: "JWT", icon: <SiJsonwebtokens />, color: "text-yellow-600", bg: "bg-yellow-500/10" },
      { name: "Socket.io", icon: <SiSocketdotio />, color: "text-black", bg: "bg-black/10" }
    ],
    database: [
      { name: "MongoDB", icon: <SiMongodb />, color: "text-green-700", bg: "bg-green-700/10" },
      { name: "Mongoose", icon: <SiMongoose />, color: "text-red-600", bg: "bg-red-600/10" },
      { name: "Redis", icon: <FaBolt />, color: "text-orange-600", bg: "bg-orange-600/10" }
    ]
  };

  // Code snippets
  const codeSnippets = {
    server: `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Loan Model
const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = app;`,
    
    component: `import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoanApplication = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/loans/apply', data);
      toast.success('Loan application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Apply for Loan</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            {...register("amount", { required: true, min: 1000 })}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">
              Amount is required and must be at least 1000
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};`
  };

  // Copy code function
  const copyToClipboard = (code, name) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(name);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'}`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-white text-gray-800'} shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
        </button>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${darkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'} rounded-full animate-pulse`}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto p-4 md:p-8">
        {/* Header with Animation */}
        <header className="text-center mb-16 relative">
          <div className="inline-block mb-6 animate-bounce">
            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'} shadow-2xl transform rotate-3`}>
              <FaFileAlt className="text-6xl text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            LoanFlow Pro
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`px-4 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></span>
              <span className="text-sm font-medium">Live Documentation</span>
            </span>
            <span className={`px-4 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <span className="text-sm font-medium">v2.1.0</span>
            </span>
          </div>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A cutting-edge loan management system with real-time processing, 
            AI-powered verification, and seamless user experience
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className={`sticky top-0 z-40 mb-10 ${darkMode ? 'bg-gray-800/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} rounded-2xl shadow-lg p-2`}>
          <div className="flex flex-wrap gap-2">
            {['overview', 'features', 'tech', 'api', 'installation', 'demo'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab 
                    ? `${darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'} shadow-lg` 
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                }`}
              >
                {tab === 'overview' && <FaRocket />}
                {tab === 'features' && <FaCogs />}
                {tab === 'tech' && <FaCode />}
                {tab === 'api' && <FaTerminal />}
                {tab === 'installation' && <FaMobileAlt />}
                {tab === 'demo' && <FaPlayCircle />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div className={`rounded-3xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'}`}>
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                      <FaRocket className="text-4xl text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold">Project Overview</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        LoanFlow Pro revolutionizes the loan management process with its 
                        AI-powered decision engine and real-time processing capabilities.
                      </p>
                      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <FaBolt className="text-yellow-500" />
                          Key Innovations
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <FaChevronRight className="text-blue-500" />
                            <span>Machine Learning credit scoring</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FaChevronRight className="text-blue-500" />
                            <span>Blockchain document verification</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FaChevronRight className="text-blue-500" />
                            <span>Real-time collaboration tools</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-br from-blue-50 to-purple-50'} border ${darkMode ? 'border-blue-500/20' : 'border-blue-200'}`}>
                      <h3 className="text-xl font-bold mb-4">System Architecture</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Microservices</span>
                          <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>12 Services</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">APIs</span>
                          <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>45+ Endpoints</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Database</span>
                          <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>Sharded MongoDB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-6">
                {features.map(feature => (
                  <div
                    key={feature.id}
                    className={`rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <div className={`h-2 ${feature.bgColor}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : feature.bgColor}`}>
                          <div className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                            {feature.icon}
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <FaExpandAlt />
                        </button>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                      
                      {expandedFeature === feature.id && (
                        <div className={`mt-4 p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <h4 className="font-bold mb-2">Detailed Features:</h4>
                          <ul className="space-y-2">
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-4">
                        <div className={`h-1 flex-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${feature.color}`}
                            style={{ width: `${Math.random() * 50 + 50}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {Math.floor(Math.random() * 40 + 60)}% Complete
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack Tab */}
          {activeTab === 'tech' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Tech Stack Visualization */}
              <div className={`rounded-3xl p-8 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} shadow-2xl`}>
                <h2 className="text-3xl font-bold mb-8 text-center">Technology Ecosystem</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {Object.entries(techStack).map(([category, items]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-xl font-bold mb-4 capitalize flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          {category === 'frontend' && <FaPalette />}
                          {category === 'backend' && <FaServer />}
                          {category === 'database' && <FaDb />}
                        </div>
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {items.map((tech, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300 transform hover:translate-x-2`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${tech.bg}`}>
                                <span className={tech.color}>{tech.icon}</span>
                              </div>
                              <span className="font-medium">{tech.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippets */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaTerminal />
                      <span className="font-mono">server.js</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(codeSnippets.server, 'server')}
                      className="p-2 hover:bg-white/20 rounded-lg"
                    >
                      {copiedCode === 'server' ? <FaCheck /> : <FaCopy />}
                    </button>
                  </div>
                  <pre className={`p-6 overflow-x-auto ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-100'}`}>
                    <code>{codeSnippets.server}</code>
                  </pre>
                </div>

                <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                  <div className="p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaCode />
                      <span className="font-mono">LoanApplication.jsx</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(codeSnippets.component, 'component')}
                      className="p-2 hover:bg-white/20 rounded-lg"
                    >
                      {copiedCode === 'component' ? <FaCheck /> : <FaCopy />}
                    </button>
                  </div>
                  <pre className={`p-6 overflow-x-auto ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-100'}`}>
                    <code>{codeSnippets.component}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* API Documentation Tab */}
          {activeTab === 'api' && (
            <div className="space-y-8 animate-fadeIn">
              <div className={`rounded-3xl p-8 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} shadow-2xl`}>
                <h2 className="text-3xl font-bold mb-8">API Playground</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* API Endpoints */}
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FaTerminal className="text-blue-500" />
                      Core Endpoints
                    </h3>
                    <div className="space-y-4">
                      {[
                        { method: 'POST', path: '/api/auth/login', color: 'bg-green-500' },
                        { method: 'POST', path: '/api/loans/apply', color: 'bg-blue-500' },
                        { method: 'GET', path: '/api/loans/pending', color: 'bg-yellow-500' },
                        { method: 'PUT', path: '/api/loans/{id}/approve', color: 'bg-purple-500' },
                        { method: 'GET', path: '/api/analytics/dashboard', color: 'bg-indigo-500' },
                        { method: 'POST', path: '/api/payments/process', color: 'bg-pink-500' },
                      ].map((endpoint, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-md transition-shadow duration-300`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded ${endpoint.color} text-white font-bold text-sm`}>
                              {endpoint.method}
                            </span>
                            <code className="font-mono">{endpoint.path}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* API Statistics */}
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
                    <h3 className="text-xl font-bold mb-4">API Performance</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Response Time</span>
                          <span className="font-bold">42ms</span>
                        </div>
                        <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Success Rate</span>
                          <span className="font-bold">99.8%</span>
                        </div>
                        <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div className="h-full w-11/12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Uptime</span>
                          <span className="font-bold">99.9%</span>
                        </div>
                        <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Installation Tab */}
          {activeTab === 'installation' && (
            <div className="space-y-8 animate-fadeIn">
              <div className={`rounded-3xl p-8 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} shadow-2xl`}>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <FaRocket className="text-orange-500" />
                  Quick Start Guide
                </h2>

                <div className="space-y-8">
                  {/* Steps */}
                  {[
                    { number: 1, title: "Clone Repository", command: "git clone https://github.com/yourusername/loanflow-pro.git" },
                    { number: 2, title: "Install Dependencies", command: "npm install" },
                    { number: 3, title: "Environment Setup", command: "cp .env.example .env" },
                    { number: 4, title: "Configure Database", command: "mongod --dbpath ./data" },
                    { number: 5, title: "Start Development Server", command: "npm run dev" },
                    { number: 6, title: "Build for Production", command: "npm run build" },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'} transform transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white font-bold text-xl`}>
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} mt-2`}>
                            <div className="flex items-center justify-between">
                              <code className="text-green-400 font-mono">{step.command}</code>
                              <button
                                onClick={() => copyToClipboard(step.command, `step-${step.number}`)}
                                className="p-2 hover:bg-gray-700 rounded-lg"
                              >
                                {copiedCode === `step-${step.number}` ? (
                                  <FaCheck className="text-green-400" />
                                ) : (
                                  <FaCopy className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Demo Tab */}
          {activeTab === 'demo' && (
            <div className="space-y-8 animate-fadeIn">
              <div className={`rounded-3xl p-8 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} shadow-2xl`}>
                <h2 className="text-3xl font-bold mb-8 text-center">Interactive Demo</h2>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Demo Card 1 */}
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-blue-700/30' : 'bg-gradient-to-br from-blue-50 to-blue-100'} border ${darkMode ? 'border-blue-500/20' : 'border-blue-200'}`}>
                    <div className="text-center mb-6">
                      <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                        <FaUsers className="text-3xl text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">User Dashboard</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Experience the borrower interface
                      </p>
                    </div>
                    <button className={`w-full py-3 rounded-xl font-bold ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}>
                      Launch Dashboard Demo
                    </button>
                  </div>

                  {/* Demo Card 2 */}
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-pink-700/30' : 'bg-gradient-to-br from-purple-50 to-pink-100'} border ${darkMode ? 'border-purple-500/20' : 'border-purple-200'}`}>
                    <div className="text-center mb-6">
                      <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                        <FaLock className="text-3xl text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Admin Panel</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Explore admin controls and analytics
                      </p>
                    </div>
                    <button className={`w-full py-3 rounded-xl font-bold ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors duration-300`}>
                      Launch Admin Demo
                    </button>
                  </div>

                  {/* Demo Card 3 */}
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-green-900/30 to-emerald-700/30' : 'bg-gradient-to-br from-green-50 to-emerald-100'} border ${darkMode ? 'border-green-500/20' : 'border-green-200'}`}>
                    <div className="text-center mb-6">
                      <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                        <FaExchangeAlt className="text-3xl text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">API Sandbox</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Test API endpoints in real-time
                      </p>
                    </div>
                    <button className={`w-full py-3 rounded-xl font-bold ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-300`}>
                      Open API Playground
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className={`mt-16 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LoanFlow Pro
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Next-generation Loan Management System
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className={`hover:text-blue-500 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                GitHub
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Documentation
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Support
              </a>
            </div>
          </div>
          
          <div className={`text-center mt-8 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} LoanFlow Pro. All rights reserved. | Version 2.1.0
          </div>
        </footer>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .dark {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
};

export default Documents;