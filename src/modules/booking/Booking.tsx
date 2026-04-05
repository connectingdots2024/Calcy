import React, { useState } from 'react';
import { Plus, Filter, Search, Download } from 'lucide-react';

const Booking: React.FC = () => {
  const [transactions] = useState([
    { id: 1, date: '2026-04-01', type: 'Income', category: 'Consulting', amount: 5000, status: 'Completed' },
    { id: 2, date: '2026-04-02', type: 'Expense', category: 'Software', amount: 200, status: 'Completed' },
    { id: 3, date: '2026-04-03', type: 'Income', category: 'Project A', amount: 3500, status: 'Pending' },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Booking (Transactions)</h1>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
          <Plus size={20} />
          Add Booking
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Download size={18} />
            Export
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Category</th>
              <th className="text-right p-4">Amount</th>
              <th className="text-center p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-4 text-slate-600">{t.date}</td>
                <td className="p-4 font-medium text-slate-800">{t.type}</td>
                <td className="p-4 text-slate-600">{t.category}</td>
                <td className={`p-4 text-right font-bold ${t.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
