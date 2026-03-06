"use client";

import { motion } from "framer-motion";

export default function WriteUp() {
  return (
    <section className="py-24 md:py-32 px-6 bg-dark">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
            System Architecture & Vision
          </h2>
          <p className="text-xl text-primary font-medium tracking-wide">
            A deeper look at the insight and technical decisions behind the platform.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg prose-invert max-w-none text-gray-400 space-y-8"
        >
          <p className="leading-relaxed">
            <span className="text-gray-200 font-semibold">The core insight driving this system</span> is that invoice errors are mostly business-logic based, not extraction-based. When finance teams talk about "catching mistakes," they rarely mean that the OCR misread a number. They mean that the vendor charged 18% GST when the product category warrants 12%, or that the rate on the invoice exceeds the negotiated contract rate, or that the same invoice number appeared in a previous batch. These are complex validation problems—comparing extracted data against rules, contracts, and historical patterns—rather than pure data capture problems.
          </p>

          <p className="leading-relaxed">
            This is why <span className="text-gray-200 font-semibold">multi-dimensional anomaly detection</span> matters more than extraction accuracy alone. A system that extracts perfectly but does nothing with the data adds little value. Conversely, a platform that extracts reasonably well but excels at surfacing discrepancies—rate mismatches, duplicate invoices, unexpected surcharges, calculation errors—can meaningfully assist finance teams and save significant capital.
          </p>

          <div className="p-8 my-10 border-l-4 border-primary bg-primary/5 rounded-r-2xl shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]">
            <p className="text-xl italic text-gray-300 m-0">
              "The intelligence is in understanding what 'correct' looks like for a given financial context and aggressively surfacing deviations for human review."
            </p>
          </div>

          <p className="leading-relaxed">
            The design deliberately focuses on <span className="text-gray-200 font-semibold">explainable AI results</span>. Each flagged discrepancy includes a clear warning message and, where possible, a suggested programmatic correction or reference. Black-box "AI says there's a problem" outputs are disastrous in an audit context where regulatory accountability and mathematical traceability matter. By making the algorithmic reasoning transparent, the system positions itself as an enterprise-grade decision-support tool.
          </p>

          <p className="leading-relaxed">
            Building this platform reinforced several architectural necessities. First, the variety of real-world invoice formats is enormous—designing for <span className="text-gray-200 font-semibold">ingestion flexibility</span> from the start is essential. Second, business rules vary widely by industry and contract type; a dynamic, configurable rules engine is exponentially more valuable than hardcoded checks. Finally, avoiding exaggerated claims about "total automation" builds actual trust. Positioning this as a powerful analytic assistant aligns with both the technical reality of machine learning and the rigorous expectations of finance directors.
          </p>
        </motion.article>
      </div>
    </section>
  );
}
