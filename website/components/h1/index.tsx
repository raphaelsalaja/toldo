"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import { Hash } from "lucide-react";
import React from "react";

interface H1Props extends HTMLMotionProps<"h1"> {
  id: string;
}

export const H1 = (props: H1Props) => {
  const [hovering, setHovering] = React.useState(false);

  const onClick = () => {
    if (props.id) {
      const element = document.getElementById(props.id);
      if (element) {
        const yOffset = -48;
        const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    }
  };

  const onHoverStart = () => {
    setHovering(true);
  };

  const onHoverEnd = () => {
    setHovering(false);
  };

  const initial = { opacity: 0 };

  const animate = { opacity: hovering ? 1 : 0 };

  const exit = { opacity: 0 };

  const transition = { duration: 0.1 };

  return (
    <motion.h1
      {...props}
      className="relative flex items-center gap-1 hover:cursor-pointer"
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div initial={initial} animate={animate} exit={exit} transition={transition} className="-left-6 -translate-y-1/2 absolute top-1/2 transform">
        <Hash size={14} color="var(--gray-10)" />
      </motion.div>

      {props.children as React.ReactNode}
    </motion.h1>
  );
};
