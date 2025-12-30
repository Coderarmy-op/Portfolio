/**
 * ========================================
 * SOCIAL LINKS CONFIGURATION
 * ========================================
 * Edit this file to update your social media links.
 * Links are displayed in the Contact section and footer.
 */

export interface SocialLink {
    id: string;
    name: string;
    url: string;
    icon: string; // SVG path or emoji
    hoverColor: string; // Tailwind color class
}

export const socials: SocialLink[] = [
    {
        id: "github",
        name: "GitHub",
        url: "https://github.com/yourusername",
        icon: "github",
        hoverColor: "hover:text-white",
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        url: "https://linkedin.com/in/yourusername",
        icon: "linkedin",
        hoverColor: "hover:text-blue-400",
    },
    {
        id: "twitter",
        name: "Twitter / X",
        url: "https://twitter.com/yourusername",
        icon: "twitter",
        hoverColor: "hover:text-sky-400",
    },
    {
        id: "dribbble",
        name: "Dribbble",
        url: "https://dribbble.com/yourusername",
        icon: "dribbble",
        hoverColor: "hover:text-pink-400",
    },
    {
        id: "codepen",
        name: "CodePen",
        url: "https://codepen.io/yourusername",
        icon: "codepen",
        hoverColor: "hover:text-green-400",
    },
    {
        id: "email",
        name: "Email",
        url: "mailto:hello@yourname.com",
        icon: "email",
        hoverColor: "hover:text-amber-400",
    },
];

export type { SocialLink as SocialLinkType };
