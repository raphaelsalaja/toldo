"use client";

import { type AnimationProps, motion } from "framer-motion";
import * as Dialog from "toldo";

export const Stacked = () => {
  const dialogs: Dialog.Props[] = [
    {
      id: "dialog-one",
      dialog: (
        <Dialog.Content className="flex w-[512px] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1">
          <div className="flex flex-col gap-2 px-6 pt-6">
            <Dialog.Title className="font-semibold text-foreground text-large">Dialog Title</Dialog.Title>
            <Dialog.Subtitle className="text-default text-muted">
              A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
            </Dialog.Subtitle>
          </div>
          <Dialog.Description className="mt-0 p-6 pt-4 text-default">
            A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
            app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
          </Dialog.Description>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Button
              kind="close"
              dialogId="dialog-one"
              className="!text-red-11 h-[32px] max-w-fit rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Reject Knowledge
            </Dialog.Button>
            <Dialog.Button
              kind="open"
              dialogId="dialog-two"
              className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Accept Knowledge
            </Dialog.Button>
          </div>
        </Dialog.Content>
      ),
    },
    {
      id: "dialog-two",
      dialog: (
        <Dialog.Content className="flex w-[512px] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1">
          <div className="flex flex-col gap-2 px-6 pt-6">
            <Dialog.Title className="font-semibold text-foreground text-large">Dialog Title</Dialog.Title>
            <Dialog.Subtitle className="text-default text-muted">
              A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
            </Dialog.Subtitle>
          </div>
          <Dialog.Description className="mt-0 p-6 pt-4 text-default">
            A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
            app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
          </Dialog.Description>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Button
              kind="close"
              dialogId="dialog-two"
              className="!text-red-11 h-[32px] max-w-fit rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Reject Knowledge
            </Dialog.Button>
            <Dialog.Button
              kind="open"
              dialogId="dialog-three"
              className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Accept Knowledge
            </Dialog.Button>
          </div>
        </Dialog.Content>
      ),
    },
    {
      id: "dialog-three",
      dialog: (
        <Dialog.Content className="flex w-[512px] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1">
          <div className="flex flex-col gap-2 px-6 pt-6">
            <Dialog.Title className="font-semibold text-foreground text-large">Dialog Title</Dialog.Title>
            <Dialog.Subtitle className="text-default text-muted">
              A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
            </Dialog.Subtitle>
          </div>
          <Dialog.Description className="mt-0 p-6 pt-4 text-default">
            A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
            app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
          </Dialog.Description>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Button
              kind="close"
              dialogId="dialog-three"
              className="!text-red-11 h-[32px] max-w-fit rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Reject Knowledge
            </Dialog.Button>
            <Dialog.Button
              kind="open"
              dialogId="dialog-two"
              className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Accept Knowledge
            </Dialog.Button>
          </div>
        </Dialog.Content>
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
        duration: 0.1,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  return (
    <Dialog.Provider dialogs={dialogs}>
      <Dialog.Root>
        <Dialog.Trigger
          dialogId="dialog-one"
          className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95"
        >
          Open Dialog
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed left-0 top-0 w-full h-full">
            <motion.div className="fixed inset-0 bg-black-a10" {...variants.overlay} />
          </Dialog.Overlay>
          <Dialog.Stack />
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Provider>
  );
};
