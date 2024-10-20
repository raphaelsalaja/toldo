import type { AnimationProps, HTMLMotionProps } from "framer-motion";

interface Context {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  layoutId: string;
  id: string;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLDivElement>;
}

interface Root extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  transition?: AnimationProps["transition"];
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface Trigger extends React.HTMLAttributes<HTMLDivElement> {}

interface Portal extends React.HTMLAttributes<HTMLDivElement> {}

interface Overlay extends HTMLMotionProps<"div"> {
  closeOnOverlayClick?: boolean;
}

interface Content extends HTMLMotionProps<"div"> {}

interface Item extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export type { Root, Trigger, Portal, Overlay, Content, Item, Context };
