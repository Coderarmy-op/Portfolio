/**
 * ========================================
 * PROJECTS CONFIGURATION
 * ========================================
 * Edit this file to update your portfolio projects.
 * Projects are displayed in the Projects section with filtering.
 */

export type ProjectTag = "web" | "3d" | "open-source" | "mobile" | "design";

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    longDescription?: string;
    thumbnail: string; // Path to image in /public/images/projects/
    tags: ProjectTag[];
    technologies: string[];
    liveUrl?: string;
    repoUrl?: string;
    featured: boolean; // Featured projects get larger cards
    year: number;
    color?: string; // Accent color for the card
}

export const projects: Project[] = [
    {
        id: "project-1",
        title: "Immersive 3D Product Configurator",
        shortDescription: "A WebGL-powered product customization experience with real-time 3D rendering and photorealistic materials.",
        longDescription: "Built a fully interactive 3D product configurator that allows users to customize every aspect of a product in real-time. Features include dynamic material switching, environment lighting, and AR preview capabilities.",
        thumbnail: "/images/projects/project-1.jpg",
        tags: ["web", "3d"],
        technologies: ["React", "Three.js", "React Three Fiber", "Zustand", "GSAP"],
        liveUrl: "https://project1.example.com",
        repoUrl: "https://github.com/username/project1",
        featured: true,
        year: 2024,
        color: "from-violet-600 to-indigo-600",
    },
    {
        id: "project-2",
        title: "AI-Powered Design System",
        shortDescription: "A comprehensive design system with AI-assisted component generation and automatic accessibility checking.",
        thumbnail: "/images/projects/project-2.jpg",
        tags: ["web", "open-source"],
        technologies: ["TypeScript", "React", "Tailwind CSS", "OpenAI API", "Storybook"],
        liveUrl: "https://project2.example.com",
        repoUrl: "https://github.com/username/project2",
        featured: true,
        year: 2024,
        color: "from-cyan-600 to-blue-600",
    },
    {
        id: "project-3",
        title: "Interactive Data Visualization Platform",
        shortDescription: "Real-time data visualization dashboard with stunning animated charts and 3D globe representations.",
        thumbnail: "/images/projects/project-3.jpg",
        tags: ["web", "3d"],
        technologies: ["Next.js", "D3.js", "Three.js", "WebSocket", "PostgreSQL"],
        liveUrl: "https://project3.example.com",
        featured: false,
        year: 2023,
        color: "from-emerald-600 to-teal-600",
    },
    {
        id: "project-4",
        title: "Creative Portfolio Generator",
        shortDescription: "An open-source tool that generates stunning portfolio websites from simple configuration files.",
        thumbnail: "/images/projects/project-4.jpg",
        tags: ["web", "open-source"],
        technologies: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "Vercel"],
        liveUrl: "https://project4.example.com",
        repoUrl: "https://github.com/username/project4",
        featured: false,
        year: 2023,
        color: "from-pink-600 to-rose-600",
    },
    {
        id: "project-5",
        title: "WebXR Art Gallery",
        shortDescription: "A virtual reality art gallery experience accessible through any WebXR-compatible browser.",
        thumbnail: "/images/projects/project-5.jpg",
        tags: ["3d", "web"],
        technologies: ["Three.js", "WebXR", "Blender", "React Three Fiber", "Drei"],
        liveUrl: "https://project5.example.com",
        repoUrl: "https://github.com/username/project5",
        featured: false,
        year: 2023,
        color: "from-amber-600 to-orange-600",
    },
    {
        id: "project-6",
        title: "Motion Design Showcase",
        shortDescription: "A collection of micro-interactions and motion design experiments built with Framer Motion.",
        thumbnail: "/images/projects/project-6.jpg",
        tags: ["web", "design", "open-source"],
        technologies: ["React", "Framer Motion", "Tailwind CSS", "GSAP"],
        liveUrl: "https://project6.example.com",
        repoUrl: "https://github.com/username/project6",
        featured: false,
        year: 2022,
        color: "from-purple-600 to-violet-600",
    },
];

export const projectTags: { id: ProjectTag; label: string }[] = [
    { id: "web", label: "Web Apps" },
    { id: "3d", label: "3D & Creative" },
    { id: "open-source", label: "Open Source" },
    { id: "mobile", label: "Mobile" },
    { id: "design", label: "Design" },
];

export type { Project as ProjectType };
