import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Plus, 
  PieChart, 
  Receipt, 
  Users,
  Sparkles,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { auth, db } from '../firebase';

// Character States
type AgentState = 'idle' | 'walking' | 'talking' | 'thinking' | 'celebrating';

const LilliputAgent: React.FC = () => {
  const [state, setState] = useState<AgentState>('idle');
  const [position, setPosition] = useState({ x: window.innerWidth - 150, y: window.innerHeight - 150 });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'agent', text: string }[]>([
    { role: 'agent', text: "Hi! I'm Cal, your personal finance assistant. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const controls = useAnimation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setMessages(prev => [...prev, { role: 'user', text: `Uploaded: ${files[0].name}` }]);
      setMessages(prev => [...prev, { role: 'agent', text: `Got it! I'm scanning ${files[0].name} for financial data...` }]);
      setState('thinking');
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'agent', text: `Done! I've extracted the data from ${files[0].name}. Should I add it to your expenses?` }]);
        setState('celebrating');
        setTimeout(() => setState('idle'), 3000);
      }, 2000);
    }
  };

  // AI Initialization
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = () => setIsMenuOpen(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Random Notifications
  useEffect(() => {
    const notifyInterval = setInterval(() => {
      if (isChatOpen) return;
      const notifications = [
        "You have 3 unpaid invoices! Want me to send reminders?",
        "Payroll is due tomorrow. Should I prepare the payslips?",
        "Expenses are up 12% this week. Let's review them.",
        "New receipt uploaded! I've categorized it for you.",
        "Ready to run the monthly reports?"
      ];
      if (Math.random() > 0.8) {
        setNotification(notifications[Math.floor(Math.random() * notifications.length)]);
        setTimeout(() => setNotification(null), 5000);
      }
    }, 15000);

    return () => clearInterval(notifyInterval);
  }, [isChatOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Random Movement Logic
  useEffect(() => {
    if (isChatOpen) return;

    const moveInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newX = Math.max(50, Math.min(window.innerWidth - 150, position.x + (Math.random() - 0.5) * 200));
        const newY = Math.max(50, Math.min(window.innerHeight - 150, position.y + (Math.random() - 0.5) * 200));
        
        setState('walking');
        setPosition({ x: newX, y: newY });
        setTimeout(() => setState('idle'), 2000);
      }
    }, 5000);

    return () => clearInterval(moveInterval);
  }, [isChatOpen, position]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsThinking(true);
    setState('thinking');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are Cal, a witty and professional 2D accountant AI assistant for the Calcy app. 
        The user says: "${userMsg}"
        Context: The user is currently in the Calcy financial app. 
        Be helpful, concise, and slightly witty. If they ask to create an invoice or expense, tell them you're on it!`,
      });

      const agentMsg = response.text || "I'm sorry, I couldn't process that. Could you try again?";
      setMessages(prev => [...prev, { role: 'agent', text: agentMsg }]);
      
      if (agentMsg.toLowerCase().includes('done') || agentMsg.toLowerCase().includes('created') || agentMsg.toLowerCase().includes('success')) {
        setState('celebrating');
        setTimeout(() => setState('idle'), 3000);
      } else {
        setState('talking');
        setTimeout(() => setState('idle'), 3000);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'agent', text: "Oops, my calculator jammed! Let's try that again." }]);
    } finally {
      setIsThinking(false);
    }
  };

  const quickActions = [
    { label: 'Create Invoice', icon: Receipt },
    { label: 'Add Expense', icon: Plus },
    { label: 'View Reports', icon: PieChart },
    { label: 'Run Payroll', icon: Users },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* The Agent Character */}
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => setState('walking')}
        onDragEnd={(_, info) => {
          setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
          setState('idle');
        }}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
        onClick={() => setIsChatOpen(!isChatOpen)}
        onContextMenu={handleContextMenu}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {isDraggingFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-primary-500/20 rounded-full border-2 border-dashed border-primary-500 flex items-center justify-center"
            >
              <Sparkles className="text-primary-600 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1"
            >
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setInputText(action.label);
                    setIsChatOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-600 hover:bg-primary-50 hover:text-primary-600 flex items-center gap-2 transition-colors"
                >
                  <action.icon size={14} />
                  {action.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 text-xs font-medium text-slate-700"
            >
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-100 rotate-45" />
              {notification}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative group">
          {/* Character Visual */}
          <div className="w-24 h-24 flex items-center justify-center">
            <motion.div
              animate={
                state === 'idle' ? { scale: [1, 1.02, 1], y: [0, -2, 0] } : 
                state === 'celebrating' ? { 
                  y: [0, -40, 0, -20, 0], 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                } : 
                state === 'thinking' ? { 
                  y: [0, -8, 0],
                  rotate: [0, 2, -2, 0]
                } :
                state === 'walking' ? { skewX: [0, 10, -10, 0], y: [0, -4, 0] } :
                state === 'talking' ? { scale: [1, 1.05, 1], y: [0, -2, 0] } :
                {}
              }
              transition={
                state === 'idle' ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : 
                state === 'celebrating' ? { duration: 1, ease: "easeOut" } : 
                state === 'thinking' ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } :
                state === 'walking' ? { repeat: Infinity, duration: 0.4, ease: "linear" } :
                state === 'talking' ? { repeat: Infinity, duration: 0.3 } :
                {}
              }
              className="relative"
            >
              {/* Thinking Halo */}
              {state === 'thinking' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-primary-400/20 rounded-full blur-xl"
                />
              )}

              {/* Simple 2D Accountant SVG */}
              <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-xl relative z-10">
                {/* Body */}
                <rect x="30" y="40" width="40" height="45" rx="10" fill="#2563eb" />
                {/* Head */}
                <circle cx="50" cy="30" r="20" fill="#fef3c7" />
                {/* Glasses */}
                <rect x="38" y="28" width="10" height="6" rx="2" fill="none" stroke="#1e293b" strokeWidth="1" />
                <rect x="52" y="28" width="10" height="6" rx="2" fill="none" stroke="#1e293b" strokeWidth="1" />
                <line x1="48" y1="31" x2="52" y2="31" stroke="#1e293b" strokeWidth="1" />
                {/* Hair */}
                <path d="M30 30 Q30 10 50 10 Q70 10 70 30" fill="#475569" />
                {/* Tie */}
                <path d="M45 40 L55 40 L50 60 Z" fill="#ef4444" />
                {/* Eyes */}
                <motion.circle 
                  cx="43" cy="31" r="1.5" 
                  animate={state === 'thinking' ? { fill: ["#1e293b", "#60a5fa", "#1e293b"] } : { fill: "#1e293b" }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                <motion.circle 
                  cx="57" cy="31" r="1.5" 
                  animate={state === 'thinking' ? { fill: ["#1e293b", "#60a5fa", "#1e293b"] } : { fill: "#1e293b" }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                {/* Mouth */}
                <motion.path 
                  animate={state === 'talking' ? { d: ["M45 38 Q50 42 55 38", "M45 38 Q50 38 55 38"] } : { d: "M45 38 Q50 40 55 38" }}
                  transition={state === 'talking' ? { repeat: Infinity, duration: 0.2 } : {}}
                  stroke="#1e293b" strokeWidth="1" fill="none" 
                />
                {/* Tablet/Calculator Prop */}
                <rect x="60" y="60" width="15" height="20" rx="2" fill="#94a3b8" />
                <rect x="63" y="63" width="9" height="12" fill="#f8fafc" />
              </svg>
              
              {/* Celebration Confetti */}
              {state === 'celebrating' && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0], 
                        scale: [0, 1, 1, 0], 
                        x: (Math.random() - 0.5) * 100, 
                        y: -60 - Math.random() * 60,
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        delay: Math.random() * 0.2,
                        ease: "easeOut"
                      }}
                      className="absolute left-1/2 top-1/2"
                    >
                      <div 
                        className="w-2 h-2 rounded-sm" 
                        style={{ 
                          backgroundColor: ['#fbbf24', '#34d399', '#60a5fa', '#f87171', '#a78bfa'][i % 5] 
                        }} 
                      />
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Thinking Indicator */}
              {isThinking && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-4 -right-4 bg-white p-1 rounded-full shadow-md"
                >
                  <Sparkles size={16} className="text-primary-500 animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Hover Tooltip */}
          {!isChatOpen && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Click to chat with Cal
            </div>
          )}
        </div>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute pointer-events-auto w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            style={{ 
              left: position.x - 300, 
              top: position.y - 400,
              maxHeight: '450px'
            }}
          >
            {/* Chat Header */}
            <div className="bg-primary-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calculator size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Cal Assistant</h4>
                  <p className="text-[10px] text-primary-100">Online & Ready to help</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded-lg">
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  onClick={() => setInputText(action.label)}
                  className="flex-shrink-0 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Cal anything..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isThinking}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LilliputAgent;
