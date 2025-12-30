"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * ========================================
 * CUSTOM CURSOR COMPONENT
 * ========================================
 * A sophisticated custom cursor with:
 * - Smooth spring animation following pointer
 * - Scale and color changes on hover over interactive elements
 * - Dot + ring design with blend mode effects
 * - Desktop only (hidden on touch devices)
 */

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [cursorText, setCursorText] = useState("");

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Smooth spring animation for cursor movement
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Slower spring for the outer ring
    const ringSpringConfig = { damping: 35, stiffness: 200, mass: 1 };
    const ringXSpring = useSpring(cursorX, ringSpringConfig);
    const ringYSpring = useSpring(cursorY, ringSpringConfig);

    useEffect(() => {
        // Only show custom cursor on devices with fine pointer
        const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!hasFinePointer) {
            setIsHidden(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        // Check for interactive elements
        const handleElementCheck = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if hovering over interactive element
            const isInteractive = target.closest("a, button, [role='button'], input, textarea, [data-cursor='pointer']");
            const isHoverTarget = target.closest("[data-cursor='hover']");
            const customText = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

            setIsPointer(!!isInteractive);
            setIsHovering(!!isHoverTarget || !!isInteractive);
            setCursorText(customText || "");
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousemove", handleElementCheck);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousemove", handleElementCheck);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    if (isHidden) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: isHovering ? 0.5 : 1,
                        opacity: isHovering ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-3 h-3 bg-white rounded-full" />
                </motion.div>
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: ringXSpring,
                    y: ringYSpring,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    animate={{
                        scale: isHovering ? 2.5 : 1,
                        opacity: isHidden ? 0 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                >
                    <div
                        className={`
              w-10 h-10 rounded-full border-2 transition-colors duration-300
              ${isPointer
                                ? "border-accent-primary bg-accent-primary/10"
                                : "border-white/30 bg-transparent"
                            }
            `}
                    />

                    {/* Cursor text */}
                    {cursorText && (
                        <motion.span
                            className="absolute text-xs font-medium text-white whitespace-nowrap"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>

            {/* Glow effect when hovering */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                    x: ringXSpring,
                    y: ringYSpring,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: isHovering ? 1 : 0,
                        opacity: isHovering ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-32 h-32 rounded-full bg-accent-primary blur-2xl" />
                </motion.div>
            </motion.div>
        </>
    );
}
