import * as React from 'react';
import { useCallback, type FC } from "react";
import { motion } from "framer-motion";
import { Code, Server, Database, Download } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import ScrollReveal from "./ScrollReveal";
import { fadeInLeft, staggerContainer, cardHover, scaleIn } from "./animations";

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Creating responsive websites and web applications with modern frameworks.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Building scalable server-side applications and APIs with Node.js and Express.",
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Designing efficient database schemas and optimizing queries for performance.",
  },
];

const AboutSection: FC = React.memo(() => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="about" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl font-bold mb-4"
              whileInView={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-white">About </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Me
              </span>
            </motion.h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal variants={fadeInLeft}>
            <motion.div
              whileInView={{ x: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                Passionate MERN Developer & Tech Creator
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                MERN Stack Developer specializing in complex web applications
                that others find challenging. Built enterprise-level music
                streaming service with advanced features like HLS transcoding
                and real-time synchronization.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm passionate about creating elegant solutions to complex
                problems, and I'm constantly learning new technologies and
                techniques to stay at the forefront of the ever-evolving web
                landscape.
              </p>
              <motion.div
                className="flex gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
              >
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={() => scrollToSection("contact")}>
                    Get In Touch
                  </Button>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((item, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                initial="hidden"
                whileHover="visible"
                whileInView={{
                  opacity: [0, 1],
                  x: [50, 0],
                  transition: { delay: index * 0.2, duration: 0.6 },
                }}
                viewport={{ once: true }}
              >
                <Card
                  variant="elevated"
                  className="hover:border-purple-500/40 transition-all duration-500 group cursor-pointer"
                >
                  <CardContent className="relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="flex items-center gap-4 mb-4 relative z-10 py-1">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center"
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: "0 10px 20px rgba(168, 85, 247, 0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-semibold text-white group-hover:text-purple-100 transition-colors duration-300">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;