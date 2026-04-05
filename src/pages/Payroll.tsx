import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Download,
  MoreVertical
} from 'lucide-react';
import { auth } from '../firebase';
import { getEmployees, getTaxJurisdictions } from '../services/firebaseService';
import { calculateTaxes } from '../services/taxService';

const Payroll: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [jurisdictions, setJurisdictions] = useState<any[]>([]);
  const [payrollData, setPayrollData] = useState<any[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      Promise.all([getEmployees(auth.currentUser.uid), getTaxJurisdictions()]).then(([emps, jur]) => {
        setEmployees(emps);
        setJurisdictions(jur);
        
        const data = (emps as any[]).map((emp: any) => {
          const jurisdiction = jur.find(j => j.id === emp.taxJurisdiction) || {};
          const taxes = calculateTaxes(emp.salary, jurisdiction);
          return { ...emp, ...taxes };
        });
        setPayrollData(data);
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total Employees</span>
            <Users size={20} className="text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Monthly Payroll</span>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {payrollData.reduce((acc, curr) => acc + curr.salary / 12, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total Taxes</span>
            <CheckCircle2 size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {payrollData.reduce((acc, curr) => acc + curr.totalTax / 12, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">Employees</h3>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700">
            <Plus size={18} className="mr-2" />
            Add Employee
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Salary</th>
                <th className="px-6 py-4 font-medium">Taxes</th>
                <th className="px-6 py-4 font-medium">Net Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payrollData.map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{emp.name}</td>
                  <td className="px-6 py-4 text-slate-600">{(emp.salary / 12).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                  <td className="px-6 py-4 text-slate-600">{(emp.totalTax / 12).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{(emp.netSalary / 12).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
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
