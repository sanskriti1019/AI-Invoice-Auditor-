"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Scan, FileCheck, AlertTriangle, FileText } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/scrollAnimation";

const steps = [
  {
    icon: Upload,
    title: "Upload invoices",
    description: "Upload PDF or image files. The system supports batch processing for multiple vendor formats.",
  },
  {
    icon: Scan,
    title: "Extract key fields with AI",
    description: "Advanced OCR extraction identifies vendor names, invoice numbers, line items, and GST rates instantly.",
  },
  {
    icon: FileCheck,
    title: "Validate against contract rules",
    description: "Extracted data is algorithmically compared against your configured business rules and strict contract terms.",
  },
  {
    icon: AlertTriangle,
    title: "Identify anomalies",
    description: "Potential discrepancies and revenue leaks are flagged with detailed explanations for review.",
  },
  {
    icon: FileText,
    title: "Generate audit report",
    description: "Export a detailed audit report with findings, financial metrics, and a summary for your records.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2"></div>
      
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
            How the AI Pipeline Works
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            A five-step automated process to audit vendor invoices at scale.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl glass-card relative group"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dark-800 border border-white/10 text-primary flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <step.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  <span className="text-primary/70 mr-2 text-sm font-bold tracking-widest">0{i + 1}</span>
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
