import type { AnimationProps } from "framer-motion";

const EASE: AnimationProps["transition"] = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1],
};

const STACK_Y_OFFSET = 8;
const STACK_SCALE_OFFSET = 0.05;
const STACK_OPACITY_OFFSET = 0.1;

const STACK_OFFSETS = {
  y: STACK_Y_OFFSET,
  scale: STACK_SCALE_OFFSET,
  opacity: STACK_OPACITY_OFFSET,
};

export { EASE, STACK_Y_OFFSET, STACK_SCALE_OFFSET, STACK_OPACITY_OFFSET, STACK_OFFSETS };
