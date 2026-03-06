"use client";

import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group";
    
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-primary/50",
    secondary: "bg-dark-700 text-gray-200 hover:bg-dark-800 border border-white/10 hover:border-white/20",
    outline: "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary backdrop-blur-sm",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5",
    glow: "bg-gradient-to-r from-primary to-accent-purple text-white border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base tracking-wide",
    lg: "px-8 py-4 text-lg tracking-wide",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Note: we're casting to any here to ignore a known Framer Motion type issue with HTML attributes
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {/* Subtle shine effect on hover for primary/glow variants */}
      {(variant === 'primary' || variant === 'glow') && (
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-lg blur-sm" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
