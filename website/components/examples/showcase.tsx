"use client";

import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import { useState } from "react";
import * as Dialog from "toldo";

export const Showcase = () => {
  const dialogs: Dialog.Props[] = [
    {
      id: "dialog-one",
      dialog: (
        <Dialog.StackContent className="flex w-[512px] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1">
          <div className="flex flex-col gap-2 px-6 pt-6">
            <Dialog.StackTitle className="font-semibold text-foreground text-large">Dialog 1</Dialog.StackTitle>
            <h3 className="text-default text-muted">
              A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
            </h3>
          </div>
          <Dialog.StackDescription className="mt-0 p-6 pt-4 text-default">
            A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
            app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
          </Dialog.StackDescription>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Close className="!text-red-11 h-[32px] max-w-fit rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Close
            </Dialog.Close>
            <Dialog.Button
              kind="open"
              dialogId="dialog-two"
              className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Continue
            </Dialog.Button>
          </div>
        </Dialog.StackContent>
      ),
    },
    {
      id: "dialog-two",
      dialog: (
        <Dialog.StackContent className="flex w-[512px] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1">
          <div className="flex flex-col gap-2 px-6 pt-6">
            <Dialog.StackTitle className="font-semibold text-foreground text-large">Dialog 2</Dialog.StackTitle>
            <h3 className="text-default text-muted">
              A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
            </h3>
          </div>
          <Dialog.StackDescription className="mt-0 p-6 pt-4 text-default">
            A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
            app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
          </Dialog.StackDescription>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Button
              kind="close"
              dialogId="dialog-two"
              className="!text-red-11 h-[32px] max-w-fit rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Go Back
            </Dialog.Button>
            <Dialog.Button
              kind="open"
              dialogId="dialog-three"
              className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Continue
            </Dialog.Button>
          </div>
        </Dialog.StackContent>
      ),
    },
    {
      id: "dialog-three",
      dialog: (
        <Dialog.StackContent className="flex w-[512px] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1">
          <div className="flex flex-col gap-2 px-6 pt-6">
            <Dialog.StackTitle className="font-semibold text-foreground text-large">Dialog 3</Dialog.StackTitle>
            <h3 className="text-default text-muted">
              A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
            </h3>
          </div>
          <Dialog.StackDescription className="mt-0 p-6 pt-4 text-default">
            A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
            app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
          </Dialog.StackDescription>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Button
              kind="close"
              dialogId="dialog-three"
              className="!text-red-11 h-[32px] max-w-fit rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Go Back
            </Dialog.Button>
            <Dialog.Close className="!text-green-11 h-[32px] max-w-fit rounded-lg bg-green-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Complete
            </Dialog.Close>
          </div>
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
          dialogId="dialog-one"
          className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95"
        >
          Open Dialog
        </Dialog.Trigger>
        <AnimatePresence>
          {open && (
            <Dialog.Portal>
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
