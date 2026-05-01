// In-memory project data — used when MongoDB is not connected
// Also used by seedProjects.js to populate MongoDB
const projects = [
  {
    _id: "1",
    title: "Elevest (Fintech Platform)",
    emoji: "💹",
    description:
      "A production-level fintech application focused on mutual fund dashboards, partner onboarding, and real-time financial data visualization built with React.",
    longDescription:
      "Elevest is a comprehensive fintech platform that brings together financial data visualization, partner onboarding, and real-time analytics in a single cohesive dashboard. Built with performance and scalability in mind.",
    techStack: ["React.js", "API Integration", "Fintech", "Dashboards", "Responsive UI"],
    features: [
      "📊 Built financial dashboards with charts, filters, and data tables",
      "📈 Implemented mutual fund data visualization with API integration",
      "👥 Developed partner onboarding flows with validation and step UI",
      "🔐 Integrated OTP authentication (send / verify flow)",
      "📱 Built responsive UI aligned with Figma designs",
      "⚡ Optimized performance for large-scale financial data",
    ],
    liveUrl: "https://www.elevest.in/",
    githubUrl: "",
    category: "React",
    featured: true,
  },
  {
    _id: "2",
    title: "Blog Spark",
    emoji: "📝",
    description:
      "Developed a comprehensive blog platform featuring user authentication, rich content management, and modern responsive design. Built with React 19 and Appwrite backend services.",
    longDescription:
      "Blog Spark is a full-featured blogging platform enabling users to create, manage, and publish rich-text articles. It leverages Appwrite as a BaaS to handle authentication, storage, and database needs.",
    techStack: ["React 19", "Redux Toolkit", "AppWrite(BaaS)", "Tailwind CSS", "TinyMCE"],
    features: [
      "🔐 Complete authentication system with secure session management",
      "📝 Rich text blog editor with image upload capabilities",
      "👤 Author attribution system with real user names",
      "🚀 Full CRUD operations for blog post management",
    ],
    liveUrl: "https://blog-spark-nu.vercel.app/",
    githubUrl: "",
    category: ["React", "Full-Stack"],
    featured: true,
  },
  {
    _id: "3",
    title: "ExploreVerse",
    emoji: "🌍",
    description:
      "A global explorer's digital companion built with React, featuring real-time weather, cultural insights, and immersive GSAP animations.",
    longDescription:
      "ExploreVerse is an immersive React application exploring countries through culture, cuisine, entertainment, and literature with multiple API integrations and smooth animations.",
    techStack: ["React 18", "GSAP", "Tailwind CSS", "API Integration"],
    features: [
      "🌎 Explore 195+ countries with rich cultural content",
      "🌤️ Real-time weather data integration",
      "🎬 GSAP-powered page transitions and micro-animations",
      "🍽️ Cultural cuisine and entertainment insights",
    ],
    liveUrl: "https://explore-verse-exploringworld.vercel.app/",
    githubUrl: "",
    category: "React",
    featured: true,
  },
  {
    _id: "4",
    title: "Car Comparison Dashboard",
    emoji: "🚗",
    description:
      "A responsive React web app to compare cars by features, built with accessibility and SEO in mind.",
    longDescription:
      "Built for a frontend assessment, this dashboard allows users to compare multiple cars side-by-side with filtering, responsive design, and user-friendly UI.",
    techStack: ["React", "CSS/SCSS", "Vercel"],
    features: [
      "🔍 Side-by-side car comparison with dynamic filtering",
      "♿ Accessibility-first markup with ARIA support",
      "📱 Fully responsive and mobile-friendly",
      "🔎 SEO optimised with semantic HTML",
    ],
    liveUrl: "https://car-comparison-dashboard.vercel.app/",
    githubUrl: "",
    category: "React",
    featured: false,
  },
  {
    _id: "5",
    title: "Fidel Capital",
    emoji: "💼",
    description:
      "A clean and modern business website with performance-focused frontend animations and effects.",
    longDescription:
      "Created dynamic frontend animations and layout optimization for Fidel Capital, a business consulting firm seeking a premium digital presence.",
    techStack: ["WordPress", "Animate", "Swiper"],
    features: [
      "✨ Custom CSS animations for premium visual experience",
      "🖼️ Responsive image galleries with Swiper",
      "⚡ Optimized page speed and Core Web Vitals",
      "📐 Pixel-perfect conversion from design mockups",
    ],
    liveUrl: "https://fidelcapital.net/",
    githubUrl: "",
    category: "WordPress",
    featured: false,
  },
  {
    _id: "6",
    title: "Vitale",
    emoji: "⚡",
    description:
      "Contributed to a high-performance site focused on accessibility and real-time animations.",
    longDescription:
      "Ensured WCAG accessibility compliance while building interactive frontends and responsive UI layouts for Vitale's digital presence.",
    techStack: ["HTML", "CSS", "JavaScript"],
    features: [
      "♿ Full WCAG 2.1 AA compliance",
      "🎨 Real-time CSS animations",
      "📱 Mobile-first responsive layout",
      "🏎️ High-performance markup optimisation",
    ],
    liveUrl: "https://www.vitale.com.au/",
    githubUrl: "",
    category: "HTML/CSS",
    featured: false,
  },
  {
    _id: "7",
    title: "OHK Energy",
    emoji: "🌱",
    description:
      "Corporate WordPress site built with a focus on branding consistency and pixel-perfect design.",
    longDescription:
      "Maintained brand visuals and optimized structure for accessibility and mobile responsiveness for OHK Energy's corporate website.",
    techStack: ["WordPress", "Elementor", "Custom Clip-Paths", "Gradient CSS"],
    features: [
      "🎨 Custom clip-path and gradient visual effects",
      "📐 Pixel-perfect Figma-to-WordPress implementation",
      "📱 Fully responsive mobile design",
      "🔧 Elementor customization and optimization",
    ],
    liveUrl: "https://www.ohkenergy.com/",
    githubUrl: "",
    category: "WordPress",
    featured: false,
  },
  {
    _id: "8",
    title: "Little Lane ELC",
    emoji: "🎓",
    description:
      "Education website enriched with animations, sliders, and user-friendly design experience.",
    longDescription:
      "Enhanced the site with scroll animations, responsive sliders, and smooth interactions for better UX for Little Lane Early Learning Centre.",
    techStack: ["WordPress", "AOS", "jQuery"],
    features: [
      "📜 AOS scroll animation library integration",
      "🎠 Responsive image sliders and carousels",
      "✨ Smooth page interactions and micro-animations",
      "👶 Child-friendly UI with warm colour palette",
    ],
    liveUrl: "https://littlelaneelc.com.au/",
    githubUrl: "",
    category: "WordPress",
    featured: false,
  },
  {
    _id: "9",
    title: "Mobility Mojo",
    emoji: "♿",
    description:
      "Worked on accessibility-focused frontend, maintaining W3C and WCAG compliance throughout.",
    longDescription:
      "Implemented clean, accessible markup with focus on semantic HTML and cross-device usability for Mobility Mojo's accessibility platform.",
    techStack: ["HTML", "SCSS", "W3C WAI WCAG"],
    features: [
      "♿ WCAG 2.1 AA/AAA compliance enforcement",
      "🏛️ Semantic HTML5 structure throughout",
      "📱 Cross-device and cross-browser compatibility",
      "🔬 Screen reader optimised with ARIA landmarks",
    ],
    liveUrl: "https://www.mobilitymojo.com/",
    githubUrl: "",
    category: "HTML/CSS",
    featured: false,
  },
  {
    _id: "10",
    title: "345 Projects",
    emoji: "🏗️",
    description:
      "Real estate WordPress project focused on elegant layout, galleries, and lead forms.",
    longDescription:
      "Optimized lead capture and frontend layout for high-converting property showcase for 345 Projects, an Australian real estate developer.",
    techStack: ["WordPress", "Elementor", "jQuery"],
    features: [
      "🏡 High-converting property showcase layout",
      "📸 Elegant image galleries for property listings",
      "📋 Optimized lead capture forms",
      "📱 Fully responsive across all devices",
    ],
    liveUrl: "https://www.345projects.com.au/",
    githubUrl: "",
    category: "WordPress",
    featured: false,
  },
  {
    _id: "11",
    title: "Washodry",
    emoji: "🧺",
    description:
      "Laundry booking platform designed with React for intuitive service scheduling and UI clarity.",
    longDescription:
      "Built the entire frontend to enable seamless laundry slot booking with mobile-first design for Washodry, an on-demand laundry service.",
    techStack: ["React", "CSS", "Responsive Design"],
    features: [
      "📅 Intuitive service slot booking interface",
      "📱 Mobile-first responsive design",
      "🎨 Clean and minimal UI for clarity",
      "⚡ Lightweight and fast React implementation",
    ],
    liveUrl: "https://washodry.in/",
    githubUrl: "",
    category: "React",
    featured: false,
  },
  {
    _id: "12",
    title: "Altaironara",
    emoji: "🚀",
    description:
      "A modern React-based website for Altaironara, showcasing intelligent platforms for startup ecosystems and educational institutions.",
    longDescription:
      "Altaironara is a polished marketing website built to present its ecosystem of digital products, including startup and school management solutions. It features a responsive layout, reusable UI components, React Router-based navigation, content centralized in configuration files, and webhook-powered contact forms for lead capture.",
    techStack: [
      "React",
      "Framer Motion",
      "Vercel Analytics",
      "Vercel Speed Insights",
      "Formspree",
      "Vite",
      "React Router",
      "CSS Modules",
    ],
    features: [
      "Responsive landing page with modern UI sections",
      "Centralized content architecture for easier updates",
      "Contact form with validation and Formspree integration",
      "SPA navigation with React Router",
      "Legal pages and dedicated thank-you flow",
      "Performance and analytics integration",
    ],
    liveUrl: "https://altaironara.com",
    githubUrl: "",
    category: ["React", "Full-Stack"],
    // priority: 12,
    featured: true,
  },
];

module.exports = { projects };
