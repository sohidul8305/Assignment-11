import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

// ⚠️ Note: For actual use, you must replace this placeholder with your imported image variable 
// or a path relative to your public folder.
const PLACEHOLDER_IMG_URL = "https://yourwebsite.com/assets/banner/loan_hero_image.jpg"; 
// **অথবা আপনার ইমপোর্ট করা ভেরিয়েবল ব্যবহার করুন: const bannerImg = require('../../assets/Banner/loan1.jpg');**

const slides = [
  { 
    // প্লেসহোল্ডার URL ব্যবহার করা হলো
    img: PLACEHOLDER_IMG_URL, 
    title: "EMPOWER YOUR FUTURE", 
    description: "Invest in Your Dreams, Today. Unlock your potential with our accessible community loans. Flexible terms, low interest, and a path to success.", 
    ctaText: "APPLY FOR LOAN", 
    ctaLink: "/loan-application-form",
  },
];

const Banner = () => {
  // ডিজাইন ক্লাস: আকর্ষণীয় ফন্ট, শ্যাডো, এবং গ্র্যাডিয়েন্ট ওভারলে
  const overlayStyle = "absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 bg-black bg-opacity-50 space-y-4";
  const titleClass = "text-4xl md:text-7xl lg:text-8xl font-black mb-1 tracking-tight drop-shadow-2xl max-w-5xl leading-tight";
  const subTitleClass = "text-2xl md:text-3xl font-serif italic mb-6 drop-shadow-md";
  const descriptionClass = "text-lg md:text-xl max-w-4xl font-light opacity-90 leading-relaxed";

  return (
    <div className="banner-section">
      <Carousel
        autoPlay={true} 
        infiniteLoop={true} 
        showStatus={false} 
        showThumbs={false} 
        showIndicators={true} 
        interval={5000} 
        stopOnHover={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] md:h-[90vh] lg:h-screen">
            <img 
              src={slide.img} 
              alt={slide.title} 
              className="w-full h-full object-cover" 
            />
            <div className={overlayStyle}>
              
              <div className="bg-black bg-opacity-30 p-8 md:p-12 rounded-xl backdrop-blur-sm max-w-6xl w-full">
                
                {/* Main Title */}
                <h2 className={titleClass}>{slide.title}</h2>
                
                {/* Subtitle / Catchphrase */}
                <h3 className={subTitleClass}>{slide.description.split('.')[0]}</h3> 
                
                {/* Description Text */}
                <p className={descriptionClass}>
                    {slide.description.split('.').slice(1).join('.').trim()}
                </p>
                
                <div className="mt-12">
                  {/* Single CTA Button with Gradient Effect */}
                  <a
                    href={slide.ctaLink} 
                    className="inline-block bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-extrabold py-4 px-16 rounded-full text-xl shadow-2xl transition duration-300 transform hover:scale-105 uppercase tracking-widest border-2 border-white/50"
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;