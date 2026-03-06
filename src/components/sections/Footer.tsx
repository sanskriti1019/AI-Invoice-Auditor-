"use client";

import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-dark-900 border-t border-white/5 text-gray-300 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/10 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-100 mb-2">AI Invoice Auditor</h3>
            <p className="text-gray-400 text-sm max-w-md">
              A decision-support tool for finance teams. This tool highlights potential discrepancies and should be used as a decision-support system.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <span>About</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:sanskritisingh197@gmail.com"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>sanskritisingh197@gmail.com</span>
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/20"
        >
          <p className="text-sm text-white/60 text-center">
            Disclaimer: This tool highlights potential discrepancies and should be used as a decision-support system. It does not replace professional financial review.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
