"use client";

import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import { useState } from "react";
import * as Dialog from "toldo";

export const Stacked = () => {
  const dialogs: Dialog.Props[] = [
    {
      id: "example-dialog-1",
      dialog: (
        <Dialog.StackContent>
          <Dialog.StackTitle>Title</Dialog.StackTitle>
          <Dialog.StackDescription>Description</Dialog.StackDescription>
          <Dialog.Close>Close</Dialog.Close>
          <Dialog.Button kind="open" dialogId="example-dialog-2">
            Continue
          </Dialog.Button>
        </Dialog.StackContent>
      ),
    },
    {
      id: "example-dialog-2",
      dialog: (
        <Dialog.StackContent>
          <Dialog.StackTitle>Title</Dialog.StackTitle>

          <Dialog.StackDescription>Description</Dialog.StackDescription>
          <Dialog.Button kind="close" dialogId="example-dialog-2">
            Go Back
          </Dialog.Button>
          <Dialog.Button kind="open" dialogId="example-dialog-3">
            Continue
          </Dialog.Button>
        </Dialog.StackContent>
      ),
    },
    {
      id: "example-dialog-3",
      dialog: (
        <Dialog.StackContent>
          <Dialog.StackTitle>Title</Dialog.StackTitle>

          <Dialog.StackDescription>Description</Dialog.StackDescription>
          <Dialog.Button kind="close" dialogId="example-dialog-3">
            Return
          </Dialog.Button>
          <Dialog.Close>Complete</Dialog.Close>
        </Dialog.StackContent>
      ),
    },
  ];

  const variants: { [key: string]: AnimationProps } = {
    overlay: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
      transition: {
        ease: [0.19, 1, 0.22, 1],
        duration: 0.4,
      },
    },
    stack: {
      initial: {
        y: 24,
        opacity: 0,
      },
      animate: {
        y: 0,
        opacity: 1,
      },
      exit: {
        y: 24,
        opacity: 0,
      },
      transition: {
        ease: [0.19, 1, 0.22, 1],
        duration: 0.4,
      },
    },
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog.Provider dialogs={dialogs}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          dialogId="example-dialog-1"
          className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95"
        >
          Open Dialog
        </Dialog.Trigger>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay className="fixed left-0 top-0 w-full h-full">
                <motion.div className="fixed inset-0 bg-black-a10" {...variants.overlay} />
              </Dialog.Overlay>
              <Dialog.Stack {...variants.stack} />
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </Dialog.Provider>
  );
};
