"use client";

import type { HTMLMotionProps } from "framer-motion";

import * as RadixDialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import React from "react";

interface DialogProps {
  id: string;
  open: boolean;
  dialog: React.ReactNode;
}

interface DialogContextProps {
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

interface DialogProviderProps {
  children: React.ReactNode;
  dialogs: DialogProps[];
}
const DialogProvider: React.FC<DialogProviderProps> = ({ children, dialogs: initialDialogs }) => {
  const [dialogs, setDialogs] = React.useState<DialogProps[]>(initialDialogs);

  const openDialog = (id: string) => {
    setDialogs((prevDialogs) => prevDialogs.map((dialog) => (dialog.id === id ? { ...dialog, open: true } : dialog)));
  };

  const closeDialog = (id: string) => {
    setDialogs((prevDialogs) => prevDialogs.map((dialog) => (dialog.id === id ? { ...dialog, open: false } : dialog)));
  };

  const clearDialogs = () => {
    setDialogs((prevDialogs) => prevDialogs.map((dialog) => ({ ...dialog, open: false })));
  };

  return <DialogContext.Provider value={{ dialogs, openDialog, closeDialog, clearDialogs }}>{children}</DialogContext.Provider>;
};

interface DialogRootProps extends RadixDialogPrimitive.DialogProps {}
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

interface DialogPortalProps extends RadixDialogPrimitive.DialogPortalProps {}
const DialogPortal: React.FC<DialogPortalProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Portal {...props}>{children}</RadixDialogPrimitive.Portal>;
};

interface DialogOverlayProps extends RadixDialogPrimitive.DialogOverlayProps {}
const DialogOverlay: React.FC<DialogOverlayProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Overlay {...props}>{children}</RadixDialogPrimitive.Overlay>;
};

interface DialogContentProps extends RadixDialogPrimitive.DialogContentProps {}
const DialogContent: React.FC<DialogContentProps> = ({ children, ...props }) => {
  const { clearDialogs } = useDialogContext();
  return (
    <RadixDialogPrimitive.Content
      onOpenAutoFocus={(event) => event.preventDefault()}
      onPointerDownOutside={(event) => {
        clearDialogs();
      }}
      {...props}
    >
      {children}
    </RadixDialogPrimitive.Content>
  );
};

interface DialogCloseProps extends RadixDialogPrimitive.DialogCloseProps {}
const DialogClose: React.FC<DialogCloseProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Close {...props}>{children}</RadixDialogPrimitive.Close>;
};

interface DialogTitleProps extends RadixDialogPrimitive.DialogTitleProps {}
const DialogTitle: React.FC<DialogTitleProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Title {...props}>{children}</RadixDialogPrimitive.Title>;
};

interface DialogDescriptionProps extends RadixDialogPrimitive.DialogDescriptionProps {}
const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Description {...props}>{children}</RadixDialogPrimitive.Description>;
};

interface DialogSharedItemProps extends HTMLMotionProps<"div"> {}
const DialogSharedItem: React.FC<DialogSharedItemProps> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

interface DialogStackProps extends HTMLMotionProps<"ul"> {}
const DialogStack: React.FC<DialogStackProps> = ({ ...rest }) => {
  const { dialogs } = useDialogContext();
  const openDialogs = dialogs.filter((dialog) => dialog.open);

  return (
    <motion.ul {...rest} className="fixed inset-0 flex items-center justify-center" data--toldo-dialog-stack>
      {openDialogs.map((dialog, index) => {
        const position = openDialogs.length - index - 1;

        return (
          <motion.li
            key={dialog.id}
            initial={{
              y: position * 40,
              scale: 0.85,
              opacity: position === 0 ? 1 : 0,
            }}
            animate={{
              y: position * -40,
              zIndex: openDialogs.length - position,
              scale: 1 - 0.15 * position,
              opacity: 1 - 0.25 * position,
            }}
            transition={{
              ease: [0.19, 1, 0.22, 1],
              duration: 0.4,
            }}
            data-toldo-dialog-stack-index={index}
            className="absolute list-none"
          >
            {dialog.dialog}
          </motion.li>
        );
      })}
    </motion.ul>
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

export type {
  DialogProps as Props,
  DialogProviderProps as ProviderProps,
  DialogRootProps as RootProps,
  DialogTriggerProps as TriggerProps,
  DialogPortalProps as PortalProps,
  DialogOverlayProps as OverlayProps,
  DialogStackProps as StackProps,
  DialogButtonProps as ButtonProps,
  DialogContentProps as ContentProps,
  DialogCloseProps as CloseProps,
  DialogTitleProps as TitleProps,
  DialogDescriptionProps as DescriptionProps,
  DialogSharedItemProps as ItemProps,
};

export {
  DialogProvider as Provider,
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogStack as Stack,
  DialogButton as Button,
  DialogContent as Content,
  DialogClose as Close,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogSharedItem as Item,
};
