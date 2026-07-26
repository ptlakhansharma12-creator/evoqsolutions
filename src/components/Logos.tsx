import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const services = [
  "AI-Driven Customer Support",
  "Back-Office Automation",
  "Technical Support Pods",
  "Revenue Operations",
  "Process Optimization",
  "Round-the-clock Multilingual Coverage",
  "Data Annotation & QA",
  "Sales Ops Support"
];

export function Logos() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0a0a0a] overflow-hidden">
      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div 
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30
          }}
        >
          {/* We duplicate the array and add a gap to the end of each to ensure exact 50% scrolling */}
          {[...services, ...services].map((service, i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              <span className="font-heading font-medium text-2xl md:text-3xl tracking-tight text-white/40 hover:text-white/80 transition-colors">
                {service}
              </span>
              <Sparkles className="w-5 h-5 text-blue-500/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
