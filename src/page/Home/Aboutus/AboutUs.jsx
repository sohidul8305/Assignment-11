import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  CurrencyDollarIcon, 
  UsersIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  DevicePhoneMobileIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  HeartIcon,
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  GlobeAltIcon,
  CpuChipIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleIconSolid,
  BoltIcon,
  FireIcon
} from '@heroicons/react/24/solid';

const AboutUs = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState([
    { value: 0, label: 'Loans Processed', suffix: 'K+' },
    { value: 0, label: 'Happy Borrowers', suffix: '+' },
    { value: 0, label: 'Processing Time', suffix: ' hrs', isTime: true },
    { value: 0, label: 'Success Rate', suffix: '%' }
  ]);

  const features = [
    {
      name: 'Unified Application Management',
      description: 'Centralize all microloan requests in one platform, eliminating scattered paperwork and disorganized digital files.',
      icon: CheckCircleIcon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      gradient: 'from-indigo-500 to-purple-600',
      details: [
        'Digital document upload',
        'Application tracking dashboard',
        'Automated data validation',
        'Multi-language support'
      ]
    },
    {
      name: 'Streamlined Verification & Approval',
      description: 'Accelerate the review process with digital verification workflows and clear approval hierarchies for faster loan disbursement.',
      icon: ShieldCheckIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-emerald-600',
      details: [
        'AI-powered document verification',
        'Multi-level approval workflow',
        'Real-time status updates',
        'Audit trail recording'
      ]
    },
    {
      name: 'Automated EMI & Repayment Tracking',
      description: 'Automatically generate EMI schedules, track payments, and send reminders, reducing manual effort and errors.',
      icon: CurrencyDollarIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      gradient: 'from-yellow-500 to-orange-600',
      details: [
        'Smart EMI calculator',
        'Auto-debit integration',
        'Late payment alerts',
        'Payment history analytics'
      ]
    },
    {
      name: 'Comprehensive Reporting & Analytics',
      description: 'Gain valuable insights into loan portfolio health, repayment rates, and borrower demographics to improve decision-making.',
      icon: ChartBarIcon,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      gradient: 'from-rose-500 to-pink-600',
      details: [
        'Real-time dashboard',
        'Portfolio analytics',
        'Risk assessment reports',
        'Performance metrics'
      ]
    }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'LoanLink was born to solve microloan management challenges' },
    { year: '2021', title: 'First Deployment', description: 'Successfully implemented in 5 microfinance institutions' },
    { year: '2022', title: 'AI Integration', description: 'Integrated AI-powered verification system' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded services to 3 continents' },
    { year: '2024', title: 'Platform 3.0', description: 'Launched next-generation loan management platform' }
  ];

  const teamPrinciples = [
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: 'Empathy First',
      description: 'We understand the challenges of microfinance and build solutions that truly help.'
    },
    {
      icon: <LightBulbIcon className="h-8 w-8" />,
      title: 'Innovation Driven',
      description: 'Continuously improving our technology to stay ahead of industry needs.'
    },
    {
      icon: <ShieldExclamationIcon className="h-8 w-8" />,
      title: 'Security Focused',
      description: 'Bank-level security to protect sensitive financial data.'
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: 'Global Vision',
      description: 'Designed to work across different markets and regulatory environments.'
    }
  ];

  // Animate statistics
  useEffect(() => {
    const targetValues = [45, 15, 12, 99.5];
    const duration = 2000;
    const steps = 60;
    const increment = targetValues.map(value => value / steps);
    
    const interval = setInterval(() => {
      setStats(prev => prev.map((stat, index) => {
        const newValue = Math.min(stat.value + increment[index], targetValues[index]);
        return { ...stat, value: parseFloat(newValue.toFixed(1)) };
      }));
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  // Auto rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full animate-pulse"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Header Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold">
                <SparklesIcon className="h-4 w-4" />
                Transforming Microfinance Since 2020
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Revolutionizing
                </span>
                <br />
                <span className="text-gray-900">Microloan Management</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                Empowering financial organizations with intelligent tools to streamline lending, 
                enhance transparency, and drive financial inclusion.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300">
                  Schedule a Demo
                </button>
              </div>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 mt-2">{stat.label}</div>
                  {index === 2 && (
                    <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <ArrowPathIcon className="h-3 w-3" />
                      65% faster than industry average
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Problem Side */}
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl rotate-12" />
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FireIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">The Problem</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <ShieldExclamationIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Manual Processes</h4>
                        <p className="text-gray-600 text-sm">Paper-based applications lead to errors and delays</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <ClockIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Long Processing Times</h4>
                        <p className="text-gray-600 text-sm">Average 72+ hours for loan approval</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <DocumentCheckIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Poor Visibility</h4>
                        <p className="text-gray-600 text-sm">Limited tracking and reporting capabilities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution Side */}
              <div className="relative">
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl -rotate-12" />
                <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <BoltIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Solution</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircleIconSolid className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white">Complete Digitalization</h4>
                        <p className="text-indigo-100 text-sm">End-to-end digital loan management</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <BoltIcon className="h-5 w-5 text-yellow-300 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white">Rapid Processing</h4>
                        <p className="text-indigo-100 text-sm">Reduce approval time to under 12 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <ChartBarIcon className="h-5 w-5 text-blue-300 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white">Real-time Analytics</h4>
                        <p className="text-indigo-100 text-sm">Comprehensive dashboards and insights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold mb-4">
                <RocketLaunchIcon className="h-4 w-4" />
                POWERFUL FEATURES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need for
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"> Success</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed specifically for microfinance institutions and NGOs
              </p>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Feature Tabs */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.name}
                    onClick={() => setActiveFeature(index)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-white shadow-2xl border-2 border-indigo-500 transform scale-[1.02]'
                        : 'bg-gray-50 hover:bg-white hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${feature.bgColor}`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                      {activeFeature === index && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                        </div>
                      )}
                    </div>
                    {activeFeature === index && (
                      <div className="mt-4 pl-12">
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Feature Visualization */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className={`bg-gradient-to-br ${features[activeFeature].gradient} rounded-3xl p-8 h-96 flex flex-col justify-center`}>
                    <div className="text-white mb-8">
                      <h3 className="text-2xl font-bold mb-4">{features[activeFeature].name}</h3>
                      <p className="text-white/90">{features[activeFeature].description}</p>
                    </div>
                    
                    {/* Animated Visualization */}
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white/20 rounded-xl p-4">
                          <div className="h-2 bg-white/40 rounded-full mb-2 overflow-hidden">
                            <div 
                              className="h-full bg-white rounded-full animate-progress"
                              style={{
                                width: `${Math.random() * 40 + 60}%`,
                                animationDelay: `${i * 0.2}s`
                              }}
                            />
                          </div>
                          <div className="text-white/80 text-sm">Feature {i}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Feature Indicator Dots */}
                  <div className="flex justify-center gap-2 mt-8">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          activeFeature === index 
                            ? 'bg-indigo-600 scale-125' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Journey of
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"> Innovation</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to industry leader
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-200 to-purple-200" />
              
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year}
                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Milestone Card */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8 md:pr-16' : 'pl-8 md:pl-16'}`}>
                      <div className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
                        index === milestones.length - 1 ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
                      }`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-indigo-50' : 'bg-purple-50'}`}>
                            <span className={`text-2xl font-bold ${index % 2 === 0 ? 'text-indigo-600' : 'text-purple-600'}`}>
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg ${
                        index === milestones.length - 1 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse' 
                          : 'bg-gray-300'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Core
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"> Principles</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The values that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamPrinciples.map((principle, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-200 group-hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                      {principle.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                    <p className="text-gray-600">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Lending Operations?
                </h2>
                <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                  Join hundreds of microfinance institutions already using LoanLink
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    Get Started Free
                  </button>
                  <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
                    Book a Consultation
                  </button>
                </div>
                
                <div className="mt-10 text-indigo-200 text-sm flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-4 w-4" />
                    Enterprise-grade security
                  </div>
                  <div className="flex items-center gap-2">
                    <DevicePhoneMobileIcon className="h-4 w-4" />
                    Mobile-first design
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudArrowUpIcon className="h-4 w-4" />
                    99.9% uptime guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">LoanLink</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Empowering microfinance institutions worldwide with cutting-edge loan management technology
            </p>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} LoanLink. All rights reserved. | Made with ❤️ for financial inclusion
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        
        .animate-progress {
          animation: progress 2s ease-out forwards;
          animation-delay: var(--delay);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;