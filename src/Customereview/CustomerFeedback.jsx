import React, { useState } from "react";

// 🌟 Local Assets Import (ছবি দেখানোর জন্য এইগুলি নিশ্চিত করুন)
// যদি আপনার এই ফোল্ডারে ছবি না থাকে, তবে আগের external URL ব্যবহার করুন।
import akhiImage from "../assets/Banner/akhi.1jpg.jpeg";
import rajuImage from "../assets/Banner/raju2.jpg";
import sumaiyaImage from "../assets/Banner/sumaiya3.jpg";


const CustomerFeedback = () => {
  // ১. বর্তমানে কোন ফিডব্যাকটি দেখানো হবে, তা ট্র‍্যাক করার জন্য State
  const [activeFeedback, setActiveFeedback] = useState(1);

  const feedbacks = [
    {
      id: 1,
      name: "Akhi Moni",
      review:
        "The NGO partner using LoanLink processed my application swiftly. I got the necessary microloan to start my tailoring business without any long bureaucratic hurdles. This system truly helps small entrepreneurs!",
      image: akhiImage,
      title: "Micro Entrepreneur",
      rating: 5,
    },
    {
      id: 2,
      name: "Raju Ahmed",
      review:
        "I was struggling to fund my children's education. Thanks to the educational loan facilitated here, they are now attending college. The process was transparent and the interest rate was manageable.",
      image: rajuImage,
      title: "Small Farmer",
      rating: 4,
    },
    {
      id: 3,
      name: "Sumaiya Binte",
      review:
        "LoanLink connects me with reliable partners. I secured a loan for expanding my poultry farm. This platform is a fantastic resource for community development and financial inclusion.",
      image: sumaiyaImage,
      title: "Poultry Farm Owner",
      rating: 5,
    },
  ];
  
  // বর্তমানে নির্বাচিত ফিডব্যাক ডেটা
  const currentReview = feedbacks.find(fb => fb.id === activeFeedback);

  // স্টার রেটিং কম্পোনেন্ট
  const StarRating = ({ count }) => (
    <div className="flex text-yellow-500 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-6 h-6 fill-current ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.64 7.558 8.358 1.213-6.046 5.892 1.427 8.324L12 18.896l-7.379 3.88 1.427-8.324L.002 9.358l8.358-1.213L12 .587z" />
        </svg>
      ))}
    </div>
  );

  return (
    // Outer Container: সেকশনটি মাঝখানে আনার জন্য
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        {/* হেডিং */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-12 text-gray-800">
          Success Stories: <span className="text-green-600">They Found Their Path</span> 💡
        </h2>

        {/* প্রধান কন্টেইনার: গ্রিড লেআউট */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* বাম দিক: ফিডব্যাক নেভিগেশন (ট্যাবস) */}
            <div className="lg:col-span-1 bg-green-700 p-6 md:p-8 space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-green-500/50 pb-2">Meet Our Achievers</h3>
              
              {feedbacks.map((fb) => (
                <button
                  key={fb.id}
                  onClick={() => setActiveFeedback(fb.id)}
                  // Active ও Inactive ট্যাবের জন্য আলাদা স্টাইল
                  className={`flex items-center w-full p-4 rounded-xl text-left transition duration-300 transform 
                    ${fb.id === activeFeedback
                      ? 'bg-white shadow-lg text-green-700 ring-2 ring-white scale-[1.02]'
                      : 'text-white/80 hover:bg-green-600/80 hover:text-white'
                    }
                  `}
                >
                  <img
                    src={fb.image}
                    alt={fb.name}
                    // ছোট, স্পষ্ট ছবি
                    className={`w-12 h-12 rounded-full object-cover mr-4 ${fb.id === activeFeedback ? 'border-2 border-green-500' : 'border border-white/50'}`}
                  />
                  <div>
                    <p className="font-semibold text-lg">{fb.name}</p>
                    <p className={`text-sm ${fb.id === activeFeedback ? 'text-gray-500' : 'text-white/70'}`}>{fb.title}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* ডান দিক: নির্বাচিত রিভিউ ডিসপ্লে */}
            <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center bg-white">
              {currentReview && (
                <div className="relative">
                    
                  {/* কোটেশন স্টাইল */}
                  <span className="absolute -top-10 left-0 text-9xl text-green-100 font-extrabold select-none">
                      “
                  </span>
                  
                  {/* রিভিউ টেক্সট */}
                  <p className="text-2xl md:text-3xl font-serif text-gray-700 leading-relaxed italic relative z-10 pl-8 pr-4">
                    {currentReview.review}
                  </p>

                  {/* রেটিং এবং তথ্য */}
                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <StarRating count={currentReview.rating} />
                    <p className="text-xl font-bold text-green-700">
                      — {currentReview.name}
                    </p>
                    <p className="text-md text-gray-500">
                      {currentReview.title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;