"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

/**
 * ========================================
 * 3D SHOWCASE SECTION
 * ========================================
 * Dedicated section to showcase 3D and creative skills:
 * - Full interactive 3D scene
 * - Orbit controls for exploration
 * - Minimal UI overlay
 */

// Dynamically import 3D scene
const ShowcaseScene = dynamic(() => import("@/components/3d/ShowcaseScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-400 text-sm">Loading 3D Experience...</span>
            </div>
        </div>
    ),
});

export default function ThreeDSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="3d" className="section relative overflow-hidden min-h-screen" ref={ref}>
            {/* 3D Scene */}
            <Suspense fallback={null}>
                <ShowcaseScene />
            </Suspense>

            {/* Overlay content */}
            <div className="relative z-10 container mx-auto px-6 py-20 pointer-events-none">
                <motion.div
                    className="max-w-xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {/* Section label */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/80 backdrop-blur-sm border border-white/10 mb-6 pointer-events-auto"
                    >
                        <span className="text-sm text-accent-cyan font-mono">05</span>
                        <span className="text-sm text-gray-400">Interactive Experience</span>
                    </motion.div>

                    <h2 className="section-title">
                        3D & Creative
                        <br />
                        <span className="text-white">Showcase</span>
                    </h2>

                    <p className="text-gray-400 text-lg mb-6">
                        Explore this interactive 3D scene. Drag to rotate, hover over elements for interactions.
                        This demonstrates my capabilities in WebGL, Three.js, and creative coding.
                    </p>

                    {/* Interaction hints */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/80 backdrop-blur-sm border border-white/10">
                            <span className="text-accent-cyan">🖱️</span>
                            <span className="text-sm text-gray-300">Drag to rotate</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/80 backdrop-blur-sm border border-white/10">
                            <span className="text-accent-pink">👆</span>
                            <span className="text-sm text-gray-300">Click objects to interact</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient for transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />

            {/* Floating decorative elements */}
            <motion.div
                className="absolute bottom-20 right-20 px-4 py-2 rounded-full bg-dark-900/60 backdrop-blur-sm border border-accent-cyan/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <span className="text-sm text-accent-cyan font-mono">React Three Fiber</span>
            </motion.div>

            <motion.div
                className="absolute top-1/3 right-10 px-4 py-2 rounded-full bg-dark-900/60 backdrop-blur-sm border border-accent-secondary/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <span className="text-sm text-accent-secondary font-mono">Three.js</span>
            </motion.div>

            <motion.div
                className="absolute top-1/2 left-10 px-4 py-2 rounded-full bg-dark-900/60 backdrop-blur-sm border border-accent-pink/30"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
            >
                <span className="text-sm text-accent-pink font-mono">WebGL</span>
            </motion.div>
        </section>
    );
}
