import * as React from 'react';
import { useCallback, useState, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { PageType } from "../../types/types";

const navigationItems = ["Home", "About", "Skills", "Projects", "Contact"];

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: 'home') => void;
}

const Navigation: FC<NavigationProps> = React.memo(({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMenuOpen(false); // Close menu on mobile
    
    const performScroll = () => {
      const element = document.getElementById(sectionId.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (currentPage !== 'home') {
      onNavigate('home');
      // Wait for navigation to complete
      setTimeout(performScroll, 150);
    } else {
      performScroll();
    }
  }, [currentPage, onNavigate]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 50,
      rotateY: 90,
    },
    open: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg shadow-purple-500/10' : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold cursor-pointer relative z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsMenuOpen(false);
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-white">Ivan </span>
            <span className="text-purple-400">Vysocinas</span>
            <motion.span 
              className="text-white"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {" "}Portfolio
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex space-x-8 text-gray-300"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.6,
                }
              }
            }}
          >
            {navigationItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-purple-400 transition-all duration-300 focus:outline-none relative group"
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  color: "#a855f7",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile Burger Button */}
          <motion.button
            className="md:hidden relative z-50 p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-24" />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 z-40 md:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute top-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />

              {/* Menu Items */}
              <div className="relative h-full flex flex-col justify-center items-center space-y-8 px-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{
                      delay: index * 0.1 + 0.2,
                    }}
                    className="w-full"
                  >
                    <motion.button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="w-full text-4xl font-bold text-white hover:text-purple-400 transition-colors duration-300 text-center relative group"
                      whileHover={{ scale: 1.1, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="relative inline-block"
                        whileHover={{
                          backgroundImage: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        } as any}
                      >
                        {item}
                      </motion.span>
                      
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        initial={{ width: 0, x: "-50%" }}
                        whileHover={{ width: "80%", x: "-50%" }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Glowing effect on hover */}
                      <motion.div
                        className="absolute inset-0 -z-10 blur-xl opacity-0"
                        whileHover={{ opacity: 0.3 }}
                        style={{
                          background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)",
                        }}
                      />
                    </motion.button>

                    {/* Decorative line */}
                    {index < navigationItems.length - 1 && (
                      <motion.div
                        className="mt-8 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                ))}

                {/* Additional decorative element */}
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="flex gap-2"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;