import {
  Code,
  Database,
  Globe,
  Server,
  Smartphone,
  GitBranch,
} from "lucide-react";

import type { Project, Skill } from "./types/types";

// Import images Soundify
import thumbnail from "./images/thumbnail.jpg";
import admin from "./images/admin.jpg";
import album from "./images/album.jpg";
import artistStudio from "./images/artist-studio.jpg";
import artist from "./images/artist.jpg";
import becomeAnArtist from "./images/become-an-artist.jpg";
import discoverArtist from "./images/discover-artist.jpg";
import discoverPlaylist from "./images/discover-playlist.jpg";
import liked from "./images/liked.jpg";
import main from "./images/main.jpg";
import platformCreation from "./images/platform-creation.jpg";
import platfromList from "./images/platform-list.jpg";
import playlistCreation from "./images/playlist-creation.jpg";
import premium from "./images/premium.jpg";
import trackInfo from "./images/track-info.jpg";
import user from "./images/user.jpg";

// Import images SnapURL-Admin
import thumbnail2 from "./images/snapURL-admin/thumbnail.png";
import login from "./images/snapURL-admin/login.png";
import register from "./images/snapURL-admin/register.png";
import dashboard from "./images/snapURL-admin/dashboard.png";
import urls from "./images/snapURL-admin/urls.png";
import createUrl from "./images/snapURL-admin/create-url.png";
import bulkCreate from "./images/snapURL-admin/bulk-create.png";
import QR from "./images/snapURL-admin/QR.png";
import settingsUsage from "./images/snapURL-admin/settings-usage.png";
import settingsApiAccess from "./images/snapURL-admin/settings-api-access.png";
import overview from "./images/snapURL-admin/overview.png";
import performance from "./images/snapURL-admin/performance.png";
import security from "./images/snapURL-admin/security.png";
import notifications from "./images/snapURL-admin/notifications.png";
import mobileHelp from "./images/snapURL-admin/mobile-help.png";
import mobileBulk from "./images/snapURL-admin/mobile-bulk.png";

// Import images AirPods Landing
import mainAir from "./images/Airpods/main.png";
import mainAir2 from "./images/Airpods/main2.png";
import mainAir3 from "./images/Airpods/main3.png";
import prod from "./images/Airpods/prod.png";
import prices from "./images/Airpods/prices.png";
import contact from "./images/Airpods/contact.png";
import mobileMain from "./images/Airpods/mobile-main.png";
import mobileProd from "./images/Airpods/mobile-products.png";
import mobilePricing from "./images/Airpods/mobile-pricing.png";
import mobileContact from "./images/Airpods/mobile-contact.png";

// Import images API
import thumbnail3 from "./images/API/thumbnail.png";
import routes1 from "./images/API/routes1.png";
import routes2 from "./images/API/routes2.png";
import routes3 from "./images/API/routes3.png";
import qrRoute from "./images/API/qrRoute.png";
import urlSchema from "./images/API/urlSchema.png";
import userSchema from "./images/API/userSchema.png";
import urlExample from "./images/API/urlExample.png";
import clickExample from "./images/API/clickExample.png";
import Postman from "./images/API/Postman.png";
import DBScheme from "./images/API/DBScheme.png";

export const skillsData: Skill[] = [
  { name: "React", icon: <Code />, category: "Frontend" },
  { name: "TypeScript", icon: <Code />, category: "Frontend" },
  { name: "Node.js", icon: <Server />, category: "Backend" },
  { name: "Express.js", icon: <Server />, category: "Backend" },
  { name: "MongoDB", icon: <Database />, category: "Backend" },
  { name: "Mongoose", icon: <Database />, category: "Backend" },
  { name: "RESTful API", icon: <Globe />, category: "Backend" },
  { name: "Git", icon: <GitBranch />, category: "Tools" },
  { name: "GitHub", icon: <GitBranch />, category: "Tools" },
  { name: "Tailwind CSS", icon: <Code />, category: "Frontend" },
  { name: "HTML5", icon: <Code />, category: "Frontend" },
  { name: "CSS3", icon: <Code />, category: "Frontend" },
  { name: "JavaScript", icon: <Code />, category: "Frontend" },
  {
    name: "Responsive Design",
    icon: <Smartphone />,
    category: "Frontend",
  },
  {
    name: "Jest",
    icon: <Code />,
    category: "Tools",
  },
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Soundify - Full-Stack Music Streaming Platform",
    shortDescription:
      "Enterprise-level music streaming service with HLS transcoding",
    fullDescription:
      "Built music streaming platform using MERN stack with HLS streaming technology. Features: user/artist dashboards, playlists, albums, search, recommendations, admin panel, charts, analytics. Implemented server-side audio conversion pipeline processing multiple formats into HLS segments, integrated with BackBlaze B2 and MongoDB. Includes JWT authentication, subscription system, artist studio, mobile-responsive design with Tailwind CSS, TypeScript. 45k+ lines codebase over 3 months.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "BackBlaze B2",
      "HLS Streaming",
      "JWT Auth",
    ],
    githubUrl: "https://github.com/ivanvysocinas/Soundify",
    liveUrl: "https://soundify-production-e79b.up.railway.app/",
    images: [
      thumbnail,
      main,
      discoverPlaylist,
      discoverArtist,
      liked,
      playlistCreation,
      artist,
      user,
      trackInfo,
      album,
      admin,
      platfromList,
      platformCreation,
      artistStudio,
      premium,
      becomeAnArtist,
    ],
    publishedDate: "Aug 13, 2025",
    role: "Full-Stack Developer",
    status: "in development"
  },
  {
    id: 2,
    title: "SnapURL - Admin Dashboard",
    shortDescription:
      "Professional URL shortening service administration panel with real-time analytics",
    fullDescription:
      "Comprehensive admin dashboard for URL management built with Next.js 14 and TypeScript. Features role-based access control (Admin, User, Demo), real-time click tracking with geographic data visualization using Recharts, bulk operations for URL import/export, dynamic QR code generation, and advanced search with debouncing. Implements responsive design with dark/light theme support, performance monitoring, system health tracking, and data export in multiple formats. Built with modern architecture including Context API for state management, custom hooks, error boundaries, and optimized with code splitting and lazy loading. Includes comprehensive testing suite with Jest and accessibility testing.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "React 18",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Context API",
      "Jest",
    ],
    githubUrl: "https://github.com/ivanvysocinas/Snap-URL-Admin",
    liveUrl: "https://app.snapurl.uk",
    images: [
      thumbnail2,
      login,
      register,
      dashboard,
      urls,
      createUrl,
      bulkCreate,
      QR,
      settingsUsage,
      settingsApiAccess,
      overview,
      performance,
      security,
      notifications,
      mobileHelp,
      mobileBulk,
    ],
    publishedDate: "Sep 25, 2025",
    role: "Frontend Developer",
  },
  {
    id: 3,
    title: "AirPods Max - Landing Page",
    shortDescription:
      "Modern product landing page with smooth animations and interactive UI",
    fullDescription:
      "Elegant landing page for AirPods Max built with Next.js 14 App Router and TypeScript. Features smooth scroll animations powered by Framer Motion, fully responsive design optimized for all devices, interactive UI elements with hover effects and transitions. Implements modern web practices with Tailwind CSS utility-first styling, Ant Design Icons integration, and multiple product showcase pages. Clean component architecture with reusable animation utilities and optimized static asset loading.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Ant Design",
      "React 18",
    ],
    githubUrl: "https://github.com/ivanvysocinas/AirPods-landing",
    liveUrl: "https://airpods-landing-production.up.railway.app/",
    images: [
      mainAir,
      mainAir2,
      mainAir3,
      prod,
      prices,
      contact,
      mobileMain,
      mobileProd,
      mobilePricing,
      mobileContact,
    ],
    publishedDate: "Oct 4, 2024",
    role: "Frontend Developer",
    badgeColor: "black",
  },
  {
    id: 5,
    title: "SnapURL - REST API Backend",
    shortDescription:
      "High-performance URL shortening REST API with advanced analytics engine",
    fullDescription:
      "RESTful API built with Node.js and Express.js featuring comprehensive URL shortening service with JWT authentication, multi-tier rate limiting, and real-time analytics. Implements advanced tracking with GeoIP integration for geographic insights, device and browser detection using UA Parser, time-series data aggregation with MongoDB pipelines. Includes bulk operations (up to 100 URLs per request) and QR code generation. Fully documented with Swagger specification, tested with 160+ unit and integration tests using Jest. Supports JSON and CSV data export with flexible filtering options.",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Jest",
      "Swagger",
      "Docker",
    ],
    githubUrl: "https://github.com/ivanvysocinas/Snap-URL-API",
    liveUrl: "https://snapurl.uk/api-docs",
    images: [
      thumbnail3,
      routes1,
      routes2,
      routes3,
      qrRoute,
      urlSchema,
      userSchema,
      urlExample,
      clickExample,
      Postman,
      DBScheme,
    ],
    publishedDate: "Sep 12, 2025",
    role: "Backend Developer",
  },
];

export const skillCategories = ["All", "Frontend", "Backend", "Tools"];
