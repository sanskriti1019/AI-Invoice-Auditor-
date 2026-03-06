"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileQuestion, Brain, Users } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/scrollAnimation";

const themes = [
  {
    icon: FileQuestion,
    title: "Real invoice formats are messy",
    description:
      "Vendors use entirely different layouts, fonts, and structures. The AI engine is built to handle extreme variation—not rigid templates.",
  },
  {
    icon: Brain,
    title: "Errors hide in business logic",
    description:
      "Most invoice issues aren't OCR extraction failures. They're mismatches between what was historically billed and what was formally agreed. Deep algorithmic validation matters more than raw text accuracy.",
  },
  {
    icon: Users,
    title: "Automation assists, humans decide",
    description:
      "The system surfaces statistical anomalies, contract violations, and discrepancies. Finance professionals make the final call, turning the platform into a high-powered decision support tool.",
  },
];

export default function DesignPhilosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-100 mb-4"
          >
            Engineering Philosophy
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            The architectural reasoning behind the platform's processing engine.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {themes.map((theme, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-6 items-start glass-card p-8 group relative overflow-hidden"
            >
               {/* Hover gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-dark border border-white/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 relative z-10">
                <theme.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">{theme.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{theme.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
