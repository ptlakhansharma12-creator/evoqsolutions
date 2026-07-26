import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Cpu, Fingerprint, Network } from 'lucide-react';

export function AiAdvantage() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Interactive 3D Rotation based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
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
    <section id="ai-advantage" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 relative"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl -z-10 rounded-full"></div>
            
            {/* 3D Interactive Tech Visual */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative aspect-square rounded-full border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl flex items-center justify-center shadow-2xl cursor-crosshair"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_100%)] rounded-full"></div>
              
              {/* Outer Animated 3D Ring */}
              <motion.div 
                animate={{ rotateZ: 360, rotateX: [20, -20, 20], rotateY: [-20, 20, -20] }} 
                transition={{ rotateZ: { duration: 40, repeat: Infinity, ease: "linear" }, rotateX: { duration: 15, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 15, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute w-[90%] h-[90%] rounded-full border border-blue-500/30 border-dashed"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
              />

              {/* Middle Animated 3D Ring */}
              <motion.div 
                animate={{ rotateZ: -360, rotateX: [-15, 15, -15], rotateY: [15, -15, 15] }} 
                transition={{ rotateZ: { duration: 30, repeat: Infinity, ease: "linear" }, rotateX: { duration: 12, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute w-[70%] h-[70%] rounded-full border-2 border-purple-500/20"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}
              />
              
              {/* Inner Glowing Core */}
              <motion.div 
                style={{ transform: "translateZ(100px)", transformStyle: "preserve-3d" }}
                className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.3)]"
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <span className="text-evoq-black font-extrabold text-2xl tracking-tighter">AI</span>
                </motion.div>
                
                {/* Floating Orbiting Nodes */}
                <motion.div 
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#111] border border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    style={{ transform: "translateZ(30px)", rotateZ: -360 }}
                  >
                    <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                      <Fingerprint className="w-5 h-5 text-blue-400" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  animate={{ rotateZ: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-[#111] border border-purple-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                      <Cpu className="w-5 h-5 text-purple-400" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#111] border border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                      <Network className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-medium text-emerald-400 uppercase tracking-widest mb-4 block">The EVOQ Formula</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              AI speed. <br />
              <span className="text-gray-500">Human empathy.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We do not believe AI will replace your workforce. We believe a workforce empowered by AI will replace those who are not. Our hybrid model uses automation for speed and data, reserving human intelligence for empathy, strategy, and complex problem-solving.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-full bg-white/10 mx-auto mt-2"></div>
                </div>
                <div className="pb-8">
                  <h4 className="text-lg font-semibold text-white mb-2">Automate the Predictable</h4>
                  <p className="text-sm text-gray-400">We deploy AI-POWERED CUSTOMERSUPPORT and RPA to handle repetitive inquiries, data entry, and workflow routing—slashing response times and lowering operational costs.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <div className="w-0.5 h-full bg-white/10 mx-auto mt-2"></div>
                </div>
                <div className="pb-8">
                  <h4 className="text-lg font-semibold text-white mb-2">Human Oversight & Quality</h4>
                  <p className="text-sm text-gray-400">Our experienced professionals manage the AI, handle escalations, and provide the nuanced, empathetic support that algorithms cannot replicate.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Continuous Optimization</h4>
                  <p className="text-sm text-gray-400">Through operational visibility and machine learning, our systems get smarter over time, constantly improving the customer experience and backend efficiency.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
