"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileWarning, Clock, Layers, BarChart3 } from "lucide-react";
import Card from "../ui/Card";
import { fadeInUp, staggerContainer } from "@/utils/scrollAnimation";

const problems = [
  {
    icon: FileWarning,
    title: "5–10% error rate in invoices",
    description:
      "Industry estimates suggest that a significant portion of vendor invoices contain billing errors—from incorrect GST rates to systemic calculation mistakes.",
  },
  {
    icon: Clock,
    title: "Manual audits hit limits",
    description:
      "Finance teams process thousands of invoices each cycle. Manual verification is impossibly slow, tedious, and prone to human oversight.",
  },
  {
    icon: Layers,
    title: "Fragmented file formats",
    description:
      "Vendors use entirely different invoice layouts, formats, and terminology. Standardizing structural extraction manually is a nightmare.",
  },
  {
    icon: BarChart3,
    title: "Opaque billing logic",
    description:
      "Billing rules differ by contract type and vendor. Without algorithmic verification, checking complex multi-tier pricing is impossible.",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-dark-900 border-y border-white/5 relative reveal">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-accent-purple/5 opacity-50 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-100 mb-4"
          >
            Why Invoice Auditing Fails
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Traditional finance operations cannot scale to reliably catch complex billing anomalies.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {problems.map((problem, i) => (
            <motion.div key={i} variants={fadeInUp}>
               <div className="glass-card h-full p-8 relative overflow-hidden group hover:border-primary/50 shimmer card-hover">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500">
                  <problem.icon className="w-32 h-32 text-white" strokeWidth={1} />
                </div>
                <div className="w-12 h-12 rounded-xl bg-dark border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <problem.icon className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">{problem.title}</h3>
                <p className="text-gray-400 leading-relaxed relative z-10">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
