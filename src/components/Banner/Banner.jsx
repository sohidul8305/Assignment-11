import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

// ⚠️ Note: For actual use, you must replace this placeholder with your imported image variable 
// or a path relative to your public folder.
const PLACEHOLDER_IMG_URL = "https://yourwebsite.com/assets/banner/loan_hero_image.jpg"; 

const slides = [
  { 
    img: PLACEHOLDER_IMG_URL,
    title: "EMPOWER YOUR FUTURE", 
    description: "Invest in Your Dreams, Today. Unlock your potential with our accessible community loans. Flexible terms, low interest, and a path to success.", 
    // প্রথম বাটন (Apply)
    ctaPrimary: {
        // ⭐⭐ শুধুমাত্র এই বাটনটি রাখা হলো
        text: "APPLY FOR LOAN", 
        link: "/loan-application-form",
    },
    // দ্বিতীয় বাটন (Explore) - এটি ডাটা থেকে বাদ দেওয়া হলো।
    // ctaSecondary: {
    //     text: "EXPLORE LOANS", 
    //     link: "/available-loans",
    // }
  },
];

const Banner = () => {
  // ডিজাইন ক্লাস: আকর্ষণীয় ফন্ট, শ্যাডো, এবং গ্র্যাডিয়েন্ট ওভারলে
  const overlayStyle = "absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 bg-black bg-opacity-50 space-y-4";
  const titleClass = "text-4xl md:text-7xl lg:text-8xl font-black mb-1 tracking-tight drop-shadow-2xl max-w-5xl leading-tight";
  const subTitleClass = "text-2xl md:text-3xl font-serif italic mb-6 drop-shadow-md";
  const descriptionClass = "text-lg md:text-xl max-w-4xl font-light opacity-90 leading-relaxed";

  // PRIMARY বাটন ক্লাস (Solid Green)
  const primaryBtnClass = "bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 px-10 md:px-12 rounded-full text-xl shadow-2xl transition duration-300 transform hover:scale-105 uppercase tracking-widest border-2 border-green-600";

  // SECONDARY বাটন ক্লাস (Outlined White/Green) - ক্লাসটি অব্যবহৃত রাখা হলো।
  // const secondaryBtnClass = "bg-transparent hover:bg-white/10 text-white font-extrabold py-4 px-10 md:px-12 rounded-full text-xl shadow-2xl transition duration-300 transform hover:scale-105 uppercase tracking-widest border-2 border-white";


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
                
                {/* 🌟🌟🌟 দুটি বাটন (CTA) সেকশন - শুধুমাত্র Primary বাটন রাখা হলো 🌟🌟🌟 */}
                <div className="mt-12 flex justify-center space-x-6 md:space-x-10"> 
                  
                  {/* Primary Button: Apply for Loan (Solid Green) */}
                  <a
                    href={slide.ctaPrimary.link} 
                    className={primaryBtnClass}
                  >
                    {slide.ctaPrimary.text}
                  </a>

                  {/* Secondary Button: Explore Loans (Outlined White) - এটি বাদ দেওয়া হলো।
                  <a
                    href={slide.ctaSecondary.link} 
                    className={secondaryBtnClass}
                  >
                    {slide.ctaSecondary.text}
                  </a>
                    */}
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