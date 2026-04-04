import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  isCurrent?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  buttonText,
  isPopular,
  isCurrent
}) => {
  return (
    <div 
      className={`relative bg-white p-8 rounded-3xl border transition-all flex flex-col ${
        isPopular 
          ? 'border-primary-500 shadow-xl shadow-primary-500/10 scale-105 z-10' 
          : 'border-slate-200 shadow-sm hover:border-primary-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900">{price}</span>
          {price !== 'Custom' && <span className="text-slate-500">/month</span>}
        </div>
        <p className="text-slate-500 mt-4 text-sm leading-relaxed">{description}</p>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, j) => (
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
          isCurrent 
            ? 'bg-slate-100 text-slate-400 cursor-default' 
            : isPopular
              ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20'
              : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
