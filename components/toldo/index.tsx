"use client";

import type * as Types from "./types";

import { cn } from "@/lib/cn";

import * as Dialog from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
} from "framer-motion";
import * as React from "react";

const Context = React.createContext<Types.Context | undefined>(undefined);

const useToldoContext = (): Types.Context => {
  const context = React.useContext(Context);

  if (context === undefined) {
    throw new Error("useToldoContext must be used within a Root");
  }
  return context;
};

const Root = React.memo(
  React.forwardRef<HTMLDivElement, Types.Root>(
    (
      {
        id,
        transition = {
          ease: [0.19, 1, 0.22, 1],
          duration: 1,
        },
        ...props
      },
      ref,
    ) => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [isAnimating, setIsAnimating] = React.useState(false);
      const [isClosing, setIsClosing] = React.useState(false);

      const layoutId = React.useRef(`Toldo-${crypto.randomUUID()}`).current;
      const triggerRef = React.useRef<HTMLDivElement>(null);

      return (
        <Context.Provider
          value={{
            isOpen,
            setIsOpen,
            layoutId,
            id,
            isAnimating,
            setIsAnimating,
            isClosing,
            setIsClosing,
            triggerRef,
          }}
        >
          <MotionConfig transition={transition}>
            <LayoutGroup>
              <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <div ref={ref} {...props} />
              </Dialog.Root>
            </LayoutGroup>
          </MotionConfig>
        </Context.Provider>
      );
    },
  ),
);
Root.displayName = "Toldo.Root";

const Trigger = React.memo(
  React.forwardRef<HTMLDivElement, Types.Trigger>((props, ref) => {
    const {
      layoutId,
      setIsOpen,
      isAnimating,
      setIsAnimating,
      isClosing,
      triggerRef,
    } = useToldoContext();

    const handleClick = () => {
      if (isAnimating || isClosing) return;
      setIsOpen(true);
    };

    return (
      <Dialog.Trigger asChild>
        <motion.div
          ref={triggerRef}
          className={props.className}
          style={props.style}
          layoutId={layoutId}
          onClick={handleClick}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {props.children}
        </motion.div>
      </Dialog.Trigger>
    );
  }),
);
Trigger.displayName = "Toldo.Trigger";

const Portal = React.memo(
  React.forwardRef<HTMLDivElement, Types.Portal>(({ ...props }, ref) => {
    const { isOpen } = useToldoContext();
    return (
      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={ref}
              className={cn(
                "fixed inset-0 z-10 flex items-center justify-center",
                props.className,
              )}
            >
              {props.children}
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    );
  }),
);
Portal.displayName = "Toldo.Portal";

const Overlay = React.memo(
  React.forwardRef<HTMLDivElement, Types.Overlay>(({ ...props }, ref) => {
    const { setIsOpen, isAnimating } = useToldoContext();

    const handleClose = () => {
      if (isAnimating) return;
      setIsOpen(false);
    };

    return (
      <Dialog.Overlay asChild>
        <motion.div
          ref={ref}
          className={cn(
            "fixed inset-0 bg-[#EBEBEB] bg-opacity-50 backdrop-blur-[16px]",
            props.className,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        />
      </Dialog.Overlay>
    );
  }),
);
Overlay.displayName = "Toldo.Overlay";

const Content = React.memo(
  React.forwardRef<HTMLDivElement, Types.Content>(({ ...props }, ref) => {
    const { layoutId } = useToldoContext();

    return (
      <Dialog.Content
        asChild
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <motion.div
          ref={ref}
          layoutId={layoutId}
          className={cn(props.className)}
          style={props.style}
          onClick={() => {}}
        >
          {props.children}
        </motion.div>
      </Dialog.Content>
    );
  }),
);
Content.displayName = "Toldo.Content";

const Item: React.FC<Types.Item> = React.memo(({ id, ...props }) => {
  return (
    <motion.div layoutId={id} className={props.className} style={props.style}>
      {props.children}
    </motion.div>
  );
});
Item.displayName = "Toldo.Item";

export { Overlay, Content, Item, Portal, Root, Trigger };
