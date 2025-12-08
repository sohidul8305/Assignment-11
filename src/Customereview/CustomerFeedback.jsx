import React from "react";

const CustomerFeedback = () => {
  const feedbacks = [
    // ... (আপনার feedbacks ডেটা)
    {
      id: 1,
      name: "Akhi Moni",
      review:
        "The NGO partner using LoanLink processed my application swiftly. I got the necessary microloan to start my tailoring business without any long bureaucratic hurdles. This system truly helps small entrepreneurs!",
      image: "https://i.ibb.co/L8r7p3g/user-akhi.jpg", 
      title: "Micro Entrepreneur",
      rating: 5,
    },
    // ... (অন্যান্য ফিডব্যাক)
  ];

  const StarRating = ({ count }) => (
    // স্টার রেটিং কম্পোনেন্ট
    <div className="flex justify-center text-yellow-400 mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 fill-current ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.64 7.558 8.358 1.213-6.046 5.892 1.427 8.324L12 18.896l-7.379 3.88 1.427-8.324L.002 9.358l8.358-1.213L12 .587z" />
        </svg>
      ))}
    </div>
  );

  return (
    // Outer Container: Flexbox ব্যবহার করে মাঝখানে আনা হয়েছে
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20"> 
      <div className="max-w-6xl mx-auto px-4 w-full">
        
        {/* হেডিং */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-16 text-gray-800">
          Impact Stories from <span className="text-green-600">Our Community</span> 💚
        </h2>

        {/* কারাউসেল কন্টেইনার: ইউনিক শ্যাডো ও বর্ডার */}
        <div className="carousel w-full max-w-4xl mx-auto relative rounded-2xl shadow-2xl bg-white border-4 border-green-500/50 overflow-hidden">
          
          {feedbacks.map((fb) => (
            <div 
              key={fb.id} 
              id={`slide${fb.id}`} 
              className="carousel-item relative w-full pt-16 pb-12 px-8 md:px-20 flex items-start justify-center" // ইমেজের জন্য Padding-top
            >
              <div className="text-center max-w-xl mx-auto">
                
                {/* 1. প্রোফাইল ইমেজ কন্টেইনার: কার্ডের উপরে পজিশন করা হয়েছে */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={fb.image}
                      alt={fb.name}
                      // ইউনিক স্টাইলের জন্য বর্ডার ও শ্যাডো
                      className="w-28 h-28 rounded-full object-cover border-4 border-green-600 shadow-xl ring-4 ring-white ring-offset-2 ring-offset-green-500/30"
                    />
                </div>
                
                {/* রিভিউ কন্টেন্ট */}
                <div className="mt-8">
                    {/* স্টার রেটিং */}
                    <StarRating count={fb.rating} />

                    {/* নাম ও পদবী */}
                    <p className="text-2xl font-bold text-green-700 mb-1">
                      {fb.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        {fb.title}
                    </p>

                    {/* 2. রিভিউ টেক্সট সহ কোটেশন স্টাইল */}
                    <div className="relative text-gray-700 italic">
                        <span className="absolute left-0 top-0 text-7xl text-green-200 font-extrabold -translate-y-4">“</span>
                        <p className="text-xl md:text-2xl mt-4 px-6 leading-relaxed">
                            {fb.review}
                        </p>
                        <span className="absolute right-0 bottom-0 text-7xl text-green-200 font-extrabold translate-y-4">”</span>
                    </div>
                </div>
              </div>

              {/* 3. নেভিগেশন বাটন স্টাইল */}
              <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                <a
                  href={`#slide${fb.id === 1 ? feedbacks.length : fb.id - 1}`}
                  className="w-12 h-12 flex items-center justify-center bg-green-600/80 text-white rounded-full shadow-lg hover:bg-green-700 transition"
                >
                  ❮
                </a>
                <a
                  href={`#slide${fb.id === feedbacks.length ? 1 : fb.id + 1}`}
                  className="w-12 h-12 flex items-center justify-center bg-green-600/80 text-white rounded-full shadow-lg hover:bg-green-700 transition"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* কারাউসেল ইন্ডিকেটর (নিচে ডট) */}
        <div className="flex justify-center w-full py-2 gap-2 mt-8">
          {feedbacks.map((fb) => (
             <a key={fb.id} href={`#slide${fb.id}`} className="w-3 h-3 rounded-full bg-green-700/50 hover:bg-green-700 transition duration-300"></a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CustomerFeedback;