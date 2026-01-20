import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icons (React Icons ব্যবহার করতে পারেন অথবা SVG)
import { 
  FaShieldAlt, 
  FaBolt, 
  FaChartLine, 
  FaHandshake, 
  FaUserFriends, 
  FaMobileAlt,
  FaLock,
  FaPercent
} from 'react-icons/fa';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const features = [
    {
      id: 1,
      icon: <FaBolt className="text-3xl md:text-4xl" />,
      title: "Lightning Fast Approval",
      description: "Get loan approval within 24 hours with our automated processing system. No long waiting periods.",
      stats: "24-hour approval",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      details: [
        "Digital application process",
        "AI-powered verification",
        "Instant eligibility check"
      ]
    },
    {
      id: 2,
      icon: <FaPercent className="text-3xl md:text-4xl" />,
      title: "Lowest Interest Rates",
      description: "Starting from 5.9% APR. We offer the most competitive rates in the market with transparent pricing.",
      stats: "From 5.9% APR",
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      details: [
        "No hidden charges",
        "Flexible repayment options",
        "Rate match guarantee"
      ]
    },
    {
      id: 3,
      icon: <FaShieldAlt className="text-3xl md:text-4xl" />,
      title: "Bank-Level Security",
      description: "Your data is protected with 256-bit encryption and multi-factor authentication for complete safety.",
      stats: "100% Secure",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      details: [
        "SSL encrypted connection",
        "GDPR compliant",
        "Regular security audits"
      ]
    },
    {
      id: 4,
      icon: <FaHandshake className="text-3xl md:text-4xl" />,
      title: "Flexible Repayment",
      description: "Choose from multiple repayment plans. Adjust your EMI according to your financial situation.",
      stats: "Flexible EMI",
      color: "from-amber-500 to-orange-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
      details: [
        "EMI holiday option",
        "Part-prepayment facility",
        "Tenure adjustment"
      ]
    },
    {
      id: 5,
      icon: <FaUserFriends className="text-3xl md:text-4xl" />,
      title: "Personalized Service",
      description: "Dedicated relationship manager and 24/7 customer support for all your loan-related queries.",
      stats: "24/7 Support",
      color: "from-red-500 to-rose-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      details: [
        "Personal loan advisor",
        "Multilingual support",
        "WhatsApp banking"
      ]
    },
    {
      id: 6,
      icon: <FaMobileAlt className="text-3xl md:text-4xl" />,
      title: "Mobile First Experience",
      description: "Complete loan journey on your mobile. Apply, track, and manage your loan from anywhere.",
      stats: "Mobile App",
      color: "from-indigo-500 to-violet-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      details: [
        "Paperless processing",
        "Digital signatures",
        "Real-time tracking"
      ]
    }
  ];

  return (
    <section 
      id="features-section" 
      className="py-16 md:py-24 bg-base-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">WHY CHOOSE US</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            Features That <span className="text-primary">Set Us Apart</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Experience loan processing like never before with our innovative features designed for your convenience
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: "50K+", label: "Happy Customers" },
            { number: "₹500Cr+", label: "Loan Disbursed" },
            { number: "98%", label: "Approval Rate" },
            { number: "4.9/5", label: "Customer Rating" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="card-body items-center text-center p-4">
                <div className="stat-value text-2xl md:text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="stat-desc text-sm md:text-base text-base-content/70">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
              onClick={() => setActiveFeature(index)}
            >
              <div className={`
                relative h-full p-6 md:p-8 rounded-2xl border-2 
                ${feature.borderColor} ${feature.bgColor}
                transition-all duration-500
                ${activeFeature === index 
                  ? 'scale-[1.02] shadow-2xl' 
                  : 'hover:scale-[1.01] hover:shadow-xl'
                }
                overflow-hidden
              `}>
                
                {/* Background Gradient */}
                <div className={`
                  absolute top-0 right-0 w-32 h-32 rounded-full 
                  bg-gradient-to-br ${feature.color} opacity-10 
                  group-hover:opacity-20 transition-opacity duration-500
                  ${activeFeature === index ? 'opacity-20' : ''}
                `}></div>

                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-2xl mb-6 flex items-center justify-center
                  bg-gradient-to-br ${feature.color} text-white
                  shadow-lg group-hover:shadow-xl transition-all duration-500
                  ${activeFeature === index ? 'scale-110 rotate-3' : ''}
                `}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-base-content mb-3">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 mb-4">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className={`
                  inline-block px-4 py-2 rounded-full
                  bg-gradient-to-r ${feature.color} text-white
                  text-sm font-semibold mb-4
                `}>
                  {feature.stats}
                </div>

                {/* Feature Details (Show on hover/active) */}
                <div className={`
                  transition-all duration-500 overflow-hidden
                  ${activeFeature === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="pt-4 border-t border-base-300/50">
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                          <span className="text-base-content/80">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1 
                  bg-gradient-to-r ${feature.color}
                  transition-transform duration-500
                  ${activeFeature === index ? 'scale-x-100' : 'scale-x-0'}
                `}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Feature Showcase */}
        <div className={`mt-16 md:mt-24 bg-base-200 rounded-3xl p-6 md:p-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">
                Experience the Future of <span className="text-primary">Digital Lending</span>
              </h3>
              <p className="text-base-content/70 mb-6">
                Our platform combines cutting-edge technology with human expertise to 
                provide you with the best loan experience. From application to disbursement, 
                we're with you at every step.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "100% online application process",
                  "Real-time loan tracking dashboard",
                  "Instant document verification",
                  "AI-based credit assessment"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-base-content/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/loan-applications">
                  <button className="btn btn-primary btn-lg rounded-full px-8">
                    Start Your Application
                  </button>
                </Link>
                <Link to="/calculator">
                  <button className="btn btn-outline btn-lg rounded-full px-8">
                    Calculate EMI
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Animated Phone Mockup */}
              <div className="relative mx-auto max-w-xs">
                <div className="bg-base-300 rounded-[2rem] p-4 shadow-2xl">
                  {/* Phone Screen */}
                  <div className="bg-base-100 rounded-2xl p-4 h-64 overflow-hidden relative">
                    {/* Animated Loan Progress */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          {/* Progress Circle */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="60"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              className="text-base-300"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="60"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray="377"
                              strokeDashoffset="113"
                              className="text-primary animate-progress"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">75%</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-base-content">Application Progress</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone Button */}
                  <div className="flex justify-center mt-4">
                    <div className="w-12 h-1 bg-base-content/30 rounded-full"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg animate-bounce">
                  <FaBolt className="text-white text-sm" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg animate-bounce delay-100">
                  <FaLock className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-base-content/60 mb-6">Trusted by leading institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            {["🏦", "🔒", "⭐", "📱", "💳", "🏆"].map((icon, index) => (
              <div 
                key={index}
                className="text-3xl md:text-4xl hover:scale-110 transition-transform duration-300"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;