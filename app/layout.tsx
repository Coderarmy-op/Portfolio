import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

/**
 * ========================================
 * ROOT LAYOUT
 * ========================================
 * How to run the project:
 * 1. npm install
 * 2. npm run dev
 * 3. Open http://localhost:3000
 * 
 * To customize:
 * - Edit data/*.ts files for content
 * - Edit tailwind.config.ts for colors/theme
 * - Edit components/sections/*.tsx for layouts
 */

// Primary font
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

// Display font for headings
const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
    title: profile.siteTitle,
    description: profile.siteDescription,
    keywords: ["portfolio", "developer", "frontend", "creative", "3D", "web development"],
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: profile.siteUrl,
        title: profile.siteTitle,
        description: profile.siteDescription,
        siteName: profile.name,
        images: [
            {
                url: profile.ogImage,
                width: 1200,
                height: 630,
                alt: `${profile.name} Portfolio`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: profile.siteTitle,
        description: profile.siteDescription,
        images: [profile.ogImage],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${spaceGrotesk.variable} ${outfit.variable}`}
            suppressHydrationWarning
        >
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#030014" />
            </head>
            <body className="font-sans antialiased bg-dark-900 text-white overflow-x-hidden">
                {/* Noise texture overlay */}
                <div className="noise-overlay" />

                {/* Main content */}
                {children}
            </body>
        </html>
    );
}
