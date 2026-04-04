import React from 'react';
import { Check, Zap, Shield, Globe } from 'lucide-react';

const Subscription: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for freelancers and individuals starting out.',
      features: [
        'Up to 5 invoices per month',
        'Basic bookkeeping',
        'Single user access',
        'Email support'
      ],
      buttonText: 'Current Plan',
      isCurrent: true
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Ideal for small businesses and growing teams.',
      features: [
        'Unlimited invoices',
        'Full accounting module',
        'Payroll up to 10 employees',
        'GST-ready reports',
        'Priority support'
      ],
      buttonText: 'Upgrade to Pro',
      isCurrent: false,
      isPopular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      description: 'Advanced features for large scale operations.',
      features: [
        'Multi-organization support',
        'Unlimited payroll',
        'Custom invoice templates',
        'API access',
        'Dedicated account manager'
      ],
      buttonText: 'Contact Sales',
      isCurrent: false
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">Choose the right plan for your business</h2>
        <p className="text-slate-500 text-lg">
          Simple, transparent pricing that scales with you. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`relative bg-white p-8 rounded-3xl border transition-all ${
              plan.isPopular 
                ? 'border-primary-500 shadow-xl shadow-primary-500/10 scale-105 z-10' 
                : 'border-slate-200 shadow-sm hover:border-primary-200'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="text-slate-500 mt-4 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="mt-1 p-0.5 bg-primary-50 rounded-full text-primary-600">
                    <Check size={14} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                plan.isCurrent 
                  ? 'bg-slate-100 text-slate-400 cursor-default' 
                  : plan.isPopular
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-slate-200">
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 rounded-2xl text-primary-600 h-fit">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Instant Setup</h4>
            <p className="text-slate-500 text-sm">Get up and running in minutes with our intuitive onboarding flow.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 rounded-2xl text-primary-600 h-fit">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Secure by Design</h4>
            <p className="text-slate-500 text-sm">Bank-grade encryption and regular security audits to keep your data safe.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 rounded-2xl text-primary-600 h-fit">
            <Globe size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Global Compliance</h4>
            <p className="text-slate-500 text-sm">Multi-currency support and localized tax compliance for over 50 countries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
