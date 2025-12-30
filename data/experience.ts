/**
 * ========================================
 * EXPERIENCE CONFIGURATION
 * ========================================
 * Edit this file to update your work experience.
 * Entries are displayed in the Experience/Timeline section.
 */

export interface ExperienceEntry {
    id: string;
    role: string;
    company: string;
    companyUrl?: string;
    location: string;
    type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
    startDate: string;
    endDate: string | "Present";
    description: string;
    achievements: string[];
    technologies: string[];
    icon?: string;
}

export const experiences: ExperienceEntry[] = [
    {
        id: "exp-1",
        role: "Senior Frontend Developer",
        company: "[COMPANY NAME]",
        companyUrl: "https://company.com",
        location: "Remote",
        type: "Full-time",
        startDate: "2022-01",
        endDate: "Present",
        description: "Leading the frontend architecture for a cutting-edge SaaS platform, focusing on performance optimization and immersive user experiences.",
        achievements: [
            "Architected and implemented a component library used across 5 products",
            "Reduced initial load time by 60% through code splitting and lazy loading",
            "Led the integration of 3D product visualization features",
            "Mentored a team of 4 junior developers",
        ],
        technologies: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
        icon: "🚀",
    },
    {
        id: "exp-2",
        role: "Creative Developer",
        company: "[AGENCY NAME]",
        companyUrl: "https://agency.com",
        location: "New York, NY",
        type: "Full-time",
        startDate: "2020-03",
        endDate: "2021-12",
        description: "Crafted award-winning interactive experiences for global brands, combining creative vision with technical excellence.",
        achievements: [
            "Developed 15+ interactive websites for Fortune 500 clients",
            "Won 2 Awwwards for outstanding web design",
            "Pioneered the agency's 3D web development capabilities",
            "Collaborated directly with design teams on motion concepts",
        ],
        technologies: ["React", "GSAP", "Three.js", "WebGL", "Framer Motion"],
        icon: "🎨",
    },
    {
        id: "exp-3",
        role: "Frontend Developer",
        company: "[STARTUP NAME]",
        companyUrl: "https://startup.com",
        location: "San Francisco, CA",
        type: "Full-time",
        startDate: "2018-06",
        endDate: "2020-02",
        description: "Built and scaled the frontend for a fast-growing fintech startup from MVP to Series A.",
        achievements: [
            "Developed the core dashboard used by 50,000+ users",
            "Implemented real-time data visualization features",
            "Established frontend testing practices achieving 85% coverage",
            "Contributed to successful Series A funding round",
        ],
        technologies: ["React", "Redux", "D3.js", "Node.js", "Jest"],
        icon: "📈",
    },
    {
        id: "exp-4",
        role: "Web Developer Intern",
        company: "[TECH COMPANY]",
        companyUrl: "https://techcompany.com",
        location: "Boston, MA",
        type: "Internship",
        startDate: "2017-05",
        endDate: "2018-05",
        description: "Gained foundational experience in modern web development practices while contributing to production applications.",
        achievements: [
            "Developed internal tools that improved team productivity by 30%",
            "Learned modern JavaScript frameworks and best practices",
            "Participated in code reviews and agile ceremonies",
            "Received full-time offer upon graduation",
        ],
        technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Git"],
        icon: "🎓",
    },
];

export type { ExperienceEntry as ExperienceEntryType };
