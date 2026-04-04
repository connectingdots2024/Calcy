import React from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Mail,
  MoreHorizontal
} from 'lucide-react';

const Invoicing: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total Paid</span>
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">$24,500.00</p>
          <p className="text-xs text-slate-400 mt-1">Last 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Pending</span>
            <Clock size={20} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">$8,200.00</p>
          <p className="text-xs text-slate-400 mt-1">12 invoices</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Overdue</span>
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">$1,450.00</p>
          <p className="text-xs text-slate-400 mt-1">3 invoices</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
        <button className="flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 font-semibold">
          <Plus size={18} className="mr-2" />
          Create Invoice
        </button>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'INV-2023-001', client: 'Acme Corp', date: 'Oct 30, 2023', amount: 4500.00, status: 'Paid' },
                { id: 'INV-2023-002', client: 'Global Tech', date: 'Nov 05, 2023', amount: 2800.00, status: 'Pending' },
                { id: 'INV-2023-003', client: 'Design Studio', date: 'Oct 20, 2023', amount: 1200.00, status: 'Overdue' },
                { id: 'INV-2023-004', client: 'Marketing Pro', date: 'Nov 12, 2023', amount: 5600.00, status: 'Pending' },
                { id: 'INV-2023-005', client: 'Solo Freelance', date: 'Oct 25, 2023', amount: 850.00, status: 'Paid' },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText size={18} className="text-slate-400 mr-3" />
                      <span className="font-medium text-slate-900">{inv.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{inv.client}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {inv.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      inv.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors" title="Send Reminder">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoicing;
