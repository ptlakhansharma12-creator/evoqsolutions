import React from 'react';
import { motion } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, BrainCircuit, Cpu, Network, Zap, Sparkles } from 'lucide-react';

const faqs = [
  { 
    q: "How does EVOQ differ from traditional BPOs?", 
    a: "Traditional BPOs scale by adding more headcount, often at the cost of quality. EVOQ scales through an outcome-aligned model: we combine streamlined operational frameworks with elite dedicated talent to manage complexity and strategy. This results in higher efficiency and a superior customer experience." 
  },
  { 
    q: "What is your onboarding process like?", 
    a: "Our onboarding is divided into a strategic Discovery phase, followed by Implementation. We audit your existing workflows, document SOPs, integrate seamlessly with your team, and train our dedicated specialists on your brand voice. The timeline varies from 2-4 weeks depending on complexity." 
  },
  { 
    q: "Do you integrate with our existing software?", 
    a: "Yes. We work within your existing tech stack (Zendesk, Salesforce, Intercom, Shopify, etc.) seamlessly to enhance visibility and speed without disrupting your current operational setup." 
  },
  { 
    q: "How do you ensure data security?", 
    a: "Security is foundational. We employ enterprise-grade security protocols, including end-to-end encryption, strict access controls, enterprise compliance standards, and regular security audits to protect your data and your customers' privacy." 
  }
];

export function FaqAndCases() {
  return (
    <>
      {/* 3D Hybrid Synergy Section */}
      <section className="py-32 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">The Hybrid <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Advantage</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Where elite human intelligence meets operational scalability.</p>
          </motion.div>

          {/* 3D Visualization */}
          <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center" style={{ perspective: 1200 }}>
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Human Brain Node (Left) */}
              <motion.div 
                className="absolute left-0 md:left-12 flex flex-col items-center gap-4"
                style={{ transform: "translateZ(100px) rotateY(-20deg)" }}
              >
                <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center relative backdrop-blur-md">
                  <div className="absolute inset-0 rounded-full border border-blue-400/50 animate-ping" style={{ animationDuration: '3s' }}></div>
                  <BrainCircuit className="w-10 h-10 text-blue-400" />
                </div>
                <div className="text-center bg-black/50 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                  <h3 className="text-white font-semibold">Human Intuition</h3>
                  <p className="text-xs text-blue-400">Empathy & Strategy</p>
                </div>
              </motion.div>

              {/* Connecting Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                <div className="w-full max-w-md h-px bg-gradient-to-r from-blue-500/50 via-white/50 to-purple-500/50 relative">
                   <motion.div 
                     animate={{ x: ["0%", "100%", "0%"] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute top-1/2 -translate-y-1/2 w-16 h-1 bg-white rounded-full blur-sm shadow-[0_0_15px_rgba(255,255,255,1)]"
                   />
                </div>
              </div>

              {/* Central Synergy Core */}
              <div className="absolute flex flex-col items-center justify-center z-20" style={{ transform: "translateZ(150px)" }}>
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], rotateZ: [0, 180, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center relative"
                >
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 blur-md"></div>
                  <Network className="w-12 h-12 text-white relative z-10" />
                </motion.div>
                <div className="mt-6 text-center bg-black/60 px-6 py-3 rounded-xl border border-white/20 backdrop-blur-md shadow-2xl">
                  <h3 className="text-xl font-bold text-white tracking-wide">EVOQ CORE</h3>
                  <p className="text-sm text-gray-300">Seamless Integration</p>
                </div>
              </div>

              {/* AI Node (Right) */}
              <motion.div 
                className="absolute right-0 md:right-12 flex flex-col items-center gap-4"
                style={{ transform: "translateZ(100px) rotateY(20deg)" }}
              >
                <div className="w-24 h-24 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center relative backdrop-blur-md">
                  <div className="absolute inset-0 rounded-full border border-purple-400/50 animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }}></div>
                  <Cpu className="w-10 h-10 text-purple-400" />
                </div>
                <div className="text-center bg-black/50 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                  <h3 className="text-white font-semibold">Smart Operations</h3>
                  <p className="text-xs text-purple-400">Speed & Scale</p>
                </div>
              </motion.div>

              {/* Orbiting particles */}
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/5 rounded-full"
                  style={{ width: `${300 + i * 100}px`, height: `${300 + i * 100}px`, left: '50%', top: '50%', marginLeft: `-${150 + i * 50}px`, marginTop: `-${150 + i * 50}px`, transform: `rotateX(${60 + i * 10}deg)` }}
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                </motion.div>
              ))}

            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
               <Zap className="w-6 h-6 text-yellow-400 mb-4" />
               <h4 className="text-lg font-semibold text-white mb-2">Instant Triage</h4>
               <p className="text-sm text-gray-400">Smart routing categorizes requests instantly, ensuring they reach the right human expert without delay.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
               <BrainCircuit className="w-6 h-6 text-blue-400 mb-4" />
               <h4 className="text-lg font-semibold text-white mb-2">Cognitive Assist</h4>
               <p className="text-sm text-gray-400">Agents are empowered with real-time suggested responses and context, reducing cognitive load.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
               <Sparkles className="w-6 h-6 text-purple-400 mb-4" />
               <h4 className="text-lg font-semibold text-white mb-2">Continuous Learning</h4>
               <p className="text-sm text-gray-400">Every human resolution refines the operational knowledge base, making the system smarter over time.</p>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i}
              >
                <Accordion.Item value={`item-${i}`} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden data-[state=open]:border-white/20 transition-colors">
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
                      <span className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{faq.q}</span>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform duration-300" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </section>
    </>
  );
}
