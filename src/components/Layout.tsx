import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Receipt, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  CreditCard,
  FileText,
  PieChart,
  Shield
} from 'lucide-react';
import { auth, isPlaceholder, signOut } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Bookkeeping', path: '/bookkeeping', icon: BookOpen },
    { name: 'Accounting', path: '/accounting', icon: PieChart },
    { name: 'Invoicing', path: '/invoicing', icon: Receipt },
    { name: 'Clients', path: '/clients', icon: Users },
    { name: 'Payroll', path: '/payroll', icon: Users },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Pricing', path: '/pricing', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Admin Panel', path: '/admin', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <span className="text-2xl font-bold text-primary-600 font-display">Calcy</span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary-600' : 'text-slate-500'} />
                {isSidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleSignOut}
            className="flex items-center w-full p-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {isPlaceholder && (
          <div className="bg-amber-50 border-b border-amber-200 px-8 py-2 flex items-center justify-center gap-2 text-amber-800 text-sm font-medium">
            <AlertTriangle size={16} />
            <span>Running in Demo Mode (Mock Firebase). Real database setup is pending.</span>
          </div>
        )}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-800">
            {navItems.find(item => item.path === location.pathname)?.name || 'Calcy'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{auth.currentUser?.displayName || 'User'}</p>
              <p className="text-xs text-slate-500">{auth.currentUser?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
              {auth.currentUser?.displayName?.[0] || 'U'}
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
