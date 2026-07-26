import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, Database, Bot, Users, LineChart, FileText, Settings, ShieldCheck, X, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Customer Experience Operations',
    description: 'Omnichannel support that prioritizes resolution and brand loyalty, seamlessly integrated with your product.',
    details: 'Our Customer Experience Operations include round-the-clock omnichannel support, ticketing management, escalation protocols, and dedicated account managers to ensure your customers receive fast and accurate resolutions. We utilize AI-assisted tools for agent empowerment, sentiment analysis, and continuous quality improvement to build lasting brand loyalty.',
    icon: <Headphones className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'AI Automation & Workflow',
    description: 'Intelligent process automation that reduces manual errors and dramatically increases operational throughput.',
    details: 'We deploy AI-POWERED CUSTOMERSUPPORT and Robotic Process Automation (RPA) to handle repetitive tasks like data entry, routing, and basic inquiries. This drastically cuts down response times, minimizes human error, and frees your core team to focus on high-value, strategic initiatives.',
    icon: <Bot className="w-6 h-6 text-purple-400" />
  },
  {
    title: 'Back Office Operations',
    description: 'Efficient handling of core administrative functions, allowing your core team to focus on strategic growth.',
    details: 'From data processing and transcription to order fulfillment tracking and inventory management, our back-office solutions ensure the unseen gears of your business run flawlessly. We combine human oversight with automated validation tools for maximum accuracy.',
    icon: <Database className="w-6 h-6 text-emerald-400" />
  },
  {
    title: 'Virtual Teams & Staffing',
    description: 'Dedicated, highly-trained professionals managed by our operational leads, acting as your extended workforce.',
    details: 'Scale your team without the overhead of traditional hiring. We provide specialized talent pools tailored to your industry, fully managed by our operational leaders to ensure they seamlessly integrate into your company culture and workflows.',
    icon: <Users className="w-6 h-6 text-orange-400" />
  },
  {
    title: 'Reporting & Analytics',
    description: 'Deep visibility into operational metrics with custom dashboards and actionable intelligence.',
    details: 'Data is only useful if it drives action. We build real-time reporting dashboards that track KPIs, SLA adherence, and operational bottlenecks, providing you with the insights needed to make informed, strategic decisions.',
    icon: <LineChart className="w-6 h-6 text-pink-400" />
  },
  {
    title: 'Process Documentation',
    description: 'Standard operating procedures (SOPs) engineered for clarity, consistency, and rapid onboarding.',
    details: 'We do not just execute; we document. Our team maps out your entire operational workflow, creating clear, step-by-step SOPs that ensure consistency, reduce training time for new hires, and protect against knowledge loss.',
    icon: <FileText className="w-6 h-6 text-cyan-400" />
  },
  {
    title: 'Operational Consulting',
    description: 'Strategic audits of your current workflows to identify bottlenecks and implement scalable solutions.',
    details: 'Before we implement, we analyze. Our consulting team audits your current tech stack, team structure, and workflows to identify inefficiencies and design a customized blueprint for scalable, sustainable growth.',
    icon: <Settings className="w-6 h-6 text-yellow-400" />
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous QA frameworks that maintain high standards across all customer interactions and backend processes.',
    details: 'Quality is never left to chance. We implement robust QA frameworks involving random sampling, peer reviews, and AI-driven compliance checks to ensure every interaction and process meets your exact brand standards.',
    icon: <ShieldCheck className="w-6 h-6 text-red-400" />
  }
];

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="py-32 bg-[#080910] border-y border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 inline-block shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Comprehensive Operations. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
              Engineered for Scale.
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We provide a complete ecosystem of operational services. Whether you need an elite customer experience team or end-to-end back-office automation, we build the engine that drives your business forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.04, 
                y: -8, 
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(59,130,246,0.15)",
              }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-[#0e111a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-7 transition-all flex flex-col h-full overflow-hidden cursor-pointer hover:border-blue-500/40"
              onClick={() => setSelectedService(service)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all"></div>
              
              <div className="w-12 h-12 rounded-2xl bg-[#161a26] flex items-center justify-center mb-6 border border-white/10 shadow-inner group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-blue-300 transition-colors">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                {service.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#0f121d] border border-white/15 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
              
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-[#161a26] flex items-center justify-center mb-8 border border-white/10 shadow-inner">
                {selectedService.icon}
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">{selectedService.title}</h3>
              <p className="text-xl text-blue-400 font-medium mb-6">
                {selectedService.description}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {selectedService.details}
              </p>
              
              <div className="mt-10">
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-evoq-black bg-white rounded-xl hover:bg-blue-50 transition-all active:scale-[0.98] shadow-lg shadow-white/10"
                >
                  Discuss this service
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
