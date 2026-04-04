import React from 'react';
import { motion } from 'motion/react';
import { 
  Receipt, 
  BookOpen, 
  Users, 
  PieChart, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import FeatureCard from '../components/landing/FeatureCard';
import PricingCard from '../components/landing/PricingCard';
import FAQAccordion from '../components/landing/FAQAccordion';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  const faqs = [
    {
      question: "Is Calcy free to use?",
      answer: "Yes! We offer a generous free plan for freelancers and individuals that includes up to 5 invoices per month and basic bookkeeping features."
    },
    {
      question: "Does it support GST compliance?",
      answer: "Absolutely. Calcy is built with regional compliance in mind, including full GST support for India, VAT for Europe, and Sales Tax for the US."
    },
    {
      question: "Can I manage multiple businesses?",
      answer: "Yes, our Enterprise plan supports multi-organization management, allowing you to switch between different companies with a single login."
    },
    {
      question: "Is my financial data secure?",
      answer: "Security is our top priority. We use bank-grade 256-bit encryption, regular security audits, and multi-factor authentication to keep your data safe."
    }
  ];

  const pricingPlans = [
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
      buttonText: 'Start for Free'
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
      buttonText: 'Get Started',
      isPopular: true
    },
    {
      name: 'Business',
      price: '$99',
      description: 'Advanced features for large scale operations.',
      features: [
        'Multi-organization support',
        'Unlimited payroll',
        'Custom invoice templates',
        'API access',
        'Dedicated account manager'
      ],
      buttonText: 'Talk to Sales'
    }
  ];

  return (
    <div className="bg-white">
      <Navbar />
      
      <Hero />

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 font-semibold uppercase tracking-widest text-sm mb-12">
            Trusted by 10,000+ freelancers & growing businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" alt="Slack" className="h-8" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-display">
              Finance shouldn’t feel this hard…
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Running a business is tough enough. Your accounting software shouldn't add to the stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock />, title: "Manual Tracking", desc: "Wasting hours tracking invoices in spreadsheets." },
              { icon: <AlertCircle />, title: "Missing Payments", desc: "Losing revenue because of forgotten follow-ups." },
              { icon: <LayoutDashboard />, title: "Tool Overload", desc: "Switching between 5 different apps to manage money." },
              { icon: <Users />, title: "Payroll Chaos", desc: "Struggling with complex tax and salary calculations." },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="text-red-500 mb-4">{item.icon}</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solutions" className="py-24 bg-primary-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white blur-[150px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 font-display leading-tight">
                Meet Calcy — <br />
                Your Smart Finance OS
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Bookkeeping made simple", desc: "Automated categorization and real-time bank sync." },
                  { title: "Smart invoicing", desc: "Professional templates with automated payment reminders." },
                  { title: "Automated payroll", desc: "Run payroll in 3 clicks with built-in tax compliance." },
                  { title: "Real-time reports", desc: "Instant P&L, Balance Sheets, and Cash Flow insights." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-white/20 p-1 rounded-full text-white">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-primary-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/login" 
                className="inline-flex items-center mt-12 px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all"
              >
                Explore All Solutions
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/finance/800/600" 
                alt="Calcy Interface" 
                className="rounded-3xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-display">
              Everything you need to scale
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Powerful features designed to save you time and help you grow faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Receipt size={28} />}
              title="Smart Invoicing"
              description="Create, send and track professional invoices in seconds. Get paid faster with integrated payments."
              delay={0.1}
            />
            <FeatureCard 
              icon={<BookOpen size={28} />}
              title="Bookkeeping"
              description="Auto-categorize transactions and keep your books clean without manual data entry."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Users size={28} />}
              title="Payroll"
              description="Automated salary calculations, tax deductions, and payslip generation for your entire team."
              delay={0.3}
            />
            <FeatureCard 
              icon={<PieChart size={28} />}
              title="Real-time Reports"
              description="Get instant insights into your business health with professional financial reporting."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-12 lg:p-20 border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-display">Why Calcy Wins</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: <Globe />, title: "GST Ready", desc: "Built-in compliance for India and global markets." },
                { icon: <Zap />, title: "Simple UI", desc: "No accounting degree required. Intuitive for everyone." },
                { icon: <DollarSign size={24} />, title: "Affordable", desc: "Pricing that makes sense for startups and SMEs." },
                { icon: <TrendingUp />, title: "Scalable", desc: "Grows with you from freelancer to enterprise." },
              ].map((usp, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-6">
                    {usp.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{usp.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{usp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-display">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Choose the plan that fits your current needs. Scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={i} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-primary-500 blur-[150px] rounded-full"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 font-display leading-tight">
                Stop managing finances <br /> the hard way
              </h2>
              <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
                Join 10,000+ businesses who have simplified their accounting with Calcy.
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center px-10 py-5 bg-primary-600 text-white rounded-2xl font-bold text-xl hover:bg-primary-700 transition-all shadow-2xl shadow-primary-500/40"
              >
                Start Free Now
                <ArrowRight className="ml-2" size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about Calcy.</p>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const DollarSign = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default LandingPage;
