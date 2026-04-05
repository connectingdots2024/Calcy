import React from 'react';
import { Plus, FileText, Search } from 'lucide-react';

const Invoicing: React.FC = () => {
  const invoices = [
    { id: 'INV-001', client: 'Acme Corp', amount: 5000, status: 'Paid', dueDate: '2026-04-10' },
    { id: 'INV-002', client: 'Globex Inc', amount: 2500, status: 'Sent', dueDate: '2026-04-15' },
    { id: 'INV-003', client: 'Soylent Corp', amount: 1200, status: 'Draft', dueDate: '2026-04-20' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Invoicing</h1>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
          <Plus size={20} />
          Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search invoices..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="text-left p-4">Invoice ID</th>
              <th className="text-left p-4">Client</th>
              <th className="text-right p-4">Amount</th>
              <th className="text-center p-4">Status</th>
              <th className="text-right p-4">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800 flex items-center gap-2">
                  <FileText size={16} className="text-slate-400" />
                  {inv.id}
                </td>
                <td className="p-4 text-slate-600">{inv.client}</td>
                <td className="p-4 text-right font-bold text-slate-900">${inv.amount.toLocaleString()}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 
                    inv.status === 'Sent' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-600">{inv.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoicing;
