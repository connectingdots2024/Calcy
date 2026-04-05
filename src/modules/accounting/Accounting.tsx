import React from 'react';

const Accounting: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Accounting</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart of Accounts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Chart of Accounts</h2>
          <div className="space-y-4">
            {['Assets', 'Liabilities', 'Income', 'Expenses'].map((category) => (
              <div key={category} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">{category}</span>
                <span className="text-primary-600 font-bold">$12,450</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ledger View */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">General Ledger</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Account</th>
                  <th className="text-right p-2">Debit</th>
                  <th className="text-right p-2">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2">2026-04-03</td>
                  <td className="p-2">Accounts Receivable</td>
                  <td className="p-2 text-right">$3,500</td>
                  <td className="p-2 text-right">-</td>
                </tr>
                <tr>
                  <td className="p-2">2026-04-03</td>
                  <td className="p-2">Consulting Income</td>
                  <td className="p-2 text-right">-</td>
                  <td className="p-2 text-right">$3,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
