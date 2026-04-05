import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metrics Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm text-slate-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-slate-900">$54,230</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm text-slate-500">Total Expenses</h3>
          <p className="text-2xl font-bold text-slate-900">$23,100</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm text-slate-500">Net Profit</h3>
          <p className="text-2xl font-bold text-primary-600">$31,130</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm text-slate-500">Pending Payments</h3>
          <p className="text-2xl font-bold text-amber-600">$8,450</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
