import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Activity, Shield, MoreVertical, Ban, CheckCircle2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', plan: 'Business', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', plan: 'Pro', status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', plan: 'Free', status: 'blocked' },
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'active' ? 'blocked' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total Users</span>
            <Users size={20} className="text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">1,248</p>
          <p className="text-xs text-green-500 mt-1">+12% this month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Active Subscriptions</span>
            <CreditCard size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">892</p>
          <p className="text-xs text-green-500 mt-1">+5% this month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">MRR</span>
            <Activity size={20} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">$45,290</p>
          <p className="text-xs text-green-500 mt-1">+8% this month</p>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">User Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {user.role === 'admin' && <Shield size={12} className="mr-1" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{user.plan}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? <CheckCircle2 size={12} className="mr-1" /> : <Ban size={12} className="mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        user.status === 'active' ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'
                      }`}
                      title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                    >
                      {user.status === 'active' ? <Ban size={18} /> : <CheckCircle2 size={18} />}
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

export default AdminDashboard;
