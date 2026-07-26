import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Play, Shield, Cpu, Zap, Activity, Users, Mail, Clock, CheckCircle2, Sparkles, TrendingUp, ChevronRight, Server, BrainCircuit, ShieldCheck } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Interactive 3D Rotation based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#050711]">
      {/* Interactive 3D WebGL Background Canvas */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas variant="hero" className="w-full h-full opacity-60" />
      </div>

      {/* Cyber ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="text-left">
            {/* Pill Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Next-Gen Operations Management</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Scale your operations with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">
                Human Intelligence & AI
              </span>
            </motion.h1>
            
            {/* Sub-headline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed"
            >
              EVOQ Solutions pairs top-tier global operational talent with proprietary AI workflows to eliminate bottlenecks, cut costs by up to 60%, and deliver enterprise-grade execution.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-evoq-black bg-white rounded-full hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.25)] group"
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:border-white/20 backdrop-blur-md"
              >
                Explore Solutions
              </a>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-6 text-gray-400 text-xs sm:text-sm font-medium"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>99.8% SLA Quality</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>24/7 Ops Coverage</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Enterprise Security</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive 3D Card Dashboard Container - Now Fully Responsive for Mobile & Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full min-h-[480px] sm:min-h-[580px] lg:h-[650px] mt-6 lg:mt-0"
            style={{ perspective: 1400 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
          >
            {/* 3D Floating Glow Backplane */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-transparent rounded-3xl blur-2xl transform translate-z-[-50px]"></div>

            {/* Main 3D Dashboard */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="w-full h-full bg-[#0d0f17]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-4 sm:gap-6"
            >
              {/* Top Dynamic Holographic Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_#3b82f6]"></div>
              
              {/* Dashboard Header */}
              <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-white/10" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.7)]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.7)]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/90 shadow-[0_0_8px_rgba(34,197,94,0.7)]"></div>
                  </div>
                  <div className="h-4 w-px bg-white/15"></div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-blue-400 bg-blue-500/15 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-blue-500/30">
                    <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
                    SYSTEM.LIVE
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                  </motion.div>
                  <div className="text-[10px] sm:text-xs font-mono text-gray-400">v2.4.1</div>
                </div>
              </div>

              {/* Top Row: KPIs */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3" style={{ transform: "translateZ(50px)" }}>
                {[
                  { icon: <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />, label: "Active Calls", value: "142", trend: "Live", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />, label: "Email Queue", value: "28", trend: "-12%", color: "text-purple-400", bg: "bg-purple-500/10" },
                  { icon: <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />, label: "QA Score", value: "98.5%", trend: "+0.5%", color: "text-yellow-400", bg: "bg-yellow-500/10" }
                ].map((kpi, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.03, translateZ: 15 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex flex-col gap-1.5 relative overflow-hidden group hover:border-blue-500/40 hover:bg-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl ${kpi.bg} border border-white/10 flex items-center justify-center`}>
                        {kpi.icon}
                      </div>
                      <span className={`text-[9px] sm:text-[10px] font-semibold ${kpi.color} ${kpi.bg} px-1 sm:px-1.5 py-0.5 rounded-full border border-white/5`}>{kpi.trend}</span>
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] text-gray-400 truncate">{kpi.label}</div>
                      <div className="text-base sm:text-xl font-bold text-white tracking-tight">{kpi.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 flex-1" style={{ transform: "translateZ(40px)" }}>
                {/* Left Column: AI Suggestions Feed */}
                <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col relative overflow-hidden backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                      <span className="text-xs sm:text-sm font-medium text-white">Live AI Suggestions</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_6px_#a855f7]"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Streaming Suggestions List */}
                  <div className="flex-1 flex flex-col gap-2 relative z-10 overflow-hidden">
                    {[
                      { type: 'Optimization', text: 'Recommend upgrading subscription to user #8492.', time: 'Just now' },
                      { type: 'Resolution', text: 'Auto-resolved 14 password reset tickets.', time: '2m ago' },
                      { type: 'Alert', text: 'Spike in API latency detected. Routing support.', time: '5m ago' }
                    ].map((suggestion, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/5 text-left hover:bg-white/10 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] sm:text-[10px] font-mono text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/30">
                            {suggestion.type}
                          </span>
                          <span className="text-[9px] text-gray-500 font-mono">{suggestion.time}</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-300 leading-snug line-clamp-2">{suggestion.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Real-time Workflow Meter */}
                <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs sm:text-sm font-medium text-white">Efficiency Rate</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">99.4%</span>
                  </div>

                  {/* Circular Radar Visualizer */}
                  <div className="relative aspect-square max-h-32 sm:max-h-36 mx-auto my-2 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border border-blue-500/30 border-dashed rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 border border-purple-500/20 rounded-full"
                    />
                    <div className="text-center z-10">
                      <div className="text-lg sm:text-2xl font-bold text-white font-mono">1.2k+</div>
                      <div className="text-[9px] sm:text-[10px] text-gray-400 font-mono uppercase">Tasks/Hr</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] sm:text-xs font-mono">
                    <span className="text-gray-400">AUTOMATION:</span>
                    <span className="text-blue-400 font-bold">ACTIVE</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
