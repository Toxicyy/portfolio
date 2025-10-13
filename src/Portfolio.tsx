import { useState, useCallback } from "react";
import { useScroll, useTransform, AnimatePresence } from "framer-motion";

import Navigation from "./components/Portfolio/Navigation";
import HeroSection from "./components/Portfolio/HeroSection";
import AboutSection from "./components/Portfolio/AboutSection";
import SkillsSection from "./components/Portfolio/SkillsSection";
import ProjectsSection from "./components/Portfolio/ProjectsSection";
import ContactSection from "./components/Portfolio/ContactSection";
import Footer from "./components/Portfolio/Footer";
import ProjectPage from "./components/Portfolio/ProjectPage";
import StarField from "./components/Portfolio/StarField";

import type { PageType } from "./types/types";

import { projectsData } from "./data";

const Portfolio: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleProjectSelect = useCallback((projectId: number) => {
    setCurrentPage(projectId);
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateHome = useCallback(() => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  }, []);

  const currentProject = typeof currentPage === 'number'
    ? projectsData.find(p => p.id === currentPage)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      <StarField />

      <Navigation currentPage={currentPage} onNavigate={handleNavigateHome} />

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <div key="home">
            <HeroSection y={y} opacity={opacity} />
            <AboutSection />
            <SkillsSection/>
            <ProjectsSection
              projects={projectsData}
              onProjectSelect={handleProjectSelect}
            />
            <ContactSection />
            <Footer />
          </div>
        ) : currentProject ? (
          <ProjectPage
            key={currentProject.id}
            project={currentProject}
            onBack={handleNavigateHome}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;