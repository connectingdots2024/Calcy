import React from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail,
  Globe,
  Save
} from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8">
      {/* Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-primary-100 flex items-center justify-center text-primary-700 text-3xl font-bold">
              JD
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">John Doe</h3>
              <p className="text-slate-500">Administrator • Acme Corp</p>
            </div>
            <button className="ml-auto px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50">
              Change Avatar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                defaultValue="john@acmecorp.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 flex justify-end">
          <button className="flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20">
            <Save size={18} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Company Settings */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <Building2 size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Company Information</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
              <input 
                type="text" 
                defaultValue="Acme Corp"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tax ID / GSTIN</label>
                <input 
                  type="text" 
                  placeholder="Enter Tax ID"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500">
                  <option>USD ($)</option>
                  <option>INR (₹)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            <Bell size={20} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Notifications</h3>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Email Notifications', desc: 'Receive daily summaries and alerts via email.', icon: Mail },
            { title: 'Payment Alerts', desc: 'Get notified when an invoice is paid or overdue.', icon: CreditCard },
            { title: 'Security Alerts', desc: 'Receive alerts about new logins and security changes.', icon: Shield },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary-100 transition-all">
              <div className="flex gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
