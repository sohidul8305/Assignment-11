import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaUserTie, FaBusinessTime, FaHome, FaGraduationCap } from 'react-icons/fa';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const testimonialRef = useRef(null);

  // 🔥 testimonial array টি সবচেয়ে উপরে রাখুন
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      avatar: "RK",
      rating: 5,
      content: "The business loan process was incredibly smooth. I got ₹50 lakhs within 3 days to expand my restaurant. The interest rate was lower than any bank I approached.",
      loanType: "Business Loan",
      loanAmount: "₹50 Lakhs",
      tenure: "5 Years",
      icon: <FaBusinessTime />,
      color: "from-blue-500 to-cyan-500",
      date: "2 months ago"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Home Buyer",
      avatar: "PS",
      rating: 5,
      content: "As a first-time home buyer, I was nervous about the process. But the team guided me through every step. Got my home loan approved in just 7 days!",
      loanType: "Home Loan",
      loanAmount: "₹75 Lakhs",
      tenure: "20 Years",
      icon: <FaHome />,
      color: "from-green-500 to-emerald-500",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Medical Student",
      avatar: "AP",
      rating: 4,
      content: "Studying abroad seemed impossible until I discovered their education loan. They covered my entire tuition and living expenses. The moratorium period is a lifesaver!",
      loanType: "Education Loan",
      loanAmount: "₹35 Lakhs",
      tenure: "10 Years",
      icon: <FaGraduationCap />,
      color: "from-purple-500 to-pink-500",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Corporate Employee",
      avatar: "SR",
      rating: 5,
      content: "Needed urgent funds for a family emergency. The personal loan was approved in 24 hours with minimal documentation. Truly a lifesaver!",
      loanType: "Personal Loan",
      loanAmount: "₹8 Lakhs",
      tenure: "3 Years",
      icon: <FaUserTie />,
      color: "from-amber-500 to-orange-500",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Startup Founder",
      avatar: "VS",
      rating: 5,
      content: "Got funding for my tech startup when traditional banks said no. The collateral-free business loan helped us scale to the next level.",
      loanType: "Startup Loan",
      loanAmount: "₹1.2 Crores",
      tenure: "7 Years",
      icon: <FaBusinessTime />,
      color: "from-indigo-500 to-violet-500",
      date: "2 weeks ago"
    },
    {
      id: 6,
      name: "Neha Gupta",
      role: "Car Buyer",
      avatar: "NG",
      rating: 4,
      content: "Zero down payment car loan with 100% financing! Drove home my dream SUV without touching my savings. Excellent service!",
      loanType: "Car Loan",
      loanAmount: "₹15 Lakhs",
      tenure: "5 Years",
      icon: <FaUserTie />,
      color: "from-red-500 to-rose-500",
      date: "4 days ago"
    }
  ];

  const stats = [
    { value: "4.9/5", label: "Customer Rating", sublabel: "Based on 2,500+ reviews" },
    { value: "98%", label: "Approval Rate", sublabel: "Highest in the industry" },
    { value: "24 hrs", label: "Average Processing", sublabel: "For most loan types" },
    { value: "50K+", label: "Happy Customers", sublabel: "Across India" }
  ];

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

    const element = testimonialRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <FaStar
          key={index}
          className={`w-4 h-4 ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <section 
      ref={testimonialRef}
      className="py-16 md:py-24 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Real stories from real people who transformed their lives with our loan services
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 md:mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="card-body items-center text-center p-4 md:p-6">
                <div className="stat-value text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="stat-title text-base md:text-lg font-semibold">
                  {stat.label}
                </div>
                <div className="stat-desc text-sm text-base-content/60">
                  {stat.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-12 md:mb-20">
          
          {/* Large Testimonial Card */}
          {testimonials.length > 0 && (
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  
                  {/* Left Side - Customer Info */}
                  <div className={`p-8 md:p-12 bg-gradient-to-br ${testimonials[activeIndex].color} text-white relative overflow-hidden`}>
                    {/* Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-32 translate-x-32"></div>
                      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/20 translate-y-48 -translate-x-48"></div>
                    </div>

                    <div className="relative z-10">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <FaQuoteLeft className="w-8 h-8 md:w-12 md:h-12 opacity-50" />
                      </div>

                      {/* Customer Avatar */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl md:text-3xl font-bold backdrop-blur-sm">
                          {testimonials[activeIndex].avatar}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold">
                            {testimonials[activeIndex].name}
                          </h3>
                          <p className="text-white/80">
                            {testimonials[activeIndex].role}
                          </p>
                        </div>
                      </div>

                      {/* Ratings */}
                      <div className="flex items-center gap-2 mb-4">
                        {renderStars(testimonials[activeIndex].rating)}
                        <span className="ml-2 text-white/80">
                          {testimonials[activeIndex].rating}.0/5.0
                        </span>
                      </div>

                      {/* Loan Details */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 mt-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            {testimonials[activeIndex].icon}
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {testimonials[activeIndex].loanType}
                            </div>
                            <div className="text-sm text-white/80">
                              {testimonials[activeIndex].date}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {testimonials[activeIndex].loanAmount}
                            </div>
                            <div className="text-sm text-white/80">Loan Amount</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {testimonials[activeIndex].tenure}
                            </div>
                            <div className="text-sm text-white/80">Tenure</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Testimonial Content */}
                  <div className="p-8 md:p-12">
                    <div className="h-full flex flex-col justify-center">
                      <h4 className="text-xl md:text-2xl font-bold text-base-content mb-6">
                        Success Story
                      </h4>
                      
                      <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                        "{testimonials[activeIndex].content}"
                      </p>

                      {/* Verification Badge */}
                      <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-base-content/60">
                          Verified Customer • Real Transaction
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {["Quick Approval", "Low Interest", "Great Service", "Easy Process"].map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-base-200 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="btn btn-circle btn-outline btn-lg"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-primary scale-125'
                      : 'bg-base-300 hover:bg-base-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="btn btn-circle btn-outline btn-lg"
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Autoplay Toggle */}
          <div className="text-center mt-4">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className="btn btn-sm btn-ghost text-base-content/60"
            >
              {autoplay ? '⏸️ Pause' : '▶️ Play'} Auto Play
            </button>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                index === activeIndex ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="card-body p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-base-content/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>

                {/* Content */}
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  "{testimonial.content}"
                </p>

                {/* Loan Info */}
                <div className="flex items-center justify-between pt-4 border-t border-base-300">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${testimonial.color}/20 flex items-center justify-center ${testimonial.color.split(' ')[1].replace('to-', 'text-')}`}>
                      {testimonial.icon}
                    </div>
                    <span className="text-sm font-medium">{testimonial.loanType}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{testimonial.loanAmount}</div>
                    <div className="text-xs text-base-content/60">{testimonial.tenure}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-base-200 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-6">
              Trusted by <span className="text-primary">Thousands</span> of Customers
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { value: "4.8", label: "Google Reviews", icon: "⭐" },
                { value: "4.9", label: "Trustpilot", icon: "🏆" },
                { value: "A+", label: "BBB Rating", icon: "📈" },
                { value: "99%", label: "Recommend Us", icon: "💯" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {item.icon} {item.value}
                  </div>
                  <div className="text-base-content/70">{item.label}</div>
                </div>
              ))}
            </div>

            <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
              Join our community of satisfied customers who have achieved their financial goals
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg rounded-full px-8">
                Read More Reviews
              </button>
              <button className="btn btn-outline btn-lg rounded-full px-8">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;