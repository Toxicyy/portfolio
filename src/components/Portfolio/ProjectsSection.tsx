import React, { useState, useCallback, useEffect, type FC } from "react";
import { motion } from "framer-motion";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import ScrollReveal from "./ScrollReveal";
import type { Project } from "../../types/types";
import { staggerContainer, scaleIn } from "./animations";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectSelect: (projectId: number) => void;
}

const ProjectsSection: FC<ProjectsSectionProps> = React.memo(
  ({ projects, onProjectSelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const [direction, setDirection] = useState(0); // Track swipe direction

    // Update cards per view on resize
    useEffect(() => {
      const updateCardsPerView = () => {
        if (window.innerWidth >= 1280) {
          setCardsPerView(3); // xl: 3 cards
        } else if (window.innerWidth >= 1024) {
          setCardsPerView(2); // lg: 2 cards
        } else {
          setCardsPerView(1); // mobile: 1 card
        }
      };

      updateCardsPerView();
      window.addEventListener("resize", updateCardsPerView);
      return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    // Maximum index we can scroll to
    const maxIndex = Math.max(0, projects.length - cardsPerView);

    const handleProjectClick = useCallback(
      (projectId: number) => {
        onProjectSelect(projectId);
      },
      [onProjectSelect]
    );

    const handleGithubClick = useCallback(
      (e: React.MouseEvent, githubUrl: string) => {
        e.stopPropagation();
        window.open(githubUrl, "_blank");
      },
      []
    );

    const handleViewAllClick = useCallback(() => {
      window.open("https://github.com/Toxicyy", "_blank");
    }, []);

    const nextSlide = useCallback(() => {
      setDirection(1);
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
      setDirection(-1);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < maxIndex;

    // Calculate the offset percentage
    const offsetPercentage = (currentIndex / cardsPerView) * 100;
    
    // Calculate offset with gap for mobile (gap-8 = 32px = 2rem)
    const getMobileOffset = () => {
      const cardWidth = 100; // 100% width
      const gapInPx = 32; // gap-8 = 2rem = 32px
      return `calc(-${currentIndex * cardWidth}% - ${currentIndex * gapInPx}px)`;
    };

    return (
      <section id="projects" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                <span className="text-white">Featured </span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Here are some of my recent projects. Each project was carefully
                crafted with attention to detail, performance, and user
                experience.
              </p>
            </div>
          </ScrollReveal>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {canGoPrev && (
              <motion.button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 p-4 bg-gray-800/90 backdrop-blur-md border border-purple-500/30 hover:bg-purple-500/20 rounded-full transition-colors duration-200 hidden xl:block"
                onClick={prevSlide}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </motion.button>
            )}

            {canGoNext && (
              <motion.button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 p-4 bg-gray-800/90 backdrop-blur-md border border-purple-500/30 hover:bg-purple-500/20 rounded-full transition-colors duration-200 hidden xl:block"
                onClick={nextSlide}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </motion.button>
            )}

            {/* Projects Slider */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{
                  x: cardsPerView === 1 
                    ? getMobileOffset()
                    : `-${offsetPercentage}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                  mass: 0.8,
                }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex-shrink-0 w-full lg:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.333rem)]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: cardsPerView === 1 && index !== currentIndex ? 0.5 : 1,
                      scale: cardsPerView === 1 && index !== currentIndex ? 0.95 : 1,
                      x: cardsPerView === 1 && index === currentIndex 
                        ? [direction * 50, 0] 
                        : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 },
                      x: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 30 
                      }
                    }}
                  >
                    <Card
                      className="group cursor-pointer overflow-hidden border-purple-500/20 hover:border-purple-500/50 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20 h-full flex flex-col"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      {/* Image Section */}
                      <motion.div
                        className="relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-full h-48 bg-gray-800/50 rounded-lg flex items-center justify-center mb-5"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.img
                            src={project.images[0]}
                            alt={project.title}
                            className="max-w-full max-h-full object-contain"
                            whileHover={{
                              filter: "brightness(1.1) contrast(1.1)",
                            }}
                            transition={{ duration: 0.7 }}
                          />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-purple-500/10"
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ y: -10 }}
                          whileHover={{ y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Badge
                            variant={
                              project.badgeColor === "black"
                                ? "black"
                                : "gradient"
                            }
                          >
                            {project.role}
                          </Badge>
                        </motion.div>
                      </motion.div>

                      {/* Content Section */}
                      <CardContent className="p-6 pt-0 flex-1 flex flex-col relative">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 1 }}
                        />

                        {/* Title and Description */}
                        <div className="relative z-10 flex-grow-0">
                          <CardTitle className="text-xl text-white mb-2 group-hover:text-purple-100 transition-all duration-300">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                            {project.shortDescription}
                          </CardDescription>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Technologies and Buttons */}
                        <div className="relative z-10 flex-grow-0">
                          <motion.div
                            className="flex flex-wrap gap-2 mb-4"
                            variants={staggerContainer}
                          >
                            {project.technologies
                              .slice(0, 3)
                              .map((tech, techIndex) => (
                                <motion.div
                                  key={techIndex}
                                  variants={scaleIn}
                                  whileHover={{ scale: 1.1, rotate: 2 }}
                                >
                                  <Badge variant="gradient">{tech}</Badge>
                                </motion.div>
                              ))}
                            {project.technologies.length > 3 && (
                              <motion.div
                                variants={scaleIn}
                                whileHover={{ scale: 1.1 }}
                              >
                                <Badge variant="secondary">
                                  +{project.technologies.length - 3}
                                </Badge>
                              </motion.div>
                            )}
                          </motion.div>

                          <motion.div
                            className="flex gap-3"
                            variants={staggerContainer}
                          >
                            <motion.div variants={scaleIn} className="flex-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={(e: React.MouseEvent) =>
                                  handleGithubClick(e, project.githubUrl)
                                }
                              >
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </Button>
                            </motion.div>
                            <motion.div variants={scaleIn} className="flex-1">
                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  handleProjectClick(project.id);
                                }}
                              >
                                View Details
                              </Button>
                            </motion.div>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Dots Indicator - Show on all screens when there are multiple slides */}
            {maxIndex > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <motion.button
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-purple-500"
                        : "w-2 bg-gray-600 hover:bg-gray-500"
                    }`}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            )}

            {/* Bottom Navigation Buttons - Show on mobile/tablet (hidden on xl) */}
            {maxIndex > 0 && (
              <div className="flex justify-center gap-4 mt-6 xl:hidden">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    disabled={!canGoPrev}
                    className="disabled:opacity-30 disabled:cursor-not-allowed h-12 w-12"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    disabled={!canGoNext}
                    className="disabled:opacity-30 disabled:cursor-not-allowed h-12 w-12"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            )}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-500/30 hover:bg-purple-500/10"
                  onClick={handleViewAllClick}
                >
                  <Github className="h-4 w-4 mr-2" />
                  Check My GitHub
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }
);

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;