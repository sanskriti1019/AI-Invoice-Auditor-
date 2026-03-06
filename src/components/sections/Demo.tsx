"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertTriangle, FileText, Loader2, CheckCircle2, ChevronDown, ChevronUp, Download, X } from "lucide-react";
import { generateMockAnalysis, AnalysisResult } from "@/utils/mockAnalysis";

type ProcessedFile = {
  id: string; // added unique identifier for concurrent updates
  fileName: string;
  status: "queued" | "processing" | "complete";
  progress: number;
  result?: AnalysisResult;
};

export default function Demo({ onProcessed, onRemove }: { onProcessed?: (results: AnalysisResult[]) => void; onRemove?: (id: string) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [filesQueue, setFilesQueue] = useState<ProcessedFile[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const processFiles = useCallback(async (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      fileName: file.name,
      status: "queued" as const,
      progress: 0,
      result: undefined as AnalysisResult | undefined
    }));
    
    setFilesQueue(prev => [...prev, ...newFiles]);

    // Process files concurrently
    const newlyProcessed: AnalysisResult[] = [];
    
    const processFile = async (file: typeof newFiles[0]) => {
      setFilesQueue(current => {
        const queue = [...current];
        const targetIndex = queue.findIndex(q => q.id === file.id);
        if (targetIndex !== -1) {
            queue[targetIndex].status = "processing";
            queue[targetIndex].progress = 30; // OCR Step
        }
        return queue;
      });

      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400)); // OCR simulate

      setFilesQueue(current => {
        const queue = [...current];
        const targetIndex = queue.findIndex(q => q.id === file.id);
        if(targetIndex !== -1) queue[targetIndex].progress = 60; // Structuring Step
        return queue;
      });

      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400)); // Structure simulate
      
      setFilesQueue(current => {
        const queue = [...current];
        const targetIndex = queue.findIndex(q => q.id === file.id);
         if(targetIndex !== -1) queue[targetIndex].progress = 90; // Validation Step
        return queue;
      });

      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300)); // Validate simulate

      const result = generateMockAnalysis(file.fileName);
      newlyProcessed.push(result);

      setFilesQueue(current => {
        const queue = [...current];
        const targetIndex = queue.findIndex(q => q.id === file.id);
        if(targetIndex !== -1) {
            queue[targetIndex].status = "complete";
            queue[targetIndex].progress = 100;
            queue[targetIndex].result = result;
        }
        return queue;
      });
    };

    await Promise.all(newFiles.map(processFile));
    if (onProcessed) onProcessed(newlyProcessed);
  }, [onProcessed]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files).filter(
        f => f.type === "application/pdf" || f.type.startsWith("image/")
      );
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            processFiles(selectedFiles);
        }
      }
      // Reset input to allow selecting same files again if needed
      e.target.value = '';
    },
    [processFiles]
  );

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const isProcessingBatch = filesQueue.some(f => f.status === "processing" || f.status === "queued");
  const processedResults = filesQueue.filter(f => f.status === "complete" && f.result);
  
  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleRemoveFile = (queueId: string, analysisId: string) => {
    setFilesQueue(prev => prev.filter(f => f.id !== queueId));
    if (onRemove) onRemove(analysisId);
  };

  const handleDownloadReport = () => {
    if (processedResults.length === 0) return;
    
    // Create CSV content
    const headers = ["Vendor", "Invoice #", "Date", "Total Billed", "Potential Overcharge", "Issues Found"];
    const rows = processedResults.map(file => {
      const res = file.result!;
      return [
        res.extracted.vendorName,
        res.extracted.invoiceNumber,
        res.extracted.invoiceDate,
        res.summary.totalBilled,
        res.summary.potentialOvercharge,
        res.discrepancies.length
      ].join(",");
    });
    
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `audit-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="demo" className="py-24 md:py-32 px-6 bg-dark overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
            Upload Center
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Batch process multiple invoices simultaneously. The engine extracts, validates, and flags discrepancies in real-time.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="glass-card overflow-hidden"
        >
          <div className="p-8 border-b border-white/5 bg-dark-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-gray-100">Batch Processing Pipeline</h3>
            {processedResults.length > 0 && !isProcessingBatch && (
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white transition-all text-sm font-semibold glow-cyan hover:scale-105 active:scale-95"
                onClick={handleDownloadReport}
              >
                <Download className="w-4 h-4" />
                Download CSV Report
              </button>
            )}
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 relative overflow-hidden group ${
                isDragging 
                  ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
                  : "border-white/20 hover:border-primary/50 hover:bg-white/5"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <input
                type="file"
                accept=".pdf,image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="invoice-upload"
              />
              <label
                htmlFor="invoice-upload"
                className={`cursor-pointer block relative z-10`}
              >
                  <div className="w-16 h-16 rounded-full bg-dark border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-gray-200 font-semibold mb-2 text-lg">
                    Drop your invoices here or click to upload
                  </p>
                  <p className="text-sm text-gray-400">Supports PDF & Image files (Select multiple)</p>
              </label>
            </div>

            {/* Processing Queue */}
            {filesQueue.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Processing Queue</h4>
                <div className="grid gap-3">
                  <AnimatePresence>
                    {filesQueue.map((file, idx) => (
                      <motion.div 
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group/queue relative bg-dark/50 border border-white/10 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleRemoveFile(file.id, file.result?.extracted.id || "")}
                            className="p-1 px-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          
                          {file.status === "complete" ? (
                            <CheckCircle2 className="w-5 h-5 text-neon-green" />
                          ) : (
                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          )}
                          <span className="text-gray-200 font-medium text-sm truncate max-w-[200px] md:max-w-xs">{file.fileName}</span>
                        </div>
                        
                        <div className="flex-1 max-w-xs mx-4 hidden md:block">
                          <div className="h-1.5 w-full bg-dark-900 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full rounded-full ${file.status === 'complete' ? 'bg-neon-green' : 'bg-primary'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${file.progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        <div className="text-xs font-medium text-gray-400 min-w-[100px] text-right">
                          {file.status === "queued" && "Queued..."}
                          {file.status === "processing" && (
                             file.progress < 50 ? "Extracting..." :
                             file.progress < 80 ? "Structuring..." : "Validating..."
                          )}
                          {file.status === "complete" && "Analyzed"}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Results Viewer */}
            {processedResults.length > 0 && (
              <div className="space-y-4 pt-8">
                 <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Validation Results</h4>
                 <div className="grid gap-4">
                    {processedResults.map((file, idx) => {
                      const analysis = file.result!;
                      const hasHighRisk = analysis.discrepancies.some(d => d.severity === "high");
                      const isExpanded = expandedId === analysis.extracted.id;

                      return (
                        <div key={analysis.extracted.id} className="relative group/result border border-white/10 rounded-xl overflow-hidden bg-dark transition-colors hover:border-white/20">
                          {/* Card Header (Collapsible Trigger) */}
                          <div 
                            className="p-4 flex flex-wrap items-center justify-between cursor-pointer hover:bg-white/5 transition-colors gap-4"
                            onClick={() => toggleExpand(analysis.extracted.id)}
                          >
                             <div className="flex items-center gap-4 flex-1 min-w-[250px]">
                                {hasHighRisk ? (
                                  <div className="w-2 h-10 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                ) : analysis.discrepancies.length > 0 ? (
                                  <div className="w-2 h-10 rounded-full bg-neon-amber shadow-[0_0_10px_rgba(251,191,36,0.3)]"></div>
                                ) : (
                                  <div className="w-2 h-10 rounded-full bg-neon-green shadow-[0_0_10px_rgba(74,222,128,0.3)]"></div>
                                )}
                                <div>
                                  <h5 className="font-semibold text-gray-100 flex items-center gap-2">
                                    {analysis.extracted.vendorName}
                                    {hasHighRisk && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 font-bold uppercase border border-red-500/30">High Risk</span>}
                                  </h5>
                                  <p className="text-xs text-gray-400">{analysis.extracted.invoiceNumber} • {analysis.extracted.invoiceDate}</p>
                                </div>
                             </div>

                             <div className="flex items-center gap-6 text-sm">
                                <div className="text-right hidden sm:block">
                                  <p className="text-gray-400 text-xs">Total Billed</p>
                                  <p className="font-semibold text-gray-200">{formatCurrency(analysis.summary.totalBilled)}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-gray-400 text-xs">Flagged Issues</p>
                                  <p className={`font-semibold ${analysis.discrepancies.length > 0 ? 'text-neon-amber' : 'text-neon-green'}`}>
                                    {analysis.discrepancies.length}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-dark-900 rounded-lg border border-white/5">
                                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                  </div>
                                  
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveFile(file.id, analysis.extracted.id);
                                    }}
                                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20"
                                    title="Remove Report"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                             </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/5 bg-dark-900/40"
                              >
                                <div className="p-6 grid lg:grid-cols-3 gap-8">
                                  <div className="lg:col-span-2 space-y-4">
                                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Line Items</h4>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="border-b border-white/10 text-gray-400">
                                            <th className="text-left font-medium pb-2">Description</th>
                                            <th className="text-right font-medium pb-2">Qty</th>
                                            <th className="text-right font-medium pb-2">Rate</th>
                                            <th className="text-right font-medium pb-2">Amount</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                          {analysis.extracted.lineItems.map((item, i) => (
                                            <tr key={i} className="text-gray-300">
                                              <td className="py-3">{item.description}</td>
                                              <td className="text-right py-3 text-gray-400">{item.quantity} {item.unit}</td>
                                              <td className="text-right py-3">{formatCurrency(item.rate)}</td>
                                              <td className="text-right py-3">{formatCurrency(item.amount)}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>

                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        Discrepancies
                                      </h4>
                                      {analysis.discrepancies.length === 0 ? (
                                        <div className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm flex items-center gap-2">
                                           <CheckCircle2 className="w-4 h-4" />
                                           No issues detected. Clear for payment.
                                        </div>
                                      ) : (
                                        <div className="space-y-3">
                                          {analysis.discrepancies.map((d) => (
                                            <div
                                              key={d.id}
                                              className={`p-4 rounded-lg border ${
                                                d.severity === "high"
                                                  ? "bg-red-500/5 border-red-500/20"
                                                  : d.severity === "medium" 
                                                    ? "bg-amber-500/5 border-amber-500/20"
                                                    : "bg-blue-500/5 border-blue-500/20"
                                              }`}
                                            >
                                              <p className={`font-semibold text-sm mb-1 ${d.severity === 'high' ? 'text-red-400' : d.severity === 'medium' ? 'text-amber-400' : 'text-blue-400'}`}>
                                                {d.type}
                                              </p>
                                              <p className="text-xs text-gray-400">{d.detail}</p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    <div className="p-4 rounded-xl bg-dark border border-white/5">
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-gray-400">
                                          <span>Extracted Billed Amount</span>
                                          <span className="text-gray-200">{formatCurrency(analysis.summary.totalBilled)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400">
                                          <span>AI Validated Correct Amount</span>
                                          <span className="text-neon-green">{formatCurrency(analysis.summary.estimatedCorrect)}</span>
                                        </div>
                                        {analysis.summary.potentialOvercharge > 0 && (
                                          <div className="flex justify-between font-semibold pt-3 mt-3 border-t border-white/10">
                                            <span className="text-red-400">Potential Overcharge Detected</span>
                                            <span className="text-red-400">{formatCurrency(analysis.summary.potentialOvercharge)}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                 </div>
              </div>
            )}
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
