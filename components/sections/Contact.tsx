"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

/**
 * ========================================
 * CONTACT SECTION
 * ========================================
 * Features:
 * - Contact form with validation
 * - Social links with hover effects
 * - Animated background
 * - Form submission stub
 */

// Social icon SVGs
const socialIcons: Record<string, JSX.Element> = {
    github: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    ),
    twitter: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    dribbble: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.672 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.298-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z" />
        </svg>
    ),
    codepen: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.144 13.067v-2.134l-1.602 1.067 1.602 1.067zm-3.143 2.224l-2.784 1.858v3.647l5.423-3.618-2.639-1.887zm1.541-1.009l2.282-1.533-2.282-1.533-2.282 1.533 2.282 1.533zm-3.143-4.582l2.639-1.887-5.423-3.618v3.647l2.784 1.858zm-3.856 0l2.784-1.858v-3.647l-5.423 3.618 2.639 1.887zm1.534 1.009l-2.282 1.533 2.282 1.533 2.282-1.533-2.282-1.533zm-7.077 0v2.134l1.602-1.067-1.602-1.067zm6.143 5.815l-2.784-1.858-2.639 1.887 5.423 3.618v-3.647zm-6.143-8.039l2.282 1.533 2.282-1.533-2.282-1.533-2.282 1.533z" />
        </svg>
    ),
    email: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
};

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // TODO: Hook this up to your email service (e.g., EmailJS, Resend, etc.)
        // For now, simulating a submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section id="contact" className="section relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-dark-900" />

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{ duration: 12, repeat: Infinity }}
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
                        <span className="text-sm text-accent-primary font-mono">06</span>
                        <span className="text-sm text-gray-400">Get In Touch</span>
                    </motion.div>

                    <h2 className="section-title text-center mx-auto">
                        Let&apos;s Work
                        <br />
                        <span className="text-white">Together</span>
                    </h2>

                    <p className="section-subtitle text-center mx-auto mt-4">
                        Have a project in mind? I&apos;d love to hear about it.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
                    {/* Contact info side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Let&apos;s make something amazing
                        </h3>

                        <p className="text-gray-400 mb-8 leading-relaxed">
                            I&apos;m always excited to work on new projects and collaborate with
                            creative people. Whether you have a specific project in mind or just
                            want to chat about possibilities, feel free to reach out.
                        </p>

                        {/* Email */}
                        <div className="mb-8">
                            <p className="text-sm text-gray-500 mb-2">Email me at</p>
                            <a
                                href={`mailto:${profile.email}`}
                                className="text-xl font-semibold gradient-text hover:opacity-80 transition-opacity"
                            >
                                {profile.email}
                            </a>
                        </div>

                        {/* Social links */}
                        <div>
                            <p className="text-sm text-gray-500 mb-4">Or find me on</p>
                            <div className="flex flex-wrap gap-4">
                                {socials.map((social) => (
                                    <motion.a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${social.hoverColor} hover:border-white/20`}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {socialIcons[social.icon] || (
                                            <span className="text-xl">{social.name[0]}</span>
                                        )}

                                        {/* Glow effect */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />

                                        {/* Tooltip */}
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-dark-700 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {social.name}
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl bg-dark-800/50 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 ${errors.name
                                            ? "border-red-500"
                                            : "border-white/10 hover:border-white/20 focus:border-accent-primary"
                                        }`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <motion.p
                                        className="text-red-400 text-sm mt-1"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </div>

                            {/* Email field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl bg-dark-800/50 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 ${errors.email
                                            ? "border-red-500"
                                            : "border-white/10 hover:border-white/20 focus:border-accent-primary"
                                        }`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <motion.p
                                        className="text-red-400 text-sm mt-1"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            {/* Message field */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`w-full px-4 py-3 rounded-xl bg-dark-800/50 border transition-all duration-300 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-none ${errors.message
                                            ? "border-red-500"
                                            : "border-white/10 hover:border-white/20 focus:border-accent-primary"
                                        }`}
                                    placeholder="Tell me about your project..."
                                />
                                {errors.message && (
                                    <motion.p
                                        className="text-red-400 text-sm mt-1"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.message}
                                    </motion.p>
                                )}
                            </div>

                            {/* Submit button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative px-8 py-4 rounded-xl bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink text-white font-semibold overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : isSubmitted ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </span>

                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                    animate={!isSubmitting ? { x: ["100%", "-100%"] } : {}}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <motion.footer
                className="relative z-10 mt-20 pt-10 border-t border-white/5"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
            >
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} {profile.name}. Crafted with{" "}
                        <span className="text-accent-pink">❤</span> and lots of{" "}
                        <span className="text-accent-cyan">☕</span>
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        Built with Next.js, Tailwind CSS, Framer Motion & Three.js
                    </p>
                </div>
            </motion.footer>
        </section>
    );
}
