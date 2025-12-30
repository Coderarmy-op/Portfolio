/**
 * ========================================
 * SMOOTH SCROLL HOOK
 * ========================================
 * Custom hook for smooth scrolling with Lenis
 * (Optional - uncomment to enable Lenis smooth scroll)
 */

"use client";

import { useEffect, useRef } from "react";

export function useSmoothScroll() {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Uncomment below to enable Lenis smooth scrolling
        // Note: Lenis is already included in package.json

        /*
        import('lenis').then(({ default: Lenis }) => {
          lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
          });
    
          function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
          }
    
          requestAnimationFrame(raf);
        });
    
        return () => {
          lenisRef.current?.destroy();
        };
        */
    }, []);

    return lenisRef;
}

/**
 * Scroll to element by ID with offset
 */
export function scrollToSection(sectionId: string, offset: number = 80) {
    const element = document.getElementById(sectionId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
}
