import React, { useState } from 'react';
import { Check, Star, Zap, Building2 } from 'lucide-react';
import { auth } from '../firebase';

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for freelancers just getting started.",
    features: [
      "Up to 5 invoices per month",
      "Basic reporting",
      "1 User",
      "Community support"
    ],
    icon: Star,
    color: "text-slate-500",
    bg: "bg-slate-50"
  },
  {
    name: "Pro",
    price: 29,
    description: "Ideal for growing businesses and small teams.",
    features: [
      "Unlimited invoices",
      "Advanced reporting & analytics",
      "Up to 5 Users",
      "Priority email support",
      "Custom invoice templates",
      "Payroll tax calculations"
    ],
    icon: Zap,
    color: "text-primary-500",
    bg: "bg-primary-50",
    popular: true
  },
  {
    name: "Business",
    price: 99,
    description: "For established companies needing full control.",
    features: [
      "Everything in Pro",
      "Unlimited Users",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "Advanced role-based access"
    ],
    icon: Building2,
    color: "text-blue-500",
    bg: "bg-blue-50"
  }
];

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planName: string) => {
    setLoading(planName);
    // Mock subscription flow
    setTimeout(() => {
      alert(`Successfully subscribed to ${planName} plan! (Mock)`);
      setLoading(null);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Pricing</h2>
        <p className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight">
          Simple, transparent pricing
        </p>
        <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
          Choose the plan that best fits your business needs. Upgrade or downgrade at any time.
        </p>
        
        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`${
                billingCycle === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              } relative w-1/2 rounded-lg py-2 px-6 text-sm font-medium whitespace-nowrap focus:outline-none transition-all sm:w-auto sm:px-8`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`${
                billingCycle === 'yearly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              } relative w-1/2 rounded-lg py-2 px-6 text-sm font-medium whitespace-nowrap focus:outline-none transition-all sm:w-auto sm:px-8`}
            >
              Yearly billing <span className="ml-1 text-xs text-green-500 font-bold">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative flex flex-col rounded-3xl border ${plan.popular ? 'border-primary-500 shadow-xl shadow-primary-500/10' : 'border-slate-200 shadow-sm'} bg-white p-8`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-6">
              <div className={`w-12 h-12 rounded-2xl ${plan.bg} flex items-center justify-center mb-6`}>
                <plan.icon className={`w-6 h-6 ${plan.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-slate-500">{plan.description}</p>
            </div>

            <div className="mb-6 flex-1">
              <p className="flex items-baseline text-5xl font-extrabold text-slate-900">
                ${billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}
                <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
              </p>
              {billingCycle === 'yearly' && plan.price > 0 && (
                <p className="mt-1 text-sm text-slate-500">Billed annually (${Math.floor(plan.price * 0.8 * 12)}/year)</p>
              )}
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-slate-700">{feature}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.name)}
              disabled={loading === plan.name}
              className={`w-full py-3 px-4 rounded-xl font-bold transition-all ${
                plan.popular 
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              } ${loading === plan.name ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading === plan.name ? 'Processing...' : plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
