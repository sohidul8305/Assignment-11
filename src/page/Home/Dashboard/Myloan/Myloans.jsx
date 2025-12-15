import React from "react";

const MyLoans = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Loans</h2>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Loan Title</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Fee Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* data পরে এখানে map করবে */}
          <tr>
            <td className="border px-4 py-2 text-center">—</td>
            <td className="border px-4 py-2">—</td>
            <td className="border px-4 py-2">—</td>
            <td className="border px-4 py-2">—</td>
            <td className="border px-4 py-2">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyLoans;
