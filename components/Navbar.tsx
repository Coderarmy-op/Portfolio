"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { profile } from "@/data/profile";

/**
 * ========================================
 * NAVIGATION BAR COMPONENT
 * ========================================
 * Features:
 * - Sticky header with blur effect on scroll
 * - Smooth scroll to sections
 * - Animated mobile hamburger menu
 * - Active section highlighting
 */

const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "3d", label: "3D" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Account for fixed navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                className={`
          fixed top-0 left-0 right-0 z-[100] transition-all duration-500
          ${isScrolled
                        ? "py-3 bg-dark-900/80 backdrop-blur-xl border-b border-white/5"
                        : "py-6 bg-transparent"
                    }
        `}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <nav className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.button
                        onClick={() => scrollToSection("home")}
                        className="relative z-10 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-xl font-display font-bold">
                            <span className="gradient-text">{profile.firstName || profile.name.split(" ")[0]}</span>
                            <span className="text-white/60">.dev</span>
                        </span>

                        {/* Hover glow */}
                        <motion.div
                            className="absolute -inset-2 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            layoutId="navLogoGlow"
                        />
                    </motion.button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="relative px-4 py-2 text-sm font-medium transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className={`
                  relative z-10 transition-colors duration-300
                  ${activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"}
                `}>
                                    {item.label}
                                </span>

                                {/* Active indicator */}
                                {activeSection === item.id && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        layoutId="activeNavItem"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA Button - Desktop */}
                    <motion.button
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-semibold group overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection("contact")}
                    >
                        <span className="relative z-10">Let&apos;s Talk</span>
                        <motion.span
                            className="relative z-10"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>

                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.span
                            className="w-6 h-0.5 bg-white rounded-full"
                            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white rounded-full"
                            animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white rounded-full"
                            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[90] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Items */}
                        <motion.nav
                            className="relative z-10 h-full flex flex-col items-center justify-center gap-6"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                                },
                            }}
                        >
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="group relative"
                                    variants={{
                                        open: {
                                            y: 0,
                                            opacity: 1,
                                            transition: { type: "spring", stiffness: 300, damping: 24 },
                                        },
                                        closed: {
                                            y: 50,
                                            opacity: 0,
                                        },
                                    }}
                                >
                                    <span className="text-3xl font-display font-bold text-white group-hover:gradient-text transition-all duration-300">
                                        {item.label}
                                    </span>

                                    {/* Number indicator */}
                                    <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-sm text-accent-primary/50 font-mono">
                                        0{index + 1}
                                    </span>

                                    {/* Underline on hover */}
                                    <motion.div
                                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                    />
                                </motion.button>
                            ))}

                            {/* Social links in mobile menu */}
                            <motion.div
                                className="flex gap-6 mt-8"
                                variants={{
                                    open: { y: 0, opacity: 1 },
                                    closed: { y: 20, opacity: 0 },
                                }}
                            >
                                {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </motion.div>
                        </motion.nav>

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-accent-primary/10 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute top-32 right-10 w-24 h-24 rounded-full bg-accent-secondary/10 blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
