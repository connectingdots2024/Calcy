import React from 'react';
import { 
  PieChart, 
  BarChart3, 
  ArrowRight, 
  Download, 
  FileSpreadsheet,
  TrendingUp,
  Target
} from 'lucide-react';

const Accounting: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Financial Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profit & Loss */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 bg-primary-50 rounded-2xl text-primary-600">
              <TrendingUp size={24} />
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Download size={20} />
            </button>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Profit & Loss</h3>
          <p className="text-slate-500 mb-8">Your net income and expenses over the last 12 months.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-700">Total Revenue</span>
              <span className="font-bold text-slate-900">$124,500.00</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-700">Cost of Goods Sold</span>
              <span className="font-bold text-slate-900">-$42,200.00</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-2xl">
              <span className="font-bold text-primary-700">Gross Profit</span>
              <span className="font-bold text-primary-700">$82,300.00</span>
            </div>
          </div>
          
          <button className="w-full mt-8 py-4 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center">
            View Full Report
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>

        {/* Balance Sheet */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 bg-green-50 rounded-2xl text-green-600">
              <PieChart size={24} />
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Download size={20} />
            </button>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Balance Sheet</h3>
          <p className="text-slate-500 mb-8">A snapshot of your assets, liabilities, and equity.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-700">Total Assets</span>
              <span className="font-bold text-slate-900">$245,000.00</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-700">Total Liabilities</span>
              <span className="font-bold text-slate-900">-$65,000.00</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
              <span className="font-bold text-green-700">Total Equity</span>
              <span className="font-bold text-green-700">$180,000.00</span>
            </div>
          </div>
          
          <button className="w-full mt-8 py-4 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center">
            View Full Report
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Tax Compliance */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-500/20 rounded-lg text-primary-400">
                <Target size={20} />
              </div>
              <span className="text-primary-400 font-semibold uppercase tracking-wider text-xs">Compliance Ready</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 font-display">GST & Tax Reports</h3>
            <p className="text-slate-400 text-lg max-w-xl">
              Automatically generate GST-ready reports and tax summaries for your region. Stay compliant with zero manual effort.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center">
              <FileSpreadsheet size={20} className="mr-2" />
              Download GST-R1
            </button>
            <button className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-2xl font-bold hover:bg-slate-700 transition-all">
              Tax Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
