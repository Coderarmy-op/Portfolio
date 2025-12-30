"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/experience";

/**
 * ========================================
 * EXPERIENCE / TIMELINE SECTION
 * ========================================
 * Features:
 * - Vertical timeline with animated line
 * - Alternating card positions on desktop
 * - Stacked layout on mobile
 * - Staggered entrance animations
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: (isEven: boolean) => ({
        opacity: 0,
        x: isEven ? 50 : -50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function Experience() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const formatDate = (dateStr: string) => {
        if (dateStr === "Present") return dateStr;
        const [year, month] = dateStr.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <section id="experience" className="section relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-dark-900" />

            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity }}
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
                        <span className="text-sm text-accent-secondary font-mono">03</span>
                        <span className="text-sm text-gray-400">Career Journey</span>
                    </motion.div>

                    <h2 className="section-title text-center mx-auto">
                        Experience &
                        <br />
                        <span className="text-white">Achievements</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 lg:-translate-x-1/2">
                        {/* Background line */}
                        <div className="absolute inset-0 bg-dark-700" />

                        {/* Animated gradient line */}
                        <motion.div
                            className="absolute inset-x-0 top-0 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-pink"
                            initial={{ height: 0 }}
                            animate={inView ? { height: "100%" } : {}}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </div>

                    {/* Timeline items */}
                    <motion.div
                        className="relative"
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    className={`relative flex items-center mb-12 lg:mb-16 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                                        }`}
                                    custom={isEven}
                                    variants={itemVariants}
                                >
                                    {/* Timeline node */}
                                    <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 z-10">
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-dark-900 border-4 border-accent-primary flex items-center justify-center"
                                            whileHover={{ scale: 1.2 }}
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0 0 rgba(139, 92, 246, 0.4)",
                                                    "0 0 0 10px rgba(139, 92, 246, 0)",
                                                ],
                                            }}
                                            transition={{
                                                boxShadow: {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                },
                                            }}
                                        >
                                            <span className="text-sm">{exp.icon}</span>
                                        </motion.div>
                                    </div>

                                    {/* Content card */}
                                    <div
                                        className={`ml-16 lg:ml-0 lg:w-[calc(50%-40px)] ${isEven ? "lg:pr-8" : "lg:pl-8"
                                            }`}
                                    >
                                        <motion.div
                                            className="group relative p-6 rounded-2xl bg-dark-800/50 border border-white/5 backdrop-blur-sm"
                                            whileHover={{
                                                scale: 1.02,
                                                borderColor: "rgba(139, 92, 246, 0.3)",
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* Glow on hover */}
                                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

                                            {/* Card content */}
                                            <div className="relative z-10">
                                                {/* Date badge */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-mono">
                                                        {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                                                    </span>
                                                    <span className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs">
                                                        {exp.type}
                                                    </span>
                                                </div>

                                                {/* Title & Company */}
                                                <h3 className="text-xl font-bold text-white mb-1 group-hover:gradient-text transition-all duration-300">
                                                    {exp.role}
                                                </h3>
                                                <a
                                                    href={exp.companyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-gray-400 hover:text-accent-primary transition-colors mb-3"
                                                >
                                                    {exp.company}
                                                    <span className="text-xs">↗</span>
                                                </a>
                                                <p className="text-sm text-gray-500 mb-3">📍 {exp.location}</p>

                                                {/* Description */}
                                                <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                                                {/* Achievements */}
                                                <ul className="space-y-2 mb-4">
                                                    {exp.achievements.slice(0, 3).map((achievement, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0" />
                                                            {achievement}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Technologies */}
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.technologies.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs hover:bg-white/10 hover:text-white transition-colors"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
