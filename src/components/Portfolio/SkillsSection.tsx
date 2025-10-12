import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "../../data";

const categories = ["Frontend", "Backend", "Tools"];

// Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Generate random particles for each skill
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    delay: Math.random() * 0.5,
  }));

  // Group skills by category
  const groupedSkills = categories.map(category => ({
    category,
    skills: skillsData.filter(skill => skill.category === category)
  }));

  return (
    <section id="skills" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
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
        </motion.div>

        {/* Grouped Skills */}
        <div className="space-y-16">
          {groupedSkills.map((group) => (
            <motion.div
              key={group.category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Category Header */}
              <motion.div 
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="text-3xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {group.category}
                  </span>
                </h3>
                <div className="h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-transparent" />
              </motion.div>

              {/* Skills Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={staggerContainer}
              >
                {group.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeInUp}
                    initial={{ 
                      opacity: 0, 
                      rotateY: -90,
                      z: -100,
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      rotateY: 0,
                      z: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    style={{ perspective: 1000 }}
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
                      <div className="group cursor-pointer relative overflow-hidden border border-purple-500/30 bg-gray-900/50 backdrop-blur-sm h-full rounded-lg">
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

                        <div className="p-6 relative z-10 flex flex-col items-center justify-center h-full min-h-[160px]">
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
                            <span className="inline-block text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                              {skill.category}
                            </span>
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
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}