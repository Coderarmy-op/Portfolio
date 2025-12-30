"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { profile } from "@/data/profile";

/**
 * ========================================
 * HERO SECTION
 * ========================================
 * Full-viewport hero with:
 * - Staggered text animations
 * - Interactive 3D background
 * - Animated CTA buttons
 */

// Dynamically import 3D scene to prevent SSR issues
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
        },
    },
};

export default function Hero() {
    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* 3D Background */}
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 pt-20">
                <motion.div
                    className="max-w-3xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Greeting label */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
                        variants={itemVariants}
                    >
                        <motion.span
                            className="w-2 h-2 rounded-full bg-green-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-gray-300">Available for new projects</span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
                        variants={itemVariants}
                    >
                        <span className="block text-white">Hi, I&apos;m</span>
                        <span className="block gradient-text">{profile.name}</span>
                    </motion.h1>

                    {/* Title/Role */}
                    <motion.h2
                        className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/80 mb-4"
                        variants={itemVariants}
                    >
                        {profile.title}
                    </motion.h2>

                    {/* Tagline */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-400 max-w-xl mb-8 leading-relaxed"
                        variants={itemVariants}
                    >
                        {profile.heroTagline}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-4"
                        variants={itemVariants}
                    >
                        {/* Primary CTA */}
                        <motion.button
                            onClick={scrollToProjects}
                            className="group relative px-8 py-4 overflow-hidden rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink"
                            variants={buttonVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Button content */}
                            <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                                View Projects
                                <motion.svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </span>

                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                            />
                        </motion.button>

                        {/* Secondary CTA */}
                        <motion.a
                            href={profile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-8 py-4 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors"
                            variants={buttonVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="flex items-center gap-2 text-white font-semibold">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download CV
                            </span>

                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 blur-xl -z-10" />
                        </motion.a>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-2 text-gray-400"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-sm">Scroll to explore</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
