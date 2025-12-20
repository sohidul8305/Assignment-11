import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Local images
import akhiImage from "../assets/Banner/akhi.1jpg.jpeg";
import rajuImage from "../assets/Banner/raju2.jpg";
import sumaiyaImage from "../assets/Banner/sumaiya3.jpg";

// ⭐ Star Rating Component
const StarRating = ({ count }) => (
  <div className="flex justify-center text-yellow-400 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 ${i < count ? "fill-current" : "fill-gray-300"}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.64 7.558 8.358 1.213-6.046 5.892 1.427 8.324L12 18.896l-7.379 3.88 1.427-8.324L.002 9.358l8.358-1.213L12 .587z" />
      </svg>
    ))}
  </div>
);

const feedbacks = [
  {
    id: 1,
    name: "Akhi Moni",
    review:
      "The NGO partner using LoanLink processed my application swiftly. I got the necessary microloan to start my tailoring business without any long bureaucratic hurdles.",
    image: akhiImage,
    title: "Micro Entrepreneur",
    rating: 5,
  },
  {
    id: 2,
    name: "Raju Ahmed",
    review:
      "I was struggling to fund my children's education. Thanks to the educational loan facilitated here, they are now attending college.",
    image: rajuImage,
    title: "Small Farmer",
    rating: 4,
  },
  {
    id: 3,
    name: "Sumaiya Binte",
    review:
      "LoanLink connects me with reliable partners. I secured a loan for expanding my poultry farm.",
    image: sumaiyaImage,
    title: "Poultry Farm Owner",
    rating: 5,
  },
];

const CustomerFeedback = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-4">
        
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-14 text-gray-800">
          Success Stories:{" "}
          <span className="text-green-600">They Found Their Path</span>
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          className="rounded-3xl"
        >
          {feedbacks.map((fb) => (
            <SwiperSlide key={fb.id}>
              <div className="bg-white shadow-2xl rounded-3xl p-10 text-center border border-green-200/50">
                
                <img
                  src={fb.image}
                  alt={fb.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-green-500 mb-6"
                />

                <StarRating count={fb.rating} />

                <p className="text-xl md:text-2xl italic text-gray-700 mb-6">
                  “{fb.review}”
                </p>

                <h3 className="text-2xl font-bold text-green-700">
                  {fb.name}
                </h3>
                <p className="text-gray-500">{fb.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default CustomerFeedback;
