"use client";

import type { HTMLMotionProps } from "framer-motion";

import * as RadixDialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useState } from "react";

interface DialogProps {
  id?: string;
  dialog?: React.ReactNode;
}

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

const useDialogStack = () => {
  const [dialogs, setDialogs] = useState<DialogProps[]>([]);

  const pushDialog = (dialog: DialogProps) => {
    const dialogExists = dialogs.find((d) => d.id === dialog.id);

    if (dialogExists) {
      throw new Error(`Dialog with id ${dialog.id} already exists in the dialog stack.`);
    }

    setDialogs((prevDialogs) => [...prevDialogs, dialog]);
  };

  const popDialog = (id: string) => {
    const dialog = dialogs.find((d) => d.id === id);

    if (dialog) {
      setDialogs((prevDialogs) => prevDialogs.filter((dialog) => dialog.id !== id));
    } else {
      throw new Error(`Dialog with id ${id} does not exist in the dialog stack.`);
    }
  };

  return {
    dialogs,
    pushDialog,
    popDialog,
  };
};

interface DialogStackProps extends HTMLMotionProps<"ul"> {
  dialogs: DialogProps[];
  onDialogsChange?: (dialogs: DialogProps[]) => void;
}
const DialogStack: React.FC<DialogStackProps> = ({ dialogs, onDialogsChange, ...rest }) => {
  return (
    <motion.ul {...rest} className="fixed inset-0 flex items-center justify-center" data--toldo-dialog-stack>
      {dialogs.map((dialog, index) => {
        const position = dialogs.length - index - 1;

        return (
          <motion.li
            key={dialog.id}
            initial={{ y: position * 40, scale: 0.85 }}
            animate={{
              y: position * -40,
              zIndex: dialogs.length - position,
              scale: 1 - 0.15 * position,
              opacity: 1 - 0.25 * position,
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

interface DialogButtonProps extends HTMLMotionProps<"button"> {}
const DialogButton: React.FC<DialogButtonProps> = ({ children, ...props }) => {
  return (
    <motion.button type="button" {...props}>
      {children}
    </motion.button>
  );
};

export type {
  DialogProps as Props,
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
  useDialogStack,
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
