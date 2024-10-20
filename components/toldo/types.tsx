import type { AnimationProps } from "framer-motion";

interface Context {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  layoutId: string;
  id: string;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  isClosing: boolean;
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLDivElement>;
}

interface Root extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  transition?: AnimationProps["transition"];
}

interface Trigger extends React.HTMLAttributes<HTMLDivElement> {}

interface Portal extends React.HTMLAttributes<HTMLDivElement> {}

interface Overlay extends React.HTMLAttributes<HTMLDivElement> {}

interface Content extends React.HTMLAttributes<HTMLDivElement> {}

interface Item extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export type { Overlay, Content, Context, Item, Portal, Root, Trigger };
