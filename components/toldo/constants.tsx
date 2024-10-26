import type { AnimationProps } from "framer-motion";

const TRANSITION: AnimationProps["transition"] = {
  ease: [0.19, 1, 0.22, 1],
  duration: 0.4,
};

const STACK_Y_OFFSET = 8;
const STACK_SCALE_OFFSET = 0.05;
const STACK_OPACITY_OFFSET = 0.1;

const STACK_OFFSETS = {
  y: STACK_Y_OFFSET,
  scale: STACK_SCALE_OFFSET,
  opacity: STACK_OPACITY_OFFSET,
};

export { TRANSITION, STACK_Y_OFFSET, STACK_SCALE_OFFSET, STACK_OPACITY_OFFSET, STACK_OFFSETS };
