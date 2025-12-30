"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

/**
 * ========================================
 * PAGE LOADER / INTRO ANIMATION
 * ========================================
 * A stunning intro animation that plays on page load:
 * - Animated logo/name reveal
 * - Gradient morphing background
 * - Smooth exit transition
 */

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Simulate minimum load time for the animation
        const minLoadTime = setTimeout(() => {
            setIsExiting(true);
        }, 2000);

        const exitTime = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        return () => {
            clearTimeout(minLoadTime);
            clearTimeout(exitTime);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Animated gradient background */}
                    <motion.div
                        className="absolute inset-0 bg-dark-900"
                        animate={isExiting ? { scale: 1.5, opacity: 0 } : { scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Morphing blobs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute w-[600px] h-[600px] -top-48 -left-48 rounded-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                                x: isExiting ? -200 : 0,
                                opacity: isExiting ? 0 : 1,
                            }}
                            transition={{
                                duration: isExiting ? 0.5 : 8,
                                repeat: isExiting ? 0 : Infinity,
                                ease: isExiting ? "easeOut" : "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute w-[500px] h-[500px] -bottom-32 -right-32 rounded-full bg-gradient-to-br from-accent-pink/20 to-accent-cyan/20 blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                rotate: [0, -90, 0],
                                x: isExiting ? 200 : 0,
                                opacity: isExiting ? 0 : 1,
                            }}
                            transition={{
                                duration: isExiting ? 0.5 : 8,
                                repeat: isExiting ? 0 : Infinity,
                                ease: isExiting ? "easeOut" : "easeInOut",
                            }}
                        />
                    </div>

                    {/* Logo / Name animation */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Animated circles */}
                        <motion.div
                            className="relative w-32 h-32 mb-8"
                            animate={isExiting ? { scale: 2, opacity: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {/* Outer ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-accent-primary/50"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Middle ring with dashes */}
                            <motion.div
                                className="absolute inset-2 rounded-full border-2 border-dashed border-accent-secondary/50"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Inner pulsing circle */}
                            <motion.div
                                className="absolute inset-4 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.8, 1, 0.8],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Center dot */}
                            <motion.div
                                className="absolute inset-[38%] rounded-full bg-white"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Name with staggered letter animation */}
                        <motion.div
                            className="overflow-hidden"
                            animate={isExiting ? { y: -50, opacity: 0 } : {}}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <motion.div
                                className="flex items-center gap-1 text-2xl md:text-3xl font-display font-bold"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                        },
                                    },
                                }}
                            >
                                {profile.name.split("").map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        className={letter === " " ? "w-2" : "gradient-text"}
                                        variants={{
                                            hidden: { y: 50, opacity: 0 },
                                            visible: {
                                                y: 0,
                                                opacity: 1,
                                                transition: {
                                                    type: "spring",
                                                    damping: 12,
                                                    stiffness: 200,
                                                },
                                            },
                                        }}
                                    >
                                        {letter === " " ? "\u00A0" : letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Loading text */}
                        <motion.p
                            className="mt-4 text-sm text-gray-400 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={isExiting ? { opacity: 0, y: 20 } : { opacity: 1 }}
                            transition={{ delay: isExiting ? 0 : 0.5, duration: 0.3 }}
                        >
                            <motion.span
                                className="inline-block w-1.5 h-1.5 rounded-full bg-accent-primary"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                            Loading experience
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                ...
                            </motion.span>
                        </motion.p>
                    </div>

                    {/* Bottom progress bar */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-dark-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            style={{ transformOrigin: "left" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
