import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBusinessTime, 
  FaGraduationCap, 
  FaHome, 
  FaCar, 
  FaStethoscope,
  FaChartLine,
  FaCreditCard,
  FaHandHoldingUsd,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaMobileAlt
} from 'react-icons/fa';

const Services = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

    const element = document.getElementById('services-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const services = [
    {
      id: 1,
      icon: <FaBusinessTime className="text-3xl" />,
      title: "Business Loans",
      description: "Fuel your business growth with flexible financing options tailored for entrepreneurs and SMEs.",
      features: [
        "Up to ₹5 Crores",
        "12-60 Months Tenure",
        "Collateral Optional"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      eligibility: "Business vintage: 2+ years",
      processingTime: "3-5 business days",
      route: "/loans/business"
    },
    {
      id: 2,
      icon: <FaHome className="text-3xl" />,
      title: "Home Loans",
      description: "Turn your dream home into reality with attractive interest rates and flexible repayment options.",
      features: [
        "Up to ₹10 Crores",
        "Up to 30 Years",
        "Balance Transfer"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      eligibility: "Stable income source",
      processingTime: "7-10 business days",
      route: "/loans/home"
    },
    {
      id: 3,
      icon: <FaCar className="text-3xl" />,
      title: "Car Loans",
      description: "Drive home your dream car with our quick approval process and competitive interest rates.",
      features: [
        "Up to 100% Funding",
        "1-7 Years Tenure",
        "Zero Down Payment"
      ],
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
      eligibility: "Age: 21-65 years",
      processingTime: "1-2 business days",
      route: "/loans/car"
    },
    {
      id: 4,
      icon: <FaGraduationCap className="text-3xl" />,
      title: "Education Loans",
      description: "Invest in your future with education loans for domestic and international studies.",
      features: [
        "Up to ₹1.5 Crores",
        "Moratorium Period",
        "Tax Benefits"
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      eligibility: "Admission in recognized institute",
      processingTime: "5-7 business days",
      route: "/loans/education"
    },
    {
      id: 5,
      icon: <FaStethoscope className="text-3xl" />,
      title: "Medical Loans",
      description: "Immediate financial assistance for medical emergencies and planned treatments.",
      features: [
        "Instant Approval",
        "No Prepayment Charges",
        "Cashless Treatment"
      ],
      color: "from-red-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      eligibility: "Medical necessity",
      processingTime: "24-48 hours",
      route: "/loans/medical"
    },
    {
      id: 6,
      icon: <FaChartLine className="text-3xl" />,
      title: "Personal Loans",
      description: "Meet your personal financial needs with quick disbursal and minimal documentation.",
      features: [
        "Up to ₹25 Lakhs",
        "Flexible Tenure",
        "No Collateral"
      ],
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      eligibility: "Monthly income: ₹25,000+",
      processingTime: "2-3 business days",
      route: "/loans/personal"
    }
  ];

  const additionalServices = [
    {
      icon: <FaCreditCard className="text-2xl" />,
      title: "Credit Cards",
      description: "Premium cards with exclusive benefits"
    },
    {
      icon: <FaHandHoldingUsd className="text-2xl" />,
      title: "Loan Against Property",
      description: "Leverage your property for funds"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Insurance",
      description: "Comprehensive coverage plans"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Pre-approved Offers",
      description: "Instant loans for eligible customers"
    }
  ];

  const handleServiceClick = (route) => {
    navigate(route);
  };

  return (
    <section 
      id="services-section" 
      className="py-16 md:py-24 bg-base-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">OUR SERVICES</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            Comprehensive <span className="text-primary">Loan Solutions</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
            Choose from our wide range of financial products designed to meet every need
          </p>
          
          {/* Service Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
            {[
              { icon: <FaUsers />, label: "10K+ Customers" },
              { icon: <FaShieldAlt />, label: "100% Secure" },
              { icon: <FaClock />, label: "24/7 Support" },
              { icon: <FaMobileAlt />, label: "Digital Process" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 px-4 py-2 bg-base-200 rounded-full"
              >
                <div className="text-primary">
                  {stat.icon}
                </div>
                <span className="font-medium text-base-content">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveService(index)}
            >
              <div className={`
                relative h-full rounded-2xl border-2 overflow-hidden
                ${service.borderColor}
                ${service.bgColor}
                transition-all duration-500
                ${hoveredCard === service.id || activeService === index 
                  ? 'scale-[1.02] shadow-2xl' 
                  : 'shadow-lg hover:shadow-xl'
                }
                group cursor-pointer
              `}>
                
                {/* Animated Background */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${service.color} opacity-0
                  group-hover:opacity-5 transition-opacity duration-500
                  ${activeService === index ? 'opacity-10' : ''}
                `}></div>

                {/* Ribbon for Popular Services */}
                {(service.id === 1 || service.id === 6) && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Service Header */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center
                      bg-gradient-to-br ${service.color} text-white
                      shadow-lg transform transition-all duration-500
                      ${hoveredCard === service.id ? 'scale-110 rotate-12' : ''}
                    `}>
                      {service.icon}
                    </div>
                    
                    {/* Quick Apply Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.route);
                      }}
                      className="btn btn-sm md:btn-md btn-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
                    >
                      Apply Now
                    </button>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-base-content/70 mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span className="text-sm md:text-base font-medium text-base-content/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Service Details */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-base-300/50">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-base-content/60" />
                      <span className="text-sm text-base-content/70">{service.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-base-content/60" />
                      <span className="text-sm text-base-content/70">{service.eligibility}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Footer */}
                <div className={`
                  px-6 md:px-8 py-4 bg-base-200/50
                  border-t border-base-300/50
                  transition-all duration-500
                  ${hoveredCard === service.id ? 'h-16 opacity-100' : 'h-0 opacity-0'}
                  overflow-hidden
                `}>
                  <div className="flex items-center justify-between">
                    <Link 
                      to={service.route}
                      className="text-primary font-medium hover:underline"
                    >
                      View Details →
                    </Link>
                    <button 
                      onClick={() => handleServiceClick(service.route)}
                      className="btn btn-primary btn-sm rounded-full"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-base-content mb-8">
            Additional <span className="text-primary">Financial Services</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="card-body items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <h4 className="card-title text-lg font-bold">{service.title}</h4>
                  <p className="text-base-content/70 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Comparison Table */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-base-content mb-8">
            Quick <span className="text-primary">Comparison</span>
          </h3>
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="table w-full">
              {/* Table Head */}
              <thead>
                <tr className="bg-base-200">
                  <th className="text-left p-4 md:p-6">Service</th>
                  <th className="text-center p-4 md:p-6">Interest Rate</th>
                  <th className="text-center p-4 md:p-6">Max Amount</th>
                  <th className="text-center p-4 md:p-6">Processing Time</th>
                  <th className="text-center p-4 md:p-6">Action</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {services.slice(0, 4).map((service) => (
                  <tr key={service.id} className="hover:bg-base-200/50 transition-colors">
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white`}>
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-bold">{service.title}</div>
                          <div className="text-sm text-base-content/70">{service.eligibility}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4 md:p-6">
                      <div className="font-bold text-primary">From 5.9%</div>
                      <div className="text-sm text-base-content/70">p.a.</div>
                    </td>
                    <td className="text-center p-4 md:p-6">
                      <div className="font-bold">₹{service.features[0].replace('Up to ', '')}</div>
                    </td>
                    <td className="text-center p-4 md:p-6">
                      <div className="font-bold">{service.processingTime}</div>
                    </td>
                    <td className="text-center p-4 md:p-6">
                      <button 
                        onClick={() => handleServiceClick(service.route)}
                        className="btn btn-primary btn-sm rounded-full"
                      >
                        Apply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who have achieved their financial goals with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/loan-applications">
                <button className="btn btn-primary btn-lg md:btn-xl rounded-full px-8 md:px-12">
                  Apply for Loan Now
                </button>
              </Link>
              <Link to="/calculator">
                <button className="btn btn-outline btn-lg md:btn-xl rounded-full px-8 md:px-12">
                  Calculate Your EMI
                </button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-base-content/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Hidden Charges</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>100% Online Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Instant Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;