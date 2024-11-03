"use client";

import * as RadixDialogPrimitive from "@radix-ui/react-dialog";
import type { Primitive } from "@radix-ui/react-primitive";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import React, { useId } from "react";

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

type DialogRootProps = RadixDialogPrimitive.DialogProps & {
  dialogs?: DialogProps[];
};

const DialogRoot: React.FC<DialogRootProps> = ({ children, dialogs, onOpenChange, ...props }) => {
  return (
    <DialogProvider dialogs={dialogs}>
      <DialogRootContent onOpenChange={onOpenChange} {...props}>
        {children}
      </DialogRootContent>
    </DialogProvider>
  );
};

const DialogRootContent: React.FC<DialogRootProps> = ({ children, onOpenChange, ...props }) => {
  const { clearDialogs } = useDialogContext();

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    if (!open) {
      clearDialogs();
    }
  };

  return (
    <RadixDialogPrimitive.Root onOpenChange={handleOpenChange} {...props}>
      {children}
    </RadixDialogPrimitive.Root>
  );
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
  return <RadixDialogPrimitive.Content {...props}>{children}</RadixDialogPrimitive.Content>;
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
  offsetY?: number;
  offsetScale?: number;
  offsetOpacity?: number;
  initial?: HTMLMotionProps<"div">["initial"];
  animate?: HTMLMotionProps<"div">["animate"];
  exit?: HTMLMotionProps<"div">["exit"];
  transition?: HTMLMotionProps<"div">["transition"];
}

const DialogStack: React.FC<DialogStackProps> = ({ offsetY = 24, offsetScale = 0.05, offsetOpacity = 0.33, ...props }) => {
  const { dialogs, clearDialogs } = useDialogContext();
  const openDialogs = dialogs.filter((dialog) => dialog.open);

  return (
    <motion.div
      key="dialog-stack"
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
      initial={props.initial}
      animate={props.animate}
      exit={props.exit}
      transition={props.transition}
    >
      <DialogContent
        style={{
          display: "contents",
        }}
        onPointerDownOutside={() => {
          clearDialogs();
        }}
        {...props}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </VisuallyHidden.Root>
        <AnimatePresence initial={false}>
          {openDialogs.map((dialog, index) => {
            const position = openDialogs.length - index - 1;
            return (
              <motion.div
                key={dialog.id}
                id={dialog.id}
                initial={{
                  scale: 1,
                  y: offsetY,
                  opacity: 0,
                }}
                animate={{
                  y: position * -offsetY,
                  zIndex: openDialogs.length - position,
                  scale: 1 - offsetScale * position,
                  opacity: 1 - offsetOpacity * position,
                }}
                exit={{
                  scale: 1,
                  y: offsetY * 2,
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </DialogContent>
    </motion.div>
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
    <p id={id.description} {...props}>
      {children}
    </p>
  );
};

interface DialogStackRemoveProps extends HTMLMotionProps<"button"> {
  dialogId: string;
}

const DialogStackRemove: React.FC<DialogStackRemoveProps> = ({ dialogId, children, ...props }) => {
  const { closeDialog } = useDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(event);
    }
    closeDialog(dialogId);
  };

  return (
    <motion.button type="button" {...props} onClick={handleClick}>
      {children}
    </motion.button>
  );
};

interface DialogStackAddProps extends HTMLMotionProps<"button"> {
  dialogId: string;
}

const DialogStackAdd: React.FC<DialogStackAddProps> = ({ dialogId, children, ...props }) => {
  const { openDialog } = useDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(event);
    }
    openDialog(dialogId);
  };

  return (
    <motion.button type="button" {...props} onClick={handleClick}>
      {children}
    </motion.button>
  );
};

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogStack as Stack,
  DialogStackContent as StackContent,
  DialogStackTitle as StackTitle,
  DialogStackDescription as StackDescription,
  DialogStackRemove as StackRemove,
  DialogStackAdd as StackAdd,
  DialogContent as Content,
  DialogClose as Close,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogSharedItem as Item,
};

export type {
  DialogProps as Props,
  DialogRootProps as RootProps,
  DialogTriggerProps as TriggerProps,
  DialogPortalProps as PortalProps,
  DialogOverlayProps as OverlayProps,
  DialogStackProps as StackProps,
  DialogStackContentProps as StackContentProps,
  DialogStackTitleProps as StackTitleProps,
  DialogStackDescriptionProps as StackDescriptionProps,
  DialogStackRemoveProps as StackRemoveProps,
  DialogStackAddProps as StackAddProps,
  DialogContentProps as ContentProps,
  DialogCloseProps as CloseProps,
  DialogTitleProps as TitleProps,
  DialogDescriptionProps as DescriptionProps,
  DialogSharedItemProps as ItemProps,
};
