/**
 * ========================================
 * SKILLS CONFIGURATION
 * ========================================
 * Edit this file to update your skills.
 * Skills are grouped by category and displayed in the Skills section.
 */

export interface Skill {
    name: string;
    icon: string; // Emoji or path to icon
    proficiency: number; // 1-100
}

export interface SkillCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string; // Tailwind color class or hex
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        id: "frontend",
        name: "Frontend Development",
        icon: "🎨",
        description: "Building beautiful, responsive user interfaces",
        color: "from-violet-500 to-purple-500",
        skills: [
            { name: "React / Next.js", icon: "⚛️", proficiency: 95 },
            { name: "TypeScript", icon: "📘", proficiency: 90 },
            { name: "Tailwind CSS", icon: "🎨", proficiency: 95 },
            { name: "Framer Motion", icon: "✨", proficiency: 88 },
            { name: "HTML5 / CSS3", icon: "🌐", proficiency: 98 },
        ],
    },
    {
        id: "3d-creative",
        name: "3D & Creative",
        icon: "🎮",
        description: "Crafting immersive 3D experiences",
        color: "from-cyan-500 to-blue-500",
        skills: [
            { name: "Three.js", icon: "🔺", proficiency: 85 },
            { name: "React Three Fiber", icon: "🎭", proficiency: 82 },
            { name: "WebGL / Shaders", icon: "🌈", proficiency: 75 },
            { name: "Blender", icon: "🎬", proficiency: 70 },
            { name: "GSAP", icon: "🚀", proficiency: 80 },
        ],
    },
    {
        id: "backend",
        name: "Backend & APIs",
        icon: "⚙️",
        description: "Server-side development and databases",
        color: "from-emerald-500 to-teal-500",
        skills: [
            { name: "Node.js", icon: "🟢", proficiency: 85 },
            { name: "Python", icon: "🐍", proficiency: 78 },
            { name: "PostgreSQL", icon: "🐘", proficiency: 80 },
            { name: "GraphQL", icon: "◼️", proficiency: 75 },
            { name: "REST APIs", icon: "🔗", proficiency: 90 },
        ],
    },
    {
        id: "tools",
        name: "Tools & Workflow",
        icon: "🛠️",
        description: "Development tools and methodologies",
        color: "from-orange-500 to-amber-500",
        skills: [
            { name: "Git / GitHub", icon: "📚", proficiency: 92 },
            { name: "VS Code", icon: "💻", proficiency: 95 },
            { name: "Figma", icon: "🎯", proficiency: 85 },
            { name: "Docker", icon: "🐳", proficiency: 72 },
            { name: "CI/CD", icon: "🔄", proficiency: 78 },
        ],
    },
];

export type { SkillCategory as SkillCategoryType, Skill as SkillType };
