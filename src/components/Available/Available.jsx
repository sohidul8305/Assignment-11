import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../components/Loading'; // <-- Loading component import

const fetchLoans = async () => {
  const res = await axios.get('http://localhost:4000/loans');
  return res.data;
};

const Available = () => {
  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ['loans'],
    queryFn: fetchLoans,
  });

  // ✅ Use Loading Component
  if (isLoading) return <Loading />;

  if (isError)
    return (
      <p className="text-center py-10 text-red-600">
        Error fetching loans!
      </p>
    );

  const limitedLoans = loans.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          Available Loans 💰
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {limitedLoans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white shadow-xl rounded-xl overflow-hidden transform transition duration-500 hover:scale-[1.03] hover:shadow-2xl border-b-4 border-green-600"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={loan.imageURL}
                  alt={loan.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3 leading-snug">
                  {loan.title}
                </h3>

                <p className="text-gray-500 mb-3 text-sm line-clamp-2">
                  {loan.shortDesc}
                </p>

                <p className="font-extrabold text-lg text-gray-800 border-t pt-3 mt-3 border-gray-100">
                  Max Loan:{' '}
                  <span className="text-green-600">{loan.maxLimit}</span>
                </p>

                <button className="mt-5 w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-800 transition duration-300 transform hover:-translate-y-0.5">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Available;
