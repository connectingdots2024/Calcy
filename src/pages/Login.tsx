import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, isPlaceholder } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (isPlaceholder) {
      // Mock login
      const mockUser = {
        uid: 'mock-user-123',
        email: 'demo@calcy.app',
        displayName: 'Demo User',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
      };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      window.location.reload(); // Refresh to trigger auth state change
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary-600 font-display mb-2">Calcy</h1>
          <p className="text-slate-500">Simplify your business finances</p>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-6 py-4 border border-slate-200 rounded-2xl font-medium text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-5 h-5 mr-3"
            />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            handleGoogleLogin(); // Reuse the same logic for demo
          }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                defaultValue="demo@calcy.app"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-primary-600 text-white rounded-2xl font-semibold hover:bg-primary-700 transition-all active:scale-[0.98] shadow-lg shadow-primary-500/20"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? <a href="#" className="text-primary-600 font-semibold hover:underline">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
