"use client";

import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import { useState } from "react";
import * as Dialog from "toldo";

export const Stacked = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95">
        Open Dialog
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 left-0 h-full w-full" />

        <Dialog.Content className="flex w-[80vw] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[512px]">
          <div className="flex flex-col gap-2 px-6 pt-6">
            <Dialog.Title className="font-semibold text-foreground text-large">Dialog 1</Dialog.Title>
            <h3 className="text-default text-muted">
              A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
            </h3>
          </div>
          <Dialog.Description className="mt-0 p-6 pt-4 text-default">
            A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
            app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
          </Dialog.Description>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Close className="!text-red-11 h-[32px] max-w-fit rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Close
            </Dialog.Close>
            <Dialog.Close className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Continue
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
