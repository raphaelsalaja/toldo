"use client";

import type { AnimationProps, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";

interface Context {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  layoutId: string;
  id: string;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLDivElement>;
}

interface Root extends HTMLMotionProps<"div"> {
  id: string;
  transition?: AnimationProps["transition"];
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  debug?: boolean;
}

interface Trigger extends HTMLMotionProps<"div"> {}
interface Portal extends HTMLMotionProps<"div"> {}
interface Overlay extends HTMLMotionProps<"div"> {
  closeOnOverlayClick?: boolean;
}
interface Content extends HTMLMotionProps<"div"> {}
interface Item extends HTMLMotionProps<"div"> {
  id: string;
}

const focusFirstElement = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
};

const useFocusTrap = (modalRef: React.RefObject<HTMLElement>, isOpen: boolean) => {
  useEffect(() => {
    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleFocusTrap);
    } else {
      window.removeEventListener("keydown", handleFocusTrap);
    }

    return () => window.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen, modalRef]);
};

const Context = React.createContext<Context | undefined>(undefined);

const useToldoContext = (): Context => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useToldoContext must be used within a Root");
  }
  return context;
};

export const Root = React.memo(
  React.forwardRef<HTMLDivElement, Root>(
    ({ id, transition = { ease: [0.19, 1, 0.22, 1], duration: 1 }, defaultOpen = false, open: controlledOpen, onOpenChange, debug = false, ...props }, ref) => {
      const [isOpen, setIsOpenState] = React.useState(defaultOpen);
      const [isAnimating, setIsAnimating] = React.useState(false);
      const triggerRef = React.useRef<HTMLDivElement>(null);
      const layoutId = React.useRef(`Toldo-${crypto.randomUUID()}`).current;

      const isControlled = controlledOpen !== undefined;
      const isOpenState = isControlled ? controlledOpen : isOpen;

      const setIsOpen = useCallback(
        (open: boolean) => {
          if (debug) console.log(`Toldo Modal is now ${open ? "open" : "closed"}`);
          if (!isControlled) {
            setIsOpenState(open);
          }
          onOpenChange?.(open);
        },
        [isControlled, onOpenChange, debug],
      );

      const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
          if (event.key === "Escape" && isOpenState) {
            if (debug) console.log("Escape key pressed. Closing modal.");
            setIsOpen(false);
          }
        },
        [isOpenState, setIsOpen, debug],
      );

      useEffect(() => {
        if (isOpenState) {
          if (debug) console.log("Modal is open. Adding keydown listener.");
          window.addEventListener("keydown", handleKeyDown);
        } else {
          if (debug) console.log("Modal is closed. Removing keydown listener.");
          window.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [isOpenState, handleKeyDown, debug]);

      return (
        <Context.Provider
          value={{
            isOpen: isOpenState,
            setIsOpen,
            layoutId,
            id,
            isAnimating,
            setIsAnimating,
            triggerRef,
          }}
        >
          <MotionConfig transition={transition}>
            <LayoutGroup>
              <motion.div
                ref={ref}
                {...props}
                className={cn(props.className)}
                onAnimationStart={() => {
                  if (debug) console.log("Animation started");
                }}
                onAnimationComplete={() => {
                  if (debug) console.log("Animation completed");
                }}
              >
                {props.children}
              </motion.div>
            </LayoutGroup>
          </MotionConfig>
        </Context.Provider>
      );
    },
  ),
);
Root.displayName = "Toldo.Root";

export const Trigger = React.memo(
  React.forwardRef<HTMLDivElement, Trigger>((props, ref) => {
    const { layoutId, setIsOpen, isAnimating, triggerRef } = useToldoContext();

    const handleClick = () => {
      if (isAnimating) return;
      setIsOpen(true);
    };

    return (
      <motion.div ref={triggerRef} className={props.className} style={props.style} layoutId={layoutId} onClick={handleClick}>
        {props.children}
      </motion.div>
    );
  }),
);
Trigger.displayName = "Toldo.Trigger";

export const Portal = React.memo(
  React.forwardRef<HTMLDivElement, Portal>(({ className = "fixed inset-0 z-10 flex items-center justify-center", ...props }, ref) => {
    const { isOpen } = useToldoContext();
    const modalRef = useRef<HTMLDivElement>(null);

    useFocusTrap(modalRef, isOpen);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            className={cn(className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            onAnimationComplete={() => {
              if (modalRef.current) {
                focusFirstElement(modalRef.current);
              }
            }}
            {...props}
          />
        )}
      </AnimatePresence>
    );
  }),
);

Portal.displayName = "Toldo.Portal";

export const Overlay = React.memo(
  React.forwardRef<HTMLDivElement, Overlay>(
    ({ closeOnOverlayClick = true, className = "fixed inset-0 bg-[#EBEBEB] bg-opacity-50 backdrop-blur-[16px]", ...props }, ref) => {
      const { setIsOpen, isAnimating, setIsAnimating } = useToldoContext();

      const handleClose = useCallback(() => {
        if (!isAnimating) {
          setIsOpen(false);
        }
      }, [isAnimating, setIsOpen]);

      return (
        <motion.div
          ref={ref}
          className={cn(className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(event) => {
            if (closeOnOverlayClick && event.target === event.currentTarget) {
              handleClose();
            }
          }}
          onAnimationComplete={() => {
            setIsAnimating(false);
          }}
          {...props}
        />
      );
    },
  ),
);
Overlay.displayName = "Toldo.Overlay";

export const Content = React.memo(
  React.forwardRef<HTMLDivElement, Content>(({ className = "relative p-5 bg-white rounded", ...props }, ref) => {
    const { layoutId, setIsAnimating } = useToldoContext();

    return (
      <motion.div
        ref={ref}
        layoutId={layoutId}
        className={cn(className)}
        role="document"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={() => {}}
        onAnimationComplete={() => {
          setIsAnimating(false);
        }}
        {...props}
      >
        {props.children}
      </motion.div>
    );
  }),
);
Content.displayName = "Toldo.Content";

export const Item: React.FC<Item> = React.memo(({ id, ...props }) => {
  return (
    <motion.div layoutId={id} className={props.className} style={props.style}>
      {props.children}
    </motion.div>
  );
});
Item.displayName = "Toldo.Item";
