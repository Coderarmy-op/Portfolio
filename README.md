# Premium Portfolio Website

A visually stunning, production-ready personal portfolio website built with modern technologies and rich animations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & Tailwind
│   ├── layout.tsx         # Root layout with fonts & SEO
│   └── page.tsx           # Main page composing sections
├── components/            # React components
│   ├── 3d/               # React Three Fiber scenes
│   │   ├── HeroScene.tsx
│   │   └── ShowcaseScene.tsx
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── ThreeDSection.tsx
│   │   └── Contact.tsx
│   ├── CustomCursor.tsx
│   ├── Navbar.tsx
│   ├── PageLoader.tsx
│   └── ScrollProgress.tsx
├── data/                  # Editable content
│   ├── profile.ts        # Personal info, bio, SEO
│   ├── skills.ts         # Skills by category
│   ├── experience.ts     # Career timeline
│   ├── projects.ts       # Portfolio projects
│   └── socials.ts        # Social links
├── lib/                   # Utilities & hooks
│   ├── hooks.ts
│   └── utils.ts
└── public/               # Static assets
    └── images/           # Place your images here
```

## ✏️ Customization Guide

### 1. Personal Information
Edit `data/profile.ts`:
- Name, title, bio
- Contact email
- Location and highlights
- SEO metadata

### 2. Skills
Edit `data/skills.ts`:
- Add/remove skill categories
- Update proficiency levels
- Change icons and colors

### 3. Work Experience
Edit `data/experience.ts`:
- Add job roles
- Update dates and descriptions
- List achievements

### 4. Projects
Edit `data/projects.ts`:
- Add new projects
- Set featured status
- Update tags and technologies

### 5. Social Links
Edit `data/socials.ts`:
- Add/remove social platforms
- Update URLs

### 6. Theme Colors
Edit `tailwind.config.ts`:
- Accent colors (primary, secondary, cyan, pink)
- Dark mode colors
- Custom animations

### 7. Images
Place your images in `public/images/`:
- `avatar-placeholder.jpg` - Your profile photo
- `projects/` - Project thumbnails
- `og-image.jpg` - Social sharing image

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **2D Animations:** Framer Motion
- **3D Graphics:** React Three Fiber, Drei, Three.js
- **Fonts:** Space Grotesk, Outfit (Google Fonts)

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Custom cursor with spring physics
- ✅ Scroll progress indicator
- ✅ Page load animation
- ✅ Interactive 3D scenes
- ✅ Smooth scroll-triggered animations
- ✅ Filter-able project gallery
- ✅ Contact form with validation
- ✅ SEO optimized with Open Graph
- ✅ Accessible (semantic HTML, keyboard nav)

## 🎨 Animation Highlights

- Staggered entrance animations
- Interactive 3D shapes with mouse parallax
- Floating elements with spring physics
- Gradient border animations
- Hover effects on all interactive elements
- Morphing background blobs
- Shimmer effects on buttons

## 🚢 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or manually:

```bash
npm run build
npm run start
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!
