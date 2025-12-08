import { FaClock, FaShieldAlt, FaAward, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaClock className="w-10 h-10 text-green-600 mx-auto" />,
      title: "Fast Loan Approval",
      desc: "Get microloan approvals within minutes with automated verification.",
    },
    {
      icon: <FaShieldAlt className="w-10 h-10 text-green-600 mx-auto" />,
      title: "Secure & Trusted",
      desc: "Bank-level security ensures your data stays protected always.",
    },
    {
      icon: <FaAward className="w-10 h-10 text-green-600 mx-auto" />,
      title: "Low Interest Rates",
      desc: "Flexible EMI plans with transparent pricing and zero hidden fees.",
    },
    {
      icon: <FaHeadset className="w-10 h-10 text-green-600 mx-auto" />,
      title: "24/7 Customer Support",
      desc: "Dedicated support team to guide you throughout your loan journey.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-900">Why Choose LoanLink?</h2>
        <p className="text-gray-600 mt-3">
          We simplify the entire microloan management process with modern technology.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((f, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              {f.icon}
              <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
