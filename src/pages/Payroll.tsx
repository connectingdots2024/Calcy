import React from 'react';
import { 
  Plus, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Download,
  MoreVertical
} from 'lucide-react';

const Payroll: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total Employees</span>
            <Users size={20} className="text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">24</p>
          <p className="text-xs text-slate-400 mt-1">Active this month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Monthly Payroll</span>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">$85,400.00</p>
          <p className="text-xs text-slate-400 mt-1">Next run: Nov 01</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Last Run</span>
            <CheckCircle2 size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">Oct 01, 2023</p>
          <p className="text-xs text-slate-400 mt-1">Successfully processed</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar size={18} className="mr-2" />
            Schedule Run
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} className="mr-2" />
            Tax Reports
          </button>
        </div>
        <button className="flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 font-semibold">
          <Plus size={18} className="mr-2" />
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">Employees</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Salary</th>
                <th className="px-6 py-4 font-medium">Last Paid</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Sarah Johnson', role: 'Senior Developer', salary: 120000, lastPaid: 'Oct 01, 2023', status: 'Active' },
                { name: 'Michael Chen', role: 'UX Designer', salary: 95000, lastPaid: 'Oct 01, 2023', status: 'Active' },
                { name: 'Emma Wilson', role: 'Marketing Manager', salary: 85000, lastPaid: 'Oct 01, 2023', status: 'On Leave' },
                { name: 'David Miller', role: 'Product Manager', salary: 110000, lastPaid: 'Oct 01, 2023', status: 'Active' },
                { name: 'Lisa Davis', role: 'HR Specialist', salary: 75000, lastPaid: 'Oct 01, 2023', status: 'Active' },
              ].map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs mr-3">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-900">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{emp.role}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {(emp.salary / 12).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / mo
                  </td>
                  <td className="px-6 py-4 text-slate-500">{emp.lastPaid}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      emp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical size={18} />
                    </button>
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

export default Payroll;
