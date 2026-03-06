"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor({ isDesktop }: { isDesktop: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Smooth out the movement for the outer ring
  const springConfigRing = { damping: 25, stiffness: 150, mass: 0.6 };
  const ringX = useSpring(position.x, springConfigRing);
  const ringY = useSpring(position.y, springConfigRing);

  // Very tight movement for the dot
  const springConfigDot = { damping: 50, stiffness: 400, mass: 0.1 };
  const dotX = useSpring(position.x, springConfigDot);
  const dotY = useSpring(position.y, springConfigDot);

  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Detect if hovering over interactable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive") ||
        target.closest("input") ||
        target.closest("select")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isDesktop, isHidden]);

  if (!isDesktop || isHidden) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent-cyan rounded-full pointer-events-none z-[100] shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border rounded-full pointer-events-none z-[99]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(6,182,212,0.8)" : "rgba(6,182,212,0.4)",
          backgroundColor: isHovering ? "rgba(6,182,212,0.15)" : "transparent"
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.15 }}
      >
      </motion.div>
    </>
  );
}
