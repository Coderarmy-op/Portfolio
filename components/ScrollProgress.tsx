"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ========================================
 * SCROLL PROGRESS INDICATOR
 * ========================================
 * Displays a gradient progress bar at the top of the page
 * showing how far down the user has scrolled.
 */

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Smooth the progress value
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            {/* Background track */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-dark-800/50 z-50" />

            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
                style={{ scaleX }}
            >
                {/* Main gradient bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink" />

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink blur-sm opacity-70" />

                {/* Moving shimmer */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                        x: ["-100%", "100%"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </motion.div>
        </>
    );
}
