import React, { useEffect, useRef } from 'react';
import HeroBanner from '../../components/Banner/HeroBanner';
import Available from '../../components/Available/Available';
import HowItWorksSection from '../../components/How to Work/HowItWorksSection';
import Features from '../../components/Features/Features';
import Services from '../../components/Services/Services';
import WhyChooseUs from '../../components/Whyhoose/WhyChooseUs';
import Testimonials from '../../components/Testimonials/Testimonials';
import CustomerFeedback from '../../Customereview/CustomerFeedback';
import OurPartners from '../../components/OurPartners/OurPartners';
import Blogs from '../../components/Blogs/Blogs';

const Home = () => {
  const howItWorksRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50" 
           style={{ width: '100%' }}>
        <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300" 
             style={{ width: '0%' }} 
             id="progress-bar"></div>
      </div>

      {/* Section 1: Hero Banner */}
      <section id="hero" className="scroll-mt-20">
        <HeroBanner
          onExploreLoans={() => scrollToSection('available-loans')}
          onHowItWorks={() => scrollToSection('how-it-works')}
        />
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>

      {/* Section 2: Available Loans */}
      <section id="available-loans" className="scroll-mt-20 bg-base-100">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-base-100/95 to-base-100"></div>
          <div className="relative z-10">
            <Available />
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="overflow-hidden">
        <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-base-200"></path>
        </svg>
      </div>

      {/* Section 3: How It Works */}
      <section id="how-it-works" ref={howItWorksRef} className="scroll-mt-20 bg-base-200">
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <HowItWorksSection />
          </div>
        </div>
      </section>

      {/* Gradient Transition */}
      <div className="h-2 bg-gradient-to-r from-base-200 via-base-100 to-base-100"></div>

      {/* Section 4: Features */}
      <section id="features" className="scroll-mt-20 bg-base-100">
        <Features />
      </section>

      {/* Diagonal Divider */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-base-100 to-base-200 skew-y-3 transform -translate-y-12"></div>
      </div>

      {/* Section 5: Services */}
      <section id="services" ref={servicesRef} className="scroll-mt-20 bg-base-200">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="relative z-10">
            <Services />
          </div>
        </div>
      </section>

      {/* Curve Divider */}
      <div className="overflow-hidden">
        <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                className="fill-base-100" opacity=".25"></path>
        </svg>
      </div>

      {/* Section 6: Why Choose Us */}
      <section id="why-choose-us" className="scroll-mt-20 bg-base-100">
        <WhyChooseUs />
      </section>

      {/* Zigzag Divider */}
      <div className="relative h-12 overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,70 C150,30 350,110 500,70 L500,100 L0,100 Z" fill="currentColor" className="text-base-200"></path>
          </svg>
        </div>
      </div>

      {/* Section 7: Testimonials */}
      <section id="testimonials" ref={testimonialsRef} className="scroll-mt-20 bg-base-200">
        <div className="relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full"></div>
          
          <div className="relative z-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Wave Transition */}
      <div className="overflow-hidden bg-base-200">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                className="fill-base-100"></path>
        </svg>
      </div>

      {/* Section 8: Customer Feedback */}
      <section id="customer-feedback" className="scroll-mt-20 bg-base-100">
        <CustomerFeedback />
      </section>

      {/* Dots Pattern Divider */}
      <div className="h-12 bg-base-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary/30"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 9: Our Partners */}
      <section id="partners" className="scroll-mt-20 bg-base-200">
        <OurPartners />
      </section>

      {/* Blur Transition */}
      <div className="h-8 bg-gradient-to-b from-base-200 to-base-100/50 backdrop-blur-sm"></div>

      {/* Section 10: Blogs */}
      <section id="blogs" className="scroll-mt-20 bg-base-100">
        <Blogs />
      </section>



      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 z-40 flex items-center justify-center"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Progress Bar Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('progress-bar').style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  );
};

export default Home;