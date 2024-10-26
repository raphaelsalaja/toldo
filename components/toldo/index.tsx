"use client";

import type { HTMLMotionProps } from "framer-motion";

import * as RadixDialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import * as React from "react";

interface Dialog {
  id: string;
  content: React.ReactNode;
}

interface DialogContextProps {
  addDialog: (dialog: Dialog) => void;
  removeDialog: (id: string) => void;
}

const DialogContext = React.createContext<DialogContextProps | undefined>(undefined);

const useDialogContext = (): DialogContextProps => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a Root");
  }
  return context;
};

const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialogs, setDialogs] = React.useState<Dialog[]>([]);

  const addDialog = (dialog: Dialog) => {
    setDialogs((prev) => [...prev, dialog]);
  };

  const removeDialog = (id: string) => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
  };

  return (
    <DialogContext.Provider
      value={{
        addDialog,
        removeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

interface DialogRootProps extends RadixDialogPrimitive.DialogProps {}
const DialogRoot: React.FC<DialogRootProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Root {...props}>{children}</RadixDialogPrimitive.Root>;
};

interface DialogTriggerProps extends RadixDialogPrimitive.DialogTriggerProps {}
const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, ...props }) => {
  return <RadixDialogPrimitive.Trigger {...props}>{children}</RadixDialogPrimitive.Trigger>;
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
  return <RadixDialogPrimitive.Content {...props}>{children}</RadixDialogPrimitive.Content>;
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

export {
  DialogProvider as Provider,
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogContent as Content,
  DialogClose as Close,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogSharedItem as Item,
  useDialogContext as useContext,
};
