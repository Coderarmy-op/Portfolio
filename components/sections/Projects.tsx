"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects, projectTags, type ProjectTag } from "@/data/projects";

/**
 * ========================================
 * PROJECTS SECTION
 * ========================================
 * Features:
 * - Filter tabs (All, Web, 3D, Open Source)
 * - Project cards with parallax hover
 * - Featured project with larger display
 * - Staggered grid animations
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 },
    },
};

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<"all" | ProjectTag>("all");
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter((project) => project.tags.includes(activeFilter));

    const featuredProjects = filteredProjects.filter((p) => p.featured);
    const regularProjects = filteredProjects.filter((p) => !p.featured);

    return (
        <section id="projects" className="section relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-800" />

            {/* Decorative elements */}
            <motion.div
                className="absolute top-40 right-20 w-80 h-80 bg-accent-primary/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <span className="text-sm text-accent-pink font-mono">04</span>
                        <span className="text-sm text-gray-400">Selected Work</span>
                    </motion.div>

                    <h2 className="section-title text-center mx-auto">
                        Featured
                        <br />
                        <span className="text-white">Projects</span>
                    </h2>

                    <p className="section-subtitle text-center mx-auto mt-4">
                        A showcase of my best work across different domains
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === "all"
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {activeFilter === "all" && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                                layoutId="activeFilter"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">All Projects</span>
                    </button>

                    {projectTags.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => setActiveFilter(tag.id)}
                            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === tag.id
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {activeFilter === tag.id && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                                    layoutId="activeFilter"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{tag.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Featured projects */}
                {featuredProjects.length > 0 && (
                    <motion.div
                        className="grid lg:grid-cols-2 gap-6 mb-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <AnimatePresence mode="popLayout">
                            {featuredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    className="group relative"
                                    variants={cardVariants}
                                    layout
                                >
                                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-dark-800 border border-white/5">
                                        {/* Background gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />

                                        {/* Placeholder thumbnail */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-4xl`}>
                                                {project.tags.includes("3d") ? "🎮" : "🚀"}
                                            </div>
                                        </div>

                                        {/* Overlay on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                                        />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 rounded-full bg-white/10 text-white text-xs backdrop-blur-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs font-semibold">
                                                    Featured
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                                                {project.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-300 mb-6 line-clamp-2">
                                                {project.shortDescription}
                                            </p>

                                            {/* Tech stack */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.technologies.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 rounded bg-dark-700/80 text-gray-300 text-xs"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <span className="px-2 py-1 rounded bg-dark-700/80 text-gray-400 text-xs">
                                                        +{project.technologies.length - 4} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex gap-4">
                                                {project.liveUrl && (
                                                    <motion.a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold text-sm flex items-center gap-2"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Live Demo
                                                        <span>↗</span>
                                                    </motion.a>
                                                )}
                                                {project.repoUrl && (
                                                    <motion.a
                                                        href={project.repoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm flex items-center gap-2 hover:border-white/40 transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Source Code
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Year badge */}
                                        <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm text-xs text-gray-400">
                                            {project.year}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Regular projects grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <AnimatePresence mode="popLayout">
                        {regularProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                className="group relative"
                                variants={cardVariants}
                                layout
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative h-[350px] rounded-2xl overflow-hidden bg-dark-800 border border-white/5 hover:border-white/20 transition-colors">
                                    {/* Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`} />

                                    {/* Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl`}>
                                            {project.tags.includes("3d") ? "🎮" : project.tags.includes("open-source") ? "📦" : "🚀"}
                                        </div>
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {project.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {project.shortDescription}
                                        </p>

                                        {/* Links */}
                                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-accent-primary hover:text-accent-secondary transition-colors flex items-center gap-1"
                                                >
                                                    Demo ↗
                                                </a>
                                            )}
                                            {project.repoUrl && (
                                                <a
                                                    href={project.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                                                >
                                                    Code ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Year */}
                                    <div className="absolute top-4 right-4 text-xs text-gray-500">
                                        {project.year}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
