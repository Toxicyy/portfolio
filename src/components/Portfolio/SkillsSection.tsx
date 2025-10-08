import { useMemo, useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import ScrollReveal from "./ScrollReveal";
import { skillsData, skillCategories } from "../../data";
import { staggerContainer, scaleIn } from "./animations";

interface SkillsSectionProps {
  skillFilter: string;
  onSkillFilterChange: (filter: string) => void;
}

const SkillsSection: FC<SkillsSectionProps> = React.memo(
  ({ skillFilter, onSkillFilterChange }) => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const filteredSkills = useMemo(() => {
      return skillFilter === "All"
        ? skillsData
        : skillsData.filter((skill) => skill.category === skillFilter);
    }, [skillFilter]);

    // Generate random particles for each skill
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      delay: Math.random() * 0.5,
    }));

    return (
      <section id="skills" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                <span className="text-white">My </span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Skills
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Technologies and tools I love working with
              </p>
            </div>
          </ScrollReveal>

          {/* Skill Filter - Responsive with horizontal scroll */}
          <ScrollReveal>
            <div className="flex justify-center mb-12 overflow-x-auto pb-2 px-2 -mx-2 scrollbar-hide">
              <motion.div
                className="flex gap-2 bg-black/20 backdrop-blur-md rounded-full p-2 border border-purple-500/20 min-w-min mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skillCategories.map((category) => (
                  <motion.div
                    key={category}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={skillFilter === category ? "primary" : "ghost"}
                      className={`rounded-full px-3 sm:px-4 md:px-6 py-2 transition-all duration-300 whitespace-nowrap text-xs sm:text-sm md:text-base ${
                        skillFilter === category
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : "text-gray-300 hover:text-white hover:bg-purple-500/20"
                      }`}
                      onClick={() => onSkillFilterChange(category)}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${skillFilter}`}
                  initial={{ 
                    opacity: 0, 
                    rotateY: -90,
                    z: -100,
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0,
                    z: 0,
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateY: 90,
                    z: -100,
                    transition: { duration: 0.3 }
                  }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  style={{ perspective: 1000 }}
                  layout
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5,
                      z: 50,
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <Card className="group cursor-pointer relative overflow-hidden border-purple-500/30 bg-gray-900/50 backdrop-blur-sm h-full">
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        style={{
                          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
                        }}
                        animate={{
                          scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredSkill === skill.name ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Particles */}
                      <AnimatePresence>
                        {hoveredSkill === skill.name && (
                          <>
                            {particles.map((particle) => (
                              <motion.div
                                key={particle.id}
                                className="absolute w-1 h-1 bg-purple-400 rounded-full"
                                initial={{ 
                                  x: "50%", 
                                  y: "50%", 
                                  scale: 0,
                                  opacity: 0,
                                }}
                                animate={{ 
                                  x: `calc(50% + ${particle.x}px)`,
                                  y: `calc(50% + ${particle.y}px)`,
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  delay: particle.delay,
                                  repeat: Infinity,
                                  ease: "easeOut",
                                }}
                              />
                            ))}
                          </>
                        )}
                      </AnimatePresence>

                      {/* Glowing border effect */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          boxShadow: "inset 0 0 0 1px rgba(168, 85, 247, 0.3)",
                        }}
                        animate={{
                          boxShadow: hoveredSkill === skill.name 
                            ? [
                                "inset 0 0 0 1px rgba(168, 85, 247, 0.3)",
                                "inset 0 0 20px 1px rgba(168, 85, 247, 0.6)",
                                "inset 0 0 0 1px rgba(168, 85, 247, 0.3)",
                              ]
                            : "inset 0 0 0 1px rgba(168, 85, 247, 0.3)",
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredSkill === skill.name ? Infinity : 0,
                        }}
                      />

                      <CardContent className="p-6 relative z-10 flex flex-col items-center justify-center h-full min-h-[160px]">
                        {/* Icon with 3D effect */}
                        <motion.div
                          className="mb-4 text-purple-400 group-hover:text-purple-300"
                          animate={{
                            rotateY: hoveredSkill === skill.name ? [0, 360] : 0,
                            scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            rotateY: {
                              duration: 2,
                              repeat: hoveredSkill === skill.name ? Infinity : 0,
                              ease: "linear",
                            },
                            scale: {
                              duration: 1,
                              repeat: hoveredSkill === skill.name ? Infinity : 0,
                              ease: "easeInOut",
                            },
                          }}
                          style={{
                            filter: hoveredSkill === skill.name 
                              ? "drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))"
                              : "none",
                            fontSize: "3rem",
                          }}
                        >
                          {skill.icon}
                        </motion.div>

                        {/* Skill name with gradient */}
                        <motion.h3
                          className="text-lg font-bold text-center mb-3"
                          animate={{
                            backgroundImage: hoveredSkill === skill.name
                              ? [
                                  "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
                                  "linear-gradient(180deg, #ec4899 0%, #a855f7 100%)",
                                  "linear-gradient(270deg, #a855f7 0%, #ec4899 100%)",
                                  "linear-gradient(360deg, #ec4899 0%, #a855f7 100%)",
                                ]
                              : "linear-gradient(90deg, #ffffff 0%, #ffffff 100%)",
                          }}
                          transition={{
                            duration: 3,
                            repeat: hoveredSkill === skill.name ? Infinity : 0,
                            ease: "linear",
                          }}
                          style={{
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: hoveredSkill === skill.name ? "transparent" : "white",
                          }}
                        >
                          {skill.name}
                        </motion.h3>

                        {/* Badge with pop animation */}
                        <motion.div
                          animate={{
                            scale: hoveredSkill === skill.name ? [1, 1.1, 1] : 1,
                            rotate: hoveredSkill === skill.name ? [0, 5, -5, 0] : 0,
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: hoveredSkill === skill.name ? Infinity : 0,
                            repeatDelay: 0.5,
                          }}
                        >
                          <Badge 
                            variant="gradient"
                            className="text-xs px-3 py-1"
                          >
                            {skill.category}
                          </Badge>
                        </motion.div>

                        {/* Floating rings effect */}
                        <AnimatePresence>
                          {hoveredSkill === skill.name && (
                            <>
                              <motion.div
                                className="absolute inset-0 border-2 border-purple-500/30 rounded-lg"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ 
                                  scale: [0.8, 1.2, 1.4],
                                  opacity: [0.5, 0.3, 0],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeOut",
                                }}
                              />
                              <motion.div
                                className="absolute inset-0 border-2 border-pink-500/30 rounded-lg"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ 
                                  scale: [0.8, 1.2, 1.4],
                                  opacity: [0.5, 0.3, 0],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 1.5,
                                  delay: 0.3,
                                  repeat: Infinity,
                                  ease: "easeOut",
                                }}
                              />
                            </>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    );
  }
);

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;