import React from 'react';

const HowItWorksSection = () => {
    // সেকশনের টাইটেল এবং বিবরণ
    const sectionTitle = "How LoanLink Works: Simple Steps to Financial Empowerment";
    const sectionSubtitle = "LoanLink is a web-based microloan request, review & approval management system designed to streamline the entire loan lifecycle for small financial organizations, NGOs, and microloan providers.";

    // ⭐ আপনার অনুরোধ করা ডাটা সেট
    const steps = [
        {
            icon: '📝', // Step 1: Request
            title: "Step 1: Online Application Submission",
            description: "The applicant easily submits the microloan request through the secure web platform, providing necessary documentation and details about the project or purpose.",
            color: "text-blue-600"
        },
        {
            icon: '🔍', // Step 2: Review
            title: "Step 2: Digital Verification & Review",
            description: "NGOs and Microloan Providers instantly receive the request. Verification and assessment of the applicant's profile are conducted digitally, ensuring a rapid approval process.",
            color: "text-green-600"
        },
        {
            icon: '✅', // Step 3: Approval & Disbursement
            title: "Step 3: Fund Disbursement & Repayment Tracking",
            description: "Once approved, the system manages quick fund release. Automatic EMI schedules and repayment tracking begin, ensuring transparent and easy management.",
            color: "text-red-600"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold uppercase text-gray-500 tracking-wider">
                        OUR SYSTEM PROCESS
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
                        {sectionTitle}
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                        {sectionSubtitle}
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            className="text-center p-8 bg-white rounded-xl shadow-xl border-t-4 border-transparent hover:border-green-500 transition duration-300 transform hover:scale-[1.03]"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gray-100 mb-6 border-4 border-gray-200 shadow-inner">
                                <span className="text-4xl" role="img" aria-label={`Step ${index + 1}`}>
                                    {step.icon}
                                </span>
                            </div>

                            {/* Step Number */}
                            <p className={`text-xl font-bold mb-2 ${step.color}`}>
                                {`0${index + 1}`}
                            </p>
                            
                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Optional CTA at the bottom */}
                <div className="text-center mt-16">
                    <a
                        href="/loan-application-form"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-full text-lg shadow-lg transition duration-300"
                    >
                        Start Your Application Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;