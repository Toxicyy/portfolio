import * as React from 'react';
import { useCallback, type FC } from "react";
import { motion, type MotionValue } from "framer-motion";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  y: MotionValue<string>;
  opacity: MotionValue<number>;
}

const HeroSection: FC<HeroSectionProps> = React.memo(({ y, opacity }) => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center px-6"
    >
      <motion.div
        className="text-center max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        <div className="relative mb-8">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span
              className="text-white"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm{" "}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
              }}
            >
              Ivan
            </motion.span>
            <motion.span
              className="text-white"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {" "}
              Vysocinas
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-4xl text-gray-300 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            I create stellar web experiences with modern technologies.
            <br />
            <motion.span
              className="text-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Specializing in MERN stack development.
            </motion.span>
          </motion.h2>
        </div>

        <motion.p
          className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          I build interfaces that are both beautiful and functional, turning
          ambitious ideas into robust, high-performance web applications that
          others find challenging.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/30 hover:bg-purple-500/10"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-center cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <motion.div
              className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-1 h-3 bg-purple-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <p className="text-purple-400 text-sm mt-2">Scroll</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;