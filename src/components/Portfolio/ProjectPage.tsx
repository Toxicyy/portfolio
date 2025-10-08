import * as React from "react";
import { useState, useCallback, useEffect, type FC, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type { Project } from "../../types/types";

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

interface OptimizedCarouselProps {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onImageClick: (index: number) => void;
}

const OptimizedCarousel: FC<OptimizedCarouselProps> = React.memo(
  ({ images, currentIndex, onNext, onPrev, onImageClick }) => {
    const [_direction, setDirection] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragX, setDragX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle drag start - set dragging state
    const handleDragStart = () => {
      setIsDragging(true);
      setDragX(0);
    };

    // Track drag position
    const handleDrag = (_event: TouchEvent | MouseEvent, info: PanInfo) => {
      setDragX(info.offset.x);
    };

    // Handle drag end - determine if swipe threshold met
    const handleDragEnd = (_event: TouchEvent | MouseEvent, info: PanInfo) => {
      setIsDragging(false);

      const swipeThreshold = 50;
      const velocityThreshold = 500;

      if (
        Math.abs(info.offset.x) > swipeThreshold ||
        Math.abs(info.velocity.x) > velocityThreshold
      ) {
        if (info.offset.x > 0 || info.velocity.x > 0) {
          setDirection(1);
          onPrev();
        } else {
          setDirection(-1);
          onNext();
        }
      }
      setDragX(0);
    };

    // Calculate image position based on current index and drag offset
    const getImagePosition = (index: number) => {
      const position = index - currentIndex;

      if (isDragging) {
        return position * 100 + dragX / 10;
      }

      return position * 100;
    };

    // Calculate opacity for adjacent images
    const getImageOpacity = (index: number) => {
      const position = index - currentIndex;
      const absPosition = Math.abs(position);

      if (absPosition === 0) return 1;
      if (absPosition === 1) return 0.4;
      return 0;
    };

    // Calculate scale for visual depth effect
    const getImageScale = (index: number) => {
      const position = index - currentIndex;
      const absPosition = Math.abs(position);

      if (absPosition === 0) return 1;
      if (absPosition === 1) return 0.85;
      return 0.8;
    };

    // Layer images properly
    const getImageZIndex = (index: number) => {
      const position = index - currentIndex;
      return 100 - Math.abs(position);
    };

    return (
      <div className="relative w-full max-w-6xl mx-auto mb-8">
        <div
          ref={containerRef}
          className="relative bg-gray-800/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20"
        >
          {/* Main carousel container - responsive height */}
          <div className="relative flex items-center justify-center min-h-[50vh] md:min-h-[400px] md:max-h-[70vh] overflow-hidden touch-pan-y">
            {/* Image stack container - draggable */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center p-2 md:p-4 pointer-events-none"
                  style={{
                    x: `${getImagePosition(index)}%`,
                    zIndex: getImageZIndex(index),
                  }}
                  animate={{
                    x: `${getImagePosition(index)}%`,
                    opacity: getImageOpacity(index),
                    scale: getImageScale(index),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.3,
                  }}
                >
                  <img
                    src={image}
                    alt={`Project screenshot ${index + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                    loading="lazy"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Counter indicator */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 z-[150] pointer-events-none">
              <span className="text-white text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Navigation buttons - desktop only, high z-index */}
            {images.length > 1 && (
              <>
                <motion.button
                  className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-[150] p-3 bg-black/80 backdrop-blur-md border border-purple-500/30 hover:bg-purple-500/20 rounded-xl transition-colors duration-200 items-center justify-center pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(1);
                    onPrev();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </motion.button>

                <motion.button
                  className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-[150] p-3 bg-black/80 backdrop-blur-md border border-purple-500/30 hover:bg-purple-500/20 rounded-xl transition-colors duration-200 items-center justify-center pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(-1);
                    onNext();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="relative group mt-4">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Scrollable thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-3 px-2 scroll-smooth custom-scrollbar-thin">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 my-2 ${
                    index === currentIndex
                      ? "border-purple-400 shadow-lg shadow-purple-500/40 scale-110"
                      : "border-gray-600/50 hover:border-purple-300/70 hover:shadow-md hover:shadow-purple-500/20"
                  }`}
                  onClick={() => onImageClick(index)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Active indicator */}
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                      layoutId="activeThumb"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      index === currentIndex
                        ? "brightness-100"
                        : "brightness-75 hover:brightness-90"
                    }`}
                    loading="lazy"
                  />

                  {/* Index number */}
                  <div
                    className={`absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-purple-500 text-white"
                        : "bg-gray-800/80 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-500/0 via-purple-500/0 to-transparent opacity-0 group-hover:opacity-100"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Scroll hint */}
            <motion.div
              className="text-center text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Scroll to view all images
            </motion.div>
          </div>
        )}

        {/* Mobile dots indicator */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 gap-2 md:hidden">
            {images.map((_, index) => (
              <motion.button
                key={index}
                className="w-2 h-2 rounded-full transition-colors duration-200"
                animate={{
                  backgroundColor:
                    index === currentIndex
                      ? "#a855f7"
                      : "rgba(255,255,255,0.4)",
                  scale: index === currentIndex ? 1.2 : 1,
                }}
                onClick={() => onImageClick(index)}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

OptimizedCarousel.displayName = "OptimizedCarousel";

const ProjectPage: FC<ProjectPageProps> = ({ project, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    if (!project || project.images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project]);

  const prevImage = useCallback(() => {
    if (!project || project.images.length <= 1) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  }, [project]);

  const handleImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const handleOpenGithub = useCallback(() => {
    if (project) {
      window.open(project.githubUrl, "_blank");
    }
  }, [project]);

  const handleOpenDemo = useCallback(() => {
    if (project) {
      window.open(project.liveUrl, "_blank");
    }
  }, [project]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
        case "Escape":
          e.preventDefault();
          onBack();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [project, nextImage, prevImage, onBack]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return null;

  return (
    <motion.div
      className="relative z-10 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Projects</span>
          </motion.button>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleOpenGithub}>
              <Github className="h-4 w-4 mr-2" />
              Code
            </Button>
            <Button onClick={handleOpenDemo}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Project header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {project.title}
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            {project.shortDescription}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-purple-400">
            <span>{project.role}</span>
            <span>•</span>
            <span>{project.publishedDate}</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <OptimizedCarousel
            images={project.images}
            currentIndex={currentImageIndex}
            onNext={nextImage}
            onPrev={prevImage}
            onImageClick={handleImageClick}
          />
        </motion.div>

        {/* Project details grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Project Overview
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Key Features
                </h4>
                <ul className="text-gray-300 space-y-2">
                  {[
                    "Real-time data synchronization",
                    "Responsive design for all devices",
                    "Advanced security implementation",
                    "Scalable architecture",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, idx) => (
                <Badge key={idx} variant="gradient">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Project Status Badge */}
            {project.status === "in development" && (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-amber-300 font-medium text-sm">
                    In Development
                  </span>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3">
                Project Links
              </h4>
              <div className="space-y-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  View Source Code
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  Visit Live Site
                </a>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in working together?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how I can help bring your ideas to life
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={onBack}>
                <Home className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectPage;
