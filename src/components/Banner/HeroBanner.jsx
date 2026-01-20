import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Hero Images
import heroImage1 from "../../assets/loan2.jpg";
import heroImage2 from "../../assets/loan2.jpg";
import heroImage3 from "../../assets/loan3.jpg";

const HeroBanner = () => {
  const navigate = useNavigate();
  const nextSectionRef = useRef(null);
  
  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      image: heroImage1,
      title: "EMPOWER YOUR FUTURE",
      subtitle: "Invest in Your Dreams, Today",
      description: "Unlock your potential with our accessible community loans. Flexible terms, low interest, and a path to success.",
      buttonText: "APPLY FOR LOAN",
      buttonLink: "/loan-applications",
      bgColor: "from-blue-900/70 to-purple-900/50",
      badge: "NEW",
      arrowColor: "text-blue-300"
    },
    {
      id: 2,
      image: heroImage2,
      title: "SMART FINANCING SOLUTIONS",
      subtitle: "Tailored for Your Needs",
      description: "Get personalized loan options with competitive rates. Our AI-powered platform finds the best fit for you.",
      buttonText: "EXPLORE OPTIONS",
      buttonLink: "/all-loans",
      bgColor: "from-emerald-900/70 to-cyan-900/50",
      badge: "POPULAR",
      arrowColor: "text-emerald-300"
    },
    {
      id: 3,
      image: heroImage3,
      title: "QUICK APPROVAL PROCESS",
      subtitle: "Fast & Hassle-Free",
      description: "Experience our streamlined application process. Get approved in as little as 24 hours with minimal documentation.",
      buttonText: "CHECK ELIGIBILITY",
      buttonLink: "/loan-applications",
      bgColor: "from-amber-900/70 to-orange-900/50",
      badge: "FAST",
      arrowColor: "text-amber-300"
    }
  ];

  // State for slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto slide change
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Scroll progress animation
  useEffect(() => {
    const handleScroll = () => {
      if (nextSectionRef.current) {
        const rect = nextSectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(100, (1 - rect.top / window.innerHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Scroll to next section
  const scrollToNextSection = () => {
    setIsScrolling(true);
    
    // Animated scroll
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Visual feedback
      setTimeout(() => {
        // Highlight the next section briefly
        nextSection.classList.add('highlight-section');
        setTimeout(() => {
          nextSection.classList.remove('highlight-section');
          setIsScrolling(false);
        }, 2000);
      }, 500);
    }
  };

  // Current slide
  const currentHero = heroSlides[currentSlide];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden group transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
          '--tw-gradient-from': currentSlide === 0 ? 'rgba(30, 58, 138, 0.7)' : 
                               currentSlide === 1 ? 'rgba(6, 78, 59, 0.7)' : 
                               'rgba(120, 53, 15, 0.7)',
          '--tw-gradient-to': currentSlide === 0 ? 'rgba(88, 28, 135, 0.5)' : 
                             currentSlide === 1 ? 'rgba(14, 116, 144, 0.5)' : 
                             'rgba(194, 65, 12, 0.5)'
        }}
      >
        
        {/* Slider Container */}
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
                index === currentSlide 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-105"
              }`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}></div>
              
              {/* Animated Elements that lead to next section */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Floating particles that move downward */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full animate-float-down"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Flow Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100 to-transparent pointer-events-none"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            
            {/* Animated Arrow pointing down */}
            <div className="absolute -top-4 md:-top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className={`text-3xl ${currentHero.arrowColor} opacity-50`}>
                ↓
              </div>
            </div>

            {/* Main Content */}
            <div className="transform transition-all duration-700 hover:scale-105">
              {/* Badge */}
              {currentHero.badge && (
                <div className="inline-block mb-4 md:mb-6 animate-pulse">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm md:text-base font-semibold border border-white/30">
                    {currentHero.badge}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
                {currentHero.title}
              </h1>

              {/* Subtitle with underline pointing down */}
              <div className="relative inline-block mb-3">
                <h2 className="text-xl md:text-2xl lg:text-3xl text-amber-300 font-bold">
                  {currentHero.subtitle}
                </h2>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-amber-400 rounded-full"></div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rotate-45"></div>
              </div>

              {/* Description */}
              <p className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
                {currentHero.description}
              </p>

              {/* CTA Buttons with Visual Flow */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8">
                <Link to={currentHero.buttonLink}>
                  <button className="btn btn-primary btn-lg md:btn-xl rounded-full px-8 md:px-12 py-4 text-white font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group/btn">
                    <span className="flex items-center gap-3">
                      {currentHero.buttonText}
                      <svg 
                        className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Progress Indicator to Next Section */}
            <div className="mt-12 md:mt-16 max-w-md mx-auto">
              <div className="relative">
                {/* Progress bar */}
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-transparent via-amber-400 to-amber-300 transition-all duration-500"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
                
                {/* Scroll hint */}
                <button
                  onClick={scrollToNextSection}
                  disabled={isScrolling}
                  className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all duration-300 ${
                    isScrolling ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                  }`}
                  aria-label="Scroll to next section"
                >
                  <span className="text-sm font-medium">Discover More</span>
                  <div className={`relative w-10 h-10 ${isScrolling ? 'animate-spin' : 'animate-bounce'}`}>
                    <svg 
                      className="w-full h-full" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                      />
                    </svg>
                    {/* Pulsing ring */}
                    {!isScrolling && (
                      <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping"></div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Flow Arrows */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2">
            {/* Animated chevrons */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 border-b-2 border-r-2 border-white/60 transform rotate-45 animate-chevron-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
          {/* Previous Button */}
          <button
            onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
            className="btn btn-circle btn-outline btn-sm md:btn-md text-white border-white/50 hover:bg-white/20 hover:border-white transition-all duration-300"
          >
            ←
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2 md:gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
            className="btn btn-circle btn-outline btn-sm md:btn-md text-white border-white/50 hover:bg-white/20 hover:border-white transition-all duration-300"
          >
            →
          </button>
        </div>

        {/* Visual Flow Line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-20 w-px bg-gradient-to-t from-white/50 via-white/20 to-transparent"></div>
      </section>

      {/* Transition Section */}
      <div 
        ref={nextSectionRef}
        className="relative h-4 bg-gradient-to-b from-transparent via-base-100/80 to-base-100"
        aria-hidden="true"
      >
        {/* Decorative wave */}
        <div className="absolute -top-8 left-0 right-0 h-8 overflow-hidden">
          <svg 
            className="absolute bottom-0 w-full h-full" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              className="fill-base-100"
            ></path>
          </svg>
        </div>
      </div>

     
    </>
  );
};

export default HeroBanner;