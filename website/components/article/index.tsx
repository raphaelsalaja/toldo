"use client";

import { type HTMLMotionProps, motion } from "framer-motion";

export const Article = ({ children }: HTMLMotionProps<"article">) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="article "
    >
      {children}
    </motion.article>
  );
};
