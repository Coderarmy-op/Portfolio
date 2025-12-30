/**
 * ========================================
 * PROFILE CONFIGURATION
 * ========================================
 * Edit this file to customize your personal information.
 * All text content for the Hero and About sections comes from here.
 */

export const profile = {
    // === BASIC INFO ===
    name: "[YOUR NAME]",
    firstName: "[FIRST NAME]",
    lastName: "[LAST NAME]",

    // === TITLES & ROLES ===
    // Main title shown in the hero section
    title: "Creative Developer & Digital Artist",
    // Subtitle for additional context
    subtitle: "Crafting Immersive Digital Experiences",

    // === HERO SECTION ===
    heroTagline: "I transform ideas into extraordinary digital experiences through the fusion of cutting-edge technology and creative vision.",

    // === ABOUT SECTION ===
    bio: [
        "I'm a passionate developer who thrives at the intersection of design and technology. With over 5 years of experience building web applications, I specialize in creating immersive, interactive experiences that push the boundaries of what's possible on the web.",
        "My journey began with a fascination for how beautiful interfaces could make technology feel magical. Today, I combine my expertise in front-end development with creative coding to build experiences that captivate and inspire.",
        "When I'm not coding, you'll find me exploring new design trends, experimenting with 3D graphics, or contributing to open-source projects that make the web a more beautiful place."
    ],

    // === HIGHLIGHT BADGES ===
    // Shown as chips/badges in the About section
    highlights: [
        { icon: "📍", text: "Based in [CITY, COUNTRY]" },
        { icon: "🌍", text: "Open to Remote Work" },
        { icon: "⚡", text: "Specialized in React & 3D" },
        { icon: "🎨", text: "Motion Design Enthusiast" },
    ],

    // === CONTACT INFO ===
    email: "hello@yourname.com",

    // === AVATAR/PROFILE IMAGE ===
    // Place your image in /public/images/ and update the path
    avatarUrl: "/images/avatar-placeholder.jpg",

    // === RESUME/CV ===
    // Place your CV in /public/ and update the path
    resumeUrl: "/resume.pdf",

    // === SEO & META ===
    siteTitle: "[YOUR NAME] | Creative Developer Portfolio",
    siteDescription: "Portfolio of [YOUR NAME], a creative developer specializing in immersive web experiences, 3D graphics, and modern front-end development.",
    siteUrl: "https://yourname.com",
    ogImage: "/images/og-image.jpg",
};

export type Profile = typeof profile;
