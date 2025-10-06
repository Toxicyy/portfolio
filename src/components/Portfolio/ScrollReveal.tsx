import * as React from 'react';
import { useRef, type FC } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "./animations";
import type { AnimationVariants } from "../../types/types";

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: AnimationVariants;
  className?: string;
}

const ScrollReveal: FC<ScrollRevealProps> = React.memo(
  ({ children, variants = fadeInUp, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;