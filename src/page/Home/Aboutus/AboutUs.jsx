import React from 'react';
import { CheckCircleIcon, CurrencyDollarIcon, UsersIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Unified Application Management',
    description: 'Centralize all microloan requests in one platform, eliminating scattered paperwork and disorganized digital files.',
    icon: CheckCircleIcon,
    color: 'text-indigo-600',
  },
  {
    name: 'Streamlined Verification & Approval',
    description: 'Accelerate the review process with digital verification workflows and clear approval hierarchies for faster loan disbursement.',
    icon: ShieldCheckIcon,
    color: 'text-green-600',
  },
  {
    name: 'Automated EMI & Repayment Tracking',
    description: 'Automatically generate EMI schedules, track payments, and send reminders, reducing manual effort and errors.',
    icon: CurrencyDollarIcon,
    color: 'text-yellow-600',
  },
  {
    name: 'Comprehensive Reporting & Analytics',
    description: 'Gain valuable insights into loan portfolio health, repayment rates, and borrower demographics to improve decision-making.',
    icon: UsersIcon,
    color: 'text-rose-600',
  },
];

const AboutUs = () => {
    return (
        <div className="relative isolate overflow-hidden bg-white py-20 sm:py-32">
            {/* Optional background element for visual depth */}
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>

            <div className="container mx-auto px-6 lg:px-8">
                
                {/* Header and Mission Statement */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600 tracking-wide uppercase">
                        Our Mission
                    </h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                        Revolutionizing Microloan Management
                    </p>
                    <p className="mt-6 text-xl leading-8 text-gray-700">
                        LoanLink provides small financial organizations and NGOs with the digital tools they need to efficiently manage every stage of the lending lifecycle, ensuring transparency and reducing administrative burden.
                    </p>
                </div>

                {/* Core Problem & Solution (Two-column layout with a visual focus) */}
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center mb-24">
                    <div className="lg:col-span-6 lg:order-2">
                        {/* Placeholder for an image or graphic */}
                        <div className="relative aspect-video rounded-3xl shadow-2xl overflow-hidden bg-indigo-50 border border-indigo-200 flex items-center justify-center p-8">
                            <p className="text-indigo-700 font-semibold text-xl text-center">
                                
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:col-span-6 lg:order-1">
                        <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                            Solving the Administration Struggle
                        </h3>
                        <p className="text-lg leading-8 text-gray-600 mb-8">
                            The complexity of handling applications, verification, approvals, EMI schedules, and repayments across disparate systems is a major barrier for microloan providers. **LoanLink integrates all these functions into one cohesive platform.**
                        </p>
                        
                        <dl className="mt-6 space-y-4">
                            <div className="flex items-start">
                                <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 text-white mr-3">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4.0-5.5z" clipRule="evenodd" /></svg>
                                </span>
                                <div className="leading-6">
                                    <dt className="font-semibold text-gray-900">Reduced Operational Costs</dt>
                                    <dd className="text-gray-600 text-sm">Automating tasks saves time and lowers overhead.</dd>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 text-white mr-3">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4.0-5.5z" clipRule="evenodd" /></svg>
                                </span>
                                <div className="leading-6">
                                    <dt className="font-semibold text-gray-900">Enhanced Compliance and Reporting</dt>
                                    <dd className="text-gray-600 text-sm">Maintain accurate records essential for regulatory bodies.</dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Key Features Section (Grid with colored icons) */}
                <div className="pt-12">
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-10">
                        Powerful Features for Growth
                    </h3>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <div key={feature.name} className="p-8 bg-white rounded-xl border border-gray-200 shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-50 mb-4">
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} aria-hidden="true" />
                                </div>
                                <p className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.name}
                                </p>
                                <p className="text-base text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;