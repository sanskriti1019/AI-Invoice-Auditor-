"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Percent,
  Hash,
  Copy,
  Search,
  FileSignature,
  Calculator,
  TrendingUp,
} from "lucide-react";
import Card from "../ui/Card";
import { fadeInUp, staggerContainer } from "@/utils/scrollAnimation";

const checks = [
  {
    icon: Percent,
    title: "GST rate verification",
    description: "Ensures GST rates legitimately match the applicable HSN code and product category.",
    color: "text-primary"
  },
  {
    icon: Hash,
    title: "HSN code validation",
    description: "Verifies that HSN codes strictly align with the described goods or services in the database.",
    color: "text-accent-cyan"
  },
  {
    icon: Copy,
    title: "Duplicate invoice detection",
    description: "Utilizes fuzzy logic to flag invoices that may have been implicitly or explicitly processed more than once.",
    color: "text-neon-amber"
  },
  {
    icon: Search,
    title: "Mystery surcharge detection",
    description: "Identifies unexplained fees, stealth charges, or add-ons not concretely covered by contract terms.",
    color: "text-accent-purple"
  },
  {
    icon: FileSignature,
    title: "Contract rate mismatches",
    description: "Programmatically compares billed rates line-by-line against your centralized agreed contract or PO rates.",
    color: "text-neon-pink"
  },
  {
    icon: Calculator,
    title: "Calculation inconsistencies",
    description: "Checks that all line item totals, subtotals, and complex tax cascading calculations add up correctly.",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Historical price anomalies",
    description: "Machine learning models surface unusual trajectory changes compared to prior invoices from the same vendor.",
    color: "text-neon-green"
  },
];

export default function WhatItChecks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-dark">
      <div className="max-w-6xl mx-auto">
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
            Deep Auditing Parameters
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            The engine automatically scans every invoice against multiple high-risk vectors.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {checks.map((check, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="glass-card h-full p-6 group hover:-translate-y-1 transition-transform">
                <div className={`w-12 h-12 rounded-lg bg-dark-900 border border-white/5 flex items-center justify-center mb-4 ${check.color} shadow-[0_0_15px_currentColor] opacity-80 group-hover:opacity-100 transition-opacity`}>
                   <check.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-white transition-colors">{check.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{check.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
