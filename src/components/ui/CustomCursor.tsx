"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor({ isDesktop }: { isDesktop: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Raw mouse position (inner dot snaps instantly)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring follows with a smooth spring delay — matching the image's lag effect
  const springCfg = { damping: 18, stiffness: 120, mass: 0.8 };
  const ringX = useSpring(mouseX, springCfg);
  const ringY = useSpring(mouseY, springCfg);

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive =
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.tagName === "INPUT" ||
        t.tagName === "SELECT" ||
        t.tagName === "TEXTAREA" ||
        t.closest("a") !== null ||
        t.closest("button") !== null ||
        t.closest(".interactive") !== null ||
        t.closest("input") !== null ||
        t.closest("select") !== null;
      setIsHovering(interactive);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDesktop, isVisible, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* ── Inner Dot ── snaps to cursor precisely, like the bright teal dot in reference */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : isHovering ? 1.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Glowing core dot */}
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#00E5D1",
            boxShadow:
              "0 0 6px 2px rgba(0,229,209,0.9), 0 0 16px 4px rgba(0,229,209,0.5)",
          }}
        />
      </motion.div>

      {/* ── Outer Ring ── follows with spring delay — the large circle in reference */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : isHovering ? 1.6 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: isHovering
              ? "1.5px solid rgba(0,229,209,0.85)"
              : "1.5px solid rgba(0,229,209,0.45)",
            background: isHovering ? "rgba(0,229,209,0.06)" : "transparent",
            boxShadow: isHovering
              ? "0 0 14px 2px rgba(0,229,209,0.2), inset 0 0 8px rgba(0,229,209,0.1)"
              : "0 0 8px 1px rgba(0,229,209,0.1)",
            transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          }}
        />
      </motion.div>
    </>
  );
}
