import React from 'react';
import { motion } from 'motion/react';

const steps = [
  { id: '01', name: 'Discovery', desc: 'Deep dive into your current operations, bottlenecks, and growth goals.' },
  { id: '02', name: 'Strategy', desc: 'Designing a hybrid AI + Human operational blueprint tailored to your needs.' },
  { id: '03', name: 'Implementation', desc: 'Seamless onboarding, training, and technology integration with zero downtime.' },
  { id: '04', name: 'Optimization', desc: 'Continuous improvement loops to increase automation rates and quality.' },
  { id: '05', name: 'Scale', desc: 'Expanding capabilities dynamically as your business volume grows.' }
];

export function Process() {
  return (
    <section id="process" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4 inline-block shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            Our Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl tracking-tight">
            A proven framework for operational transformation.
          </h2>
        </motion.div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                key={i} 
                className="flex flex-col gap-6 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0f121e] border border-white/15 flex items-center justify-center text-xl font-bold text-white shadow-[0_0_25px_rgba(0,0,0,0.8)] relative group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                  {step.id}
                  {/* Glowing dot */}
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] border-2 border-[#050505]"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{step.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
