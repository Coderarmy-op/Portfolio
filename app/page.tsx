"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import ThreeDSection from "@/components/sections/ThreeDSection";
import Contact from "@/components/sections/Contact";

/**
 * ========================================
 * MAIN PAGE
 * ========================================
 * This is the main page composing all sections.
 * 
 * Section order:
 * 1. Hero - Full viewport intro with 3D
 * 2. About - Personal info and highlights
 * 3. Skills - Technical skills grid
 * 4. Experience - Career timeline
 * 5. Projects - Portfolio work
 * 6. 3D Section - Interactive 3D showcase
 * 7. Contact - Contact form and socials
 * 
 * To reorder sections, simply change the order below.
 * To remove a section, delete or comment out the component.
 */

// Dynamically import heavy components
const PageLoader = dynamic(() => import("@/components/PageLoader"), {
    ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
    ssr: false,
});

export default function Home() {
    return (
        <>
            {/* Page loader animation */}
            <PageLoader />

            {/* Custom cursor (desktop only) */}
            <CustomCursor />

            {/* Scroll progress indicator */}
            <ScrollProgress />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <ThreeDSection />
                <Contact />
            </main>
        </>
    );
}
