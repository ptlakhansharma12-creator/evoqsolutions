import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Maximize, BarChart, RefreshCw, Clock, Handshake, ArrowRight } from 'lucide-react';

const industries = [
  'E-commerce & Retail', 'SaaS & Technology', 'Healthcare & Telemed', 
  'FinTech & Crypto', 'EdTech', 'Travel & Hospitality', 
  'Real Estate', 'Professional Services', 'Subscription Businesses'
];

const reasons = [
  { title: 'Dedicated Team', icon: <Shield className="w-5 h-5 text-blue-400" /> },
  { title: 'AI-Driven Efficiency', icon: <Zap className="w-5 h-5 text-purple-400" /> },
  { title: 'Scalable Workforce', icon: <Maximize className="w-5 h-5 text-emerald-400" /> },
  { title: 'Transparent Reporting', icon: <BarChart className="w-5 h-5 text-pink-400" /> },
  { title: 'Process Improvement', icon: <RefreshCw className="w-5 h-5 text-yellow-400" /> },
  { title: 'Fast Response Times', icon: <Clock className="w-5 h-5 text-cyan-400" /> },
  { title: 'Business Partnership', icon: <Handshake className="w-5 h-5 text-orange-400" /> }
];

export function FeaturesGrid() {
  return (
    <>
      {/* Industries */}
      <section className="py-24 bg-[#050505] border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        >
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-12">
            Industries we accelerate
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {industries.map((ind, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                key={i} 
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300 hover:bg-blue-500/15 hover:border-blue-500/40 hover:text-white transition-all cursor-default shadow-md"
              >
                {ind}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why EVOQ */}
      <section className="py-32 bg-[#080910] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why partner with EVOQ?</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reasons.map((reason, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={i} 
                className="bg-[#0f121e]/80 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-blue-500/40 hover:bg-[#151928] transition-all shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">{reason.title}</h4>
              </motion.div>
            ))}
            
            <motion.a 
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3, delay: reasons.length * 0.05 }}
              className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 border border-blue-500/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 hover:border-blue-500/60 hover:from-blue-600/30 transition-all cursor-pointer shadow-xl group"
            >
               <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Let's Talk Growth</h4>
               <span className="text-xs text-blue-400 font-medium flex items-center gap-1">Book a Call &rarr;</span>
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
}
