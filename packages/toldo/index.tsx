"use client";

import * as RadixDialogPrimitive from "@radix-ui/react-dialog";
import type { Primitive } from "@radix-ui/react-primitive";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import type { AnimationProps, HTMLMotionProps } from "framer-motion";
import React, { isValidElement, useId } from "react";


const EASE_TRANSITION: AnimationProps["transition"] = {
  ease: [0.19, 1, 0.22, 1],
  duration: 0.4,
};

const STACK_Y_OFFSET = 24;

const STACK_SCALE_OFFSET = 0.05;

const STACK_OPACITY_OFFSET = 0.33;

export { EASE_TRANSITION, STACK_Y_OFFSET, STACK_SCALE_OFFSET, STACK_OPACITY_OFFSET };

interface DialogProps {
  id: string;
  open?: boolean;
  dialog: React.ReactElement;
}

interface DialogContextProps {
  id: {
    title: string;
    description: string;
    content: string;
  };
  dialogs: DialogProps[];
  openDialog: (id: string) => void;
  closeDialog: (id: string) => void;
  clearDialogs: () => void;
}

const DialogContext = React.createContext<DialogContextProps | undefined>(undefined);

const useDialogContext = (): DialogContextProps => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

interface DialogProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  dialogs?: DialogProps[];
}

const DialogProvider: React.FC<DialogProviderProps> = ({ children, dialogs: initialDialogs }) => {
  const [dialogs, setDialogs] = React.useState<DialogProps[]>(initialDialogs?.map((dialog) => ({ ...dialog, open: dialog.open ?? false })) || []);

  const openDialog = (id: string) => {
    setDialogs((prevDialogs) =>
      prevDialogs.map((dialog) =>
        dialog.id === id
          ? {
              ...dialog,
              open: true,
            }
          : dialog,
      ),
    );
  };

  const closeDialog = (id: string) => {
    setDialogs((prevDialogs) =>
      prevDialogs.map((dialog) =>
        dialog.id === id
          ? {
              ...dialog,
              open: false,
            }
          : dialog,
      ),
    );
  };

  const clearDialogs = () => {
    if (dialogs) {
      setDialogs((prevDialogs) =>
        prevDialogs.map((dialog) => ({
          ...dialog,
          open: false,
        })),
      );
    }
  };

  return (
    <DialogContext.Provider
      value={{
        dialogs,
        openDialog,
        closeDialog,
        clearDialogs,
        id: {
          title: `toldo-${useId()}`,
          description: `toldo-${useId()}`,
          content: `toldo-${useId()}`,
        },
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

type DialogRootProps = RadixDialogPrimitive.DialogProps;

const DialogRoot: React.FC<DialogRootProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Root {...props}>{children}</RadixDialogPrimitive.Root>;
};

interface DialogTriggerProps extends RadixDialogPrimitive.DialogTriggerProps {
  dialogId?: string;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ dialogId, children, ...props }) => {
  const { openDialog } = useDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(event);
    }
    if (dialogId) {
      openDialog(dialogId);
    }
  };

  return (
    <RadixDialogPrimitive.Trigger {...props} onClick={handleClick}>
      {children}
    </RadixDialogPrimitive.Trigger>
  );
};

type DialogPortalProps = RadixDialogPrimitive.DialogPortalProps;

const DialogPortal: React.FC<DialogPortalProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Portal {...props}>{children}</RadixDialogPrimitive.Portal>;
};

type DialogOverlayProps = RadixDialogPrimitive.DialogOverlayProps;

const DialogOverlay: React.FC<DialogOverlayProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Overlay {...props}>{children}</RadixDialogPrimitive.Overlay>;
};

type DialogContentProps = RadixDialogPrimitive.DialogContentProps;

const DialogContent: React.FC<DialogContentProps> = ({ children, ...props }) => {
  const { clearDialogs } = useDialogContext();
  return (
    <RadixDialogPrimitive.Content
      onPointerDownOutside={(event) => {
        props.onPointerDownOutside?.(event);
        clearDialogs();
      }}
      {...props}
    >
      {children}
    </RadixDialogPrimitive.Content>
  );
};

type DialogCloseProps = RadixDialogPrimitive.DialogCloseProps;

const DialogClose: React.FC<DialogCloseProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Close {...props}>{children}</RadixDialogPrimitive.Close>;
};

type DialogTitleProps = RadixDialogPrimitive.DialogTitleProps;

const DialogTitle: React.FC<DialogTitleProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Title {...props}>{children}</RadixDialogPrimitive.Title>;
};


type DialogDescriptionProps = RadixDialogPrimitive.DialogDescriptionProps;

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Description {...props}>{children}</RadixDialogPrimitive.Description>;
};

type DialogSharedItemProps = HTMLMotionProps<"div">;

const DialogSharedItem: React.FC<DialogSharedItemProps> = ({ children, ...props }) => {
  return (
    <motion.div layout {...props}>
      {children}
    </motion.div>
  );
};

interface DialogStackProps extends RadixDialogPrimitive.DialogContentProps {
  offsets?: {
    y: number;
    scale: number;
    opacity: number;
  };
  transition?: AnimationProps["transition"];
}

const DialogStack: React.FC<DialogStackProps> = ({
  offsets = {
    y: STACK_Y_OFFSET,
    scale: STACK_SCALE_OFFSET,
    opacity: STACK_OPACITY_OFFSET,
  },
  transition = EASE_TRANSITION,
  ...props
}) => {
  const { id, dialogs } = useDialogContext();
  const openDialogs = dialogs.filter((dialog) => dialog.open);

  return (
    <DialogContent {...props}>
      <VisuallyHidden.Root>
        <DialogTitle>Title</DialogTitle>
      </VisuallyHidden.Root>
      <motion.ul
        style={{
          display: "flex",
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatePresence initial={false}>
          {openDialogs.map((dialog, index) => {
            const position = openDialogs.length - index - 1;
            return (
              <motion.li
                key={dialog.id}
                id={dialog.id}
                initial={{
                  scale: 1,
                  y: STACK_Y_OFFSET * 2,
                  opacity: 0,
                }}
                animate={{
                  y: position * -offsets.y,
                  zIndex: openDialogs.length - position,
                  scale: 1 - offsets.scale * position,
                  opacity: 1 - offsets.opacity * position,
                }}
                exit={{
                  scale: 1,
                  y: STACK_Y_OFFSET * 2,
                  opacity: 0,
                }}
                transition={{
                  ease: [0.19, 1, 0.22, 1],
                  duration: 0.6,
                }}
                style={{
                  position: "absolute",
                  listStyle: "none",
                }}
              >
                {dialog.dialog}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </DialogContent>
  );
};

type DialogStackContentProps = React.ComponentPropsWithoutRef<typeof Primitive.h2> & React.HTMLAttributes<HTMLHeadingElement>;
const DialogStackContent: React.FC<DialogStackContentProps> = ({ children, ...props }) => {
  const { id } = useDialogContext();
  return (
    <div id={id.content} aria-labelledby={id.title} aria-describedby={id.description} {...props}>
      {children}
    </div>
  );
};

type DialogStackTitleProps = React.ComponentPropsWithoutRef<typeof Primitive.h2> & React.HTMLAttributes<HTMLHeadingElement>;
const DialogStackTitle: React.FC<DialogStackTitleProps> = ({ children, ...props }) => {
  const { id } = useDialogContext();
  return (

    <h2 id={id.title} {...props}>
      {children}
    </h2>
  );
};


type DialogStackDescriptionProps = React.ComponentPropsWithoutRef<typeof Primitive.h2> & React.HTMLAttributes<HTMLHeadingElement>;
const DialogStackDescription: React.FC<DialogStackDescriptionProps> = ({ children, ...props }) => {
  const { id } = useDialogContext();
  return (
    <p id={id.description} 

    {...props}>
      {children}
    </p>
  );
};

interface DialogButtonProps extends HTMLMotionProps<"button"> {
  kind?: "default" | "open" | "close";
  dialogId?: string;
}

const DialogButton: React.FC<DialogButtonProps> = ({ kind = "default", dialogId, children, ...props }) => {
  const { openDialog, closeDialog } = useDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(event);
    }

    if (kind === "open" && dialogId) {
      openDialog(dialogId);
    } else if (kind === "close" && dialogId) {
      closeDialog(dialogId);
    }
  };

  return (
    <motion.button type="button" {...props} onClick={handleClick}>
      {children}
    </motion.button>
  );
};

export {
  DialogProvider as Provider,
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogStack as Stack,
  DialogStackContent as StackContent,
  DialogStackTitle as StackTitle,
  DialogStackDescription as StackDescription,
  DialogButton as Button,
  DialogContent as Content,
  DialogClose as Close,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogSharedItem as Item,
};

export type {
  DialogProps as Props,
  DialogProviderProps as ProviderProps,
  DialogRootProps as RootProps,
  DialogTriggerProps as TriggerProps,
  DialogPortalProps as PortalProps,
  DialogOverlayProps as OverlayProps,
  DialogStackProps as StackProps,
  DialogStackContentProps as StackContentProps,
  DialogStackTitleProps as StackTitleProps,
  DialogStackDescriptionProps as StackDescriptionProps,
  DialogButtonProps as ButtonProps,
  DialogContentProps as ContentProps,
  DialogCloseProps as CloseProps,
  DialogTitleProps as TitleProps,
  DialogDescriptionProps as DescriptionProps,
  DialogSharedItemProps as ItemProps,
};
