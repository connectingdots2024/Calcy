import React from 'react';
import { 
  FileText, 
  Search, 
  Upload, 
  Folder, 
  MoreVertical, 
  Download, 
  Eye,
  Trash2
} from 'lucide-react';

const Documents: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
            <Folder size={18} className="mr-2" />
            New Folder
          </button>
          <button className="flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 font-semibold">
            <Upload size={18} className="mr-2" />
            Upload File
          </button>
        </div>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Invoices', count: 124, size: '45.2 MB' },
          { name: 'Receipts', count: 86, size: '12.8 MB' },
          { name: 'Payroll Docs', count: 24, size: '8.4 MB' },
          { name: 'Tax Filings', count: 12, size: '2.1 MB' },
        ].map((folder, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary-300 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-50 rounded-xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                <Folder size={24} />
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={18} />
              </button>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">{folder.name}</h4>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{folder.count} files</span>
              <span>{folder.size}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Files List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">Recent Files</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Invoice_INV-2023-001.pdf', type: 'PDF', date: 'Oct 24, 2023', size: '1.2 MB' },
                { name: 'Receipt_Apple_Store.jpg', type: 'Image', date: 'Oct 23, 2023', size: '2.4 MB' },
                { name: 'Payroll_Summary_Oct.xlsx', type: 'Excel', date: 'Oct 20, 2023', size: '450 KB' },
                { name: 'Tax_Report_Q3.pdf', type: 'PDF', date: 'Oct 18, 2023', size: '3.1 MB' },
              ].map((file, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText size={18} className="text-slate-400 mr-3" />
                      <span className="font-medium text-slate-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 rounded-md text-xs text-slate-600 font-medium">{file.type}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{file.date}</td>
                  <td className="px-6 py-4 text-slate-500">{file.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
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

export default Documents;
