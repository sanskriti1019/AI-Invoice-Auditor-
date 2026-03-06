"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
  ComposedChart
} from "recharts";
import { fadeInUp, staggerContainer } from "@/utils/scrollAnimation";

const vendorData = [
  { name: "Tech Supplies", overcharge: 4200 },
  { name: "Office Depot", overcharge: 2800 },
  { name: "Cloud Services", overcharge: 1500 },
  { name: "Logistics Inc", overcharge: 3200 },
  { name: "Marketing Pro", overcharge: 1100 },
];

const errorTypeData = [
  { name: "Rate mismatch", value: 35, color: "#3B82F6" }, // primary
  { name: "GST errors", value: 25, color: "#8B5CF6" }, // accent-purple
  { name: "Duplicates", value: 20, color: "#06B6D4" }, // accent-cyan
  { name: "Calculation", value: 12, color: "#F472B6" }, // neon-pink
  { name: "Other", value: 8, color: "#4ADE80" }, // neon-green
];

const historicalData = [
  { month: "Jan", billed: 350000, validated: 345000, anomalyRate: 1.4 },
  { month: "Feb", billed: 420000, validated: 395000, anomalyRate: 6.3 }, // Anomaly
  { month: "Mar", billed: 380000, validated: 378000, anomalyRate: 0.5 },
  { month: "Apr", billed: 390000, validated: 385000, anomalyRate: 1.2 },
  { month: "May", billed: 510000, validated: 485000, anomalyRate: 5.1 }, // Anomaly
  { month: "Jun", billed: 410000, validated: 405000, anomalyRate: 1.2 },
];

const stats = [
  { label: "Invoices processed", value: "1,247" },
  { label: "Total billed", value: "₹42.3L" },
  { label: "Verified amount", value: "₹41.8L" },
  { label: "Overcharges identified", value: "₹48,200", highlight: true },
];

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-24 md:py-32 px-6 bg-dark-900 border-y border-white/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-100 mb-4"
          >
            Intelligence Output
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Live analytics monitoring processing throughput and identified fiscal leakages.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`glass-card p-6 border ${stat.highlight ? 'border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-gradient-to-b from-primary/10 to-transparent' : 'border-white/5'}`}
            >
              <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.highlight ? 'text-primary text-glow' : 'text-gray-100'}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 border border-white/5 lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse"></span>
              Anomaly Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {errorTypeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12142B', borderColor: '#3B82F6', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#E5E7EB' }}
                    formatter={(v: number) => [`${v}%`, "Share"]} 
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Advanced Volume Area Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 border border-white/5 lg:col-span-2 interactive"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Processing Volume Trends
              </h3>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 rounded bg-dark-800 border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-colors interactive">7D</button>
                <button className="text-xs px-3 py-1 rounded bg-primary/20 border border-primary text-primary transition-colors interactive">30D</button>
                <button className="text-xs px-3 py-1 rounded bg-dark-800 border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-colors interactive">YTD</button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData} margin={{ left: 0, right: 20, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip 
                    cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ backgroundColor: '#12142B', borderColor: '#3B82F6', borderRadius: '8px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="billed" stroke="#3B82F6" fillOpacity={1} fill="url(#colorBilled)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Composed Chart combining anomalies and baseline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 border border-white/5 md:col-span-2 lg:col-span-3 interactive"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-amber animate-pulse"></span>
                Anomaly Detection Confidence & Volume
              </h3>
              <select className="bg-dark-800 border border-white/10 text-sm text-gray-300 rounded px-3 py-1 outline-none focus:border-primary transition-colors interactive">
                <option>All Vendors</option>
                <option>Tech Supplies</option>
                <option>Logistics Inc</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                {/* @ts-ignore Recharts ComposedChart typings can be finicky */}
                <ComposedChart data={historicalData} margin={{ left: 10, right: 20, top: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12142B', borderColor: '#8B5CF6', borderRadius: '8px', color: '#fff' }}
                    formatter={(v: number, name: string) => {
                      if (name === "Flagged Anomalies") return [`${v}%`, name];
                      return [`₹${v.toLocaleString()}`, name];
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', color: '#E5E7EB' }}/>
                  <Bar yAxisId="left" dataKey="billed" name="Processed Volume" fill="#1E293B" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Line yAxisId="left" type="monotone" dataKey="validated" name="Baseline Model" stroke="#4ADE80" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  <Line yAxisId="right" type="monotone" dataKey="anomalyRate" name="Flagged Anomalies" stroke="#F472B6" strokeWidth={3} dot={{ r: 4, fill: '#12142B', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#F472B6' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
