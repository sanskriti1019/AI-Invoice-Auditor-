"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[150] bg-dark-900 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      onAnimationComplete={(definition) => {
        // Since we are checking exit in the parent AnimatePresence, this component unmounts.
        // We trigger onComplete before exit finishes to start animating the app underneath.
      }}
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
           className="w-full h-[1px] bg-primary/30 absolute top-1/2"
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           transition={{ duration: 1.5, ease: "circOut" }}
        />
        <motion.div 
           className="h-full w-[1px] bg-primary/30 absolute left-1/2"
           initial={{ scaleY: 0 }}
           animate={{ scaleY: 1 }}
           transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-24 h-24 mb-6 flex items-center justify-center"
        >
          {/* Outer glowing rings */}
          <motion.div 
            className="absolute inset-0 border border-primary/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-2 border border-accent-purple/50 rounded-full border-dashed"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Core Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-primary z-10"
          >
             <Cpu className="w-10 h-10" strokeWidth={1.5} />
          </motion.div>
          
          <div className="absolute inset-0 bg-primary/20 blur-[20px] rounded-full"></div>
        </motion.div>

        {/* Text Sequence */}
        <div className="h-8 overflow-hidden relative">
          <motion.div
            initial={{ y: 32 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            className="text-gray-200 font-bold tracking-[0.2em] text-lg uppercase flex gap-1"
          >
            {Array.from("AI Auditor Core").map((letter, i) => (
               <motion.span 
                 key={i}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1 + i * 0.05 }}
                 className={letter === " " ? "w-2" : ""}
               >
                 {letter}
               </motion.span>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="h-[2px] bg-primary mt-4 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6, ease: "circInOut" }}
          onAnimationComplete={() => {
            // Trigger completion slightly after the progress bar fills
            setTimeout(onComplete, 500);
          }}
        />
      </div>
    </motion.div>
  );
}
