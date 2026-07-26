import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Target, Users, TrendingUp, ShieldCheck, Globe, Zap, MapPin, Radio, Shield, BrainCircuit, Activity, PhoneCall, BarChart3, Clock } from 'lucide-react';
import { ThreeGlobe } from './ThreeGlobe';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Interactive 3D Rotation based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const features = [
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      title: 'Ownership & Alignment',
      description: 'We do not just execute tasks; we take ownership of outcomes. We integrate into your culture, acting as a seamless extension of your internal teams rather than a distant vendor.',
    },
    {
      icon: <Target className="w-5 h-5 text-purple-400" />,
      title: 'Operational Excellence',
      description: 'Built on Six Sigma and continuous improvement frameworks. We obsess over optimizing workflows, removing friction, and elevating the baseline quality of every process we touch.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      title: 'Scalable Architecture',
      description: 'Our talent models and AI infrastructures are designed for infinite scale. As your volume spikes or business pivots, our operational bandwidth adapts effortlessly.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-400" />,
      title: 'Data Security & Compliance',
      description: 'Enterprise-grade security protocols governing all data handling, ensuring your sensitive information and customer data remain heavily protected and compliant at all times.',
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-[#050711]">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_75%)] pointer-events-none"></div>
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Futuristic Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(59,130,246,0.25)] backdrop-blur-md"
            >
              <Globe className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
              The EVOQ Difference
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Not just an outsourcing company. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">Your strategic growth partner.</span>
            </h2>
            
            <div className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 space-y-4 leading-relaxed">
              <p>
                We recognized a critical flaw in traditional BPO models: they optimize for billable hours and headcount, not for your business outcomes. They treat your operations as a cost center to be minimized.
              </p>
              <p>
                <strong>EVOQ was built to change this paradigm.</strong> We engineer scalable operations by fusing top-tier, rigorously vetted global talent with powerful AI automation. We do not just answer tickets or process data; we analyze patterns, suggest structural improvements, and help you build a leaner, smarter business that is primed for hyper-growth.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {features.map((feature, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  key={index} 
                  className="bg-[#0b0e1b]/80 border border-white/10 rounded-2xl p-4 sm:p-5 hover:bg-[#121629] hover:border-blue-500/40 transition-all duration-300 group backdrop-blur-md shadow-lg"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#161b2d] border border-white/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:border-blue-500/40 transition-all shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 3D Cyber Globe with Mobile-Responsive Node Placement */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[500px] sm:h-[620px] lg:h-[720px] w-full"
            style={{ perspective: 1500 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
          >
            {/* Outer Holographic Glow Backplane */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-emerald-500/20 blur-3xl -z-10 rounded-full animate-pulse"></div>
            
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-[#080a14]/95 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between p-4 sm:p-8"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between z-20 pb-3 sm:pb-4 border-b border-white/10 gap-2" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.7)]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.7)]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/90 shadow-[0_0_8px_rgba(34,197,94,0.7)]"></div>
                  </div>
                  <div className="h-4 w-px bg-white/15"></div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-emerald-500/30">
                    <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
                    OPERATIONS_LIVE
                  </div>
                </div>

                {/* Location Highlight: Faridabad, India */}
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-blue-300 bg-blue-500/15 px-2.5 py-1 rounded-full border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.35)]">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 animate-bounce" style={{ animationDuration: '2s' }} />
                  <span className="font-semibold text-white">Faridabad, India</span>
                </div>
              </div>

              {/* Central 3D Globe Visualizer */}
              <div className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden">
                <ThreeGlobe className="w-full h-full" />

                {/* Node 1: Faridabad HQ - Responsive transform */}
                <motion.div 
                  className="absolute z-30 bg-[#0d1224]/90 border border-blue-500/50 backdrop-blur-xl p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center gap-2 sm:gap-3 scale-90 sm:scale-100"
                  style={{ transform: "translateZ(90px) translateX(-70px) sm:translateX(-130px) translateY(-100px)" }}
                  animate={{ y: [-100, -108, -100] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-inner">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-blue-400 uppercase tracking-wider">Operations HQ</div>
                    <div className="text-xs sm:text-sm font-bold text-white">Faridabad, India</div>
                  </div>
                </motion.div>

                {/* Node 2: Active Calls - Responsive transform */}
                <motion.div 
                  className="absolute z-30 bg-[#0d1224]/90 border border-purple-500/50 backdrop-blur-xl p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 scale-90 sm:scale-100"
                  style={{ transform: "translateZ(90px) translateX(70px) sm:translateX(130px) translateY(-100px)" }}
                  animate={{ y: [-100, -92, -100] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400">
                    <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-purple-400 uppercase tracking-wider">Active Calls</div>
                    <div className="text-xs sm:text-sm font-bold text-white">142 Live Sessions</div>
                  </div>
                </motion.div>

                {/* Node 3: QA Report - Responsive transform */}
                <motion.div 
                  className="absolute z-30 bg-[#0d1224]/90 border border-emerald-500/50 backdrop-blur-xl p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-2 sm:gap-3 scale-90 sm:scale-100"
                  style={{ transform: "translateZ(90px) translateY(105px)" }}
                  animate={{ y: [105, 97, 105] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-emerald-400 uppercase tracking-wider">QA Report</div>
                    <div className="text-xs sm:text-sm font-bold text-white">98.5% Quality Score</div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Real-Time Telemetry Bar */}
              <div className="z-20 pt-3 sm:pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-300">HUB: <strong className="text-white">FARIDABAD_INDIA</strong></span>
                </div>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono text-gray-400">
                  <span>ACTIVE CALLS: <strong className="text-purple-400">142 LIVE</strong></span>
                  <span>QA SCORE: <strong className="text-emerald-400">98.5%</strong></span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
