"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories } from "@/data/skills";

/**
 * ========================================
 * SKILLS SECTION
 * ========================================
 * Features:
 * - Animated skill cards with hover effects
 * - Staggered grid reveal
 * - Visual proficiency indicators
 * - Category-based grouping
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
};

export default function Skills() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="skills" className="section relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

            {/* Decorative grid */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <span className="text-sm text-accent-cyan font-mono">02</span>
                        <span className="text-sm text-gray-400">Skills & Tools</span>
                    </motion.div>

                    <h2 className="section-title text-center mx-auto">
                        My Technical
                        <br />
                        <span className="text-white">Arsenal</span>
                    </h2>

                    <p className="section-subtitle text-center mx-auto mt-4">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                {/* Skills grid */}
                <motion.div
                    className="grid md:grid-cols-2 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.id}
                            className="group relative"
                            variants={cardVariants}
                        >
                            {/* Card */}
                            <motion.div
                                className="relative h-full p-6 lg:p-8 rounded-2xl bg-dark-800/50 border border-white/5 backdrop-blur-sm overflow-hidden"
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                {/* Gradient background on hover */}
                                <motion.div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.color}`}
                                    style={{ opacity: 0.05 }}
                                />

                                {/* Glow effect on hover */}
                                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <motion.div
                                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            {category.icon}
                                        </motion.div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">{category.description}</p>
                                        </div>
                                    </div>

                                    {/* Skills list */}
                                    <div className="space-y-4">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skill.name}
                                                className="group/skill"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                                transition={{
                                                    delay: categoryIndex * 0.1 + skillIndex * 0.08,
                                                    duration: 0.4,
                                                }}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{skill.icon}</span>
                                                        <span className="text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors">
                                                            {skill.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-gray-500 font-mono">
                                                        {skill.proficiency}%
                                                    </span>
                                                </div>

                                                {/* Progress bar */}
                                                <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                                                        initial={{ width: 0 }}
                                                        animate={inView ? { width: `${skill.proficiency}%` } : {}}
                                                        transition={{
                                                            delay: categoryIndex * 0.1 + skillIndex * 0.08 + 0.3,
                                                            duration: 0.8,
                                                            ease: "easeOut",
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Corner decoration */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-5 blur-2xl`} />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
