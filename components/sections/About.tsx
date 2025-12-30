"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { profile } from "@/data/profile";

/**
 * ========================================
 * ABOUT SECTION
 * ========================================
 * Features:
 * - Profile image with animated border
 * - Staggered text animations
 * - Highlight chips/badges
 * - Animated background blobs
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.3,
        },
    },
};

export default function About() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="about" className="section relative overflow-hidden" ref={ref}>
            {/* Background elements */}
            <div className="absolute inset-0 mesh-bg opacity-50" />

            {/* Animated blobs */}
            <motion.div
                className="absolute top-20 right-10 w-72 h-72 bg-accent-primary/10 rounded-full blur-3xl"
                animate={inView ? {
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl"
                animate={inView ? {
                    scale: [1.2, 1, 1.2],
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {/* Image side */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        variants={imageVariants}
                    >
                        <div className="relative max-w-md mx-auto">
                            {/* Animated border ring */}
                            <motion.div
                                className="absolute -inset-4 rounded-3xl"
                                style={{
                                    background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #22d3ee, #6366f1)",
                                    backgroundSize: "200% 100%",
                                }}
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Inner mask */}
                            <div className="absolute -inset-2 bg-dark-900 rounded-2xl" />

                            {/* Image container */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-dark-700">
                                {/* Replace with actual image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30" />

                                {/* Placeholder avatar design */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                                        <span className="text-5xl font-display font-bold text-white">
                                            {profile.name.charAt(0)}
                                        </span>
                                    </div>
                                </div>

                                {/* Decorative grid overlay */}
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                        backgroundSize: "40px 40px",
                                    }}
                                />
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                className="absolute -right-4 -bottom-4 px-4 py-2 rounded-full bg-dark-800/90 backdrop-blur-sm border border-white/10"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-sm font-medium gradient-text">✨ Open to work</span>
                            </motion.div>

                            {/* Experience badge */}
                            <motion.div
                                className="absolute -left-4 top-10 px-4 py-2 rounded-full bg-dark-800/90 backdrop-blur-sm border border-white/10"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <span className="text-sm font-medium text-white">5+ Years Exp.</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content side */}
                    <div className="order-1 lg:order-2">
                        {/* Section label */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                            variants={itemVariants}
                        >
                            <span className="text-sm text-accent-primary font-mono">01</span>
                            <span className="text-sm text-gray-400">About Me</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="section-title"
                            variants={itemVariants}
                        >
                            Turning Vision Into
                            <br />
                            <span className="text-white">Digital Reality</span>
                        </motion.h2>

                        {/* Bio paragraphs */}
                        <div className="space-y-4 mb-8">
                            {profile.bio.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    className="text-gray-400 leading-relaxed"
                                    variants={itemVariants}
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>

                        {/* Highlight badges */}
                        <motion.div
                            className="flex flex-wrap gap-3"
                            variants={itemVariants}
                        >
                            {profile.highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-accent-primary/50 hover:bg-white/10 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <span className="text-lg">{highlight.icon}</span>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                        {highlight.text}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
