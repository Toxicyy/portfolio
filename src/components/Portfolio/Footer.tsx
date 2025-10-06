import * as React from 'react';
import { type FC } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const Footer: FC = React.memo(() => {
  return (
    <ScrollReveal>
      <footer className="relative z-10 py-8 px-6 border-t border-purple-500/20">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          whileInView={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <motion.p
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            © 2025 Ivan Vysocinas. Built with React, TypeScript & Tailwind CSS
          </motion.p>
          <motion.p
            className="text-purple-400 text-sm mt-2 hover:text-purple-300 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            animate={{
              textShadow: [
                "0 0 0px rgba(168, 85, 247, 0)",
                "0 0 10px rgba(168, 85, 247, 0.5)",
                "0 0 0px rgba(168, 85, 247, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Designed with ❤️ for amazing web experiences
          </motion.p>
        </motion.div>
      </footer>
    </ScrollReveal>
  );
});

Footer.displayName = "Footer";

export default Footer;